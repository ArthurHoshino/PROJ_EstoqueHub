import express from 'express'
import moment from 'moment'

import { getUsuarioByEmail, createUsuario } from '../db/db-functions/usuarioDb.js'
import { getProdutosFiltro, inserirProduto, atualizarProduto, deletarProduto } from '../db/db-functions/produtoDb.js'
import { adicionarProdutoEstoque, atualizarProdutoEstoque, deletarProdutoEstoque, getProdutoEstoque } from '../db/db-functions/estoqueDb.js'

const paginaRouter = express.Router()

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/login')
    } else {
        next()
    }
}

const redirectDashboard = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/dashboard')
    } else {
        next()
    }
}

// <==============>
// ROTAS GET
// <==============>
paginaRouter.get('/', (req, res) => {
    res.render('index', {userId: req.session.userId})
})

paginaRouter.get('/login', redirectDashboard, (req, res, next) => {
    const data = {
        msgError: ''
    }
    res.render('login', data)
})

paginaRouter.get('/registro', redirectDashboard, (req, res) => {
    const data = {
        msgError: ''
    }

    res.render('registro', data)
})

paginaRouter.get('/dashboard', redirectLogin, async (req, res) => {
    const userId = req.session.userId;
    const pag = parseInt(req.query.pagina) || 1;
    const perPage = 7;
    const offset = (pag - 1) * perPage;

    const result = await getProdutosFiltro(userId, pag, perPage, offset);

    res.render('dashboard', {
        itens: result.itens,
        paginaAtual: pag,
        totalPaginas: result.totalPaginas
    })
})

paginaRouter.get('/dashboardAdicionarProduto', redirectLogin, async (req, res) => {
    let data = {
        msgError: '',
        item: {}
    }

    res.render('dashboardAdicionarProduto', data)
})

paginaRouter.get('/dashboardEditarProduto', redirectLogin, async (req, res) => {
    const data = {
        "CDUSID": req.session.userId,
        "CDPRODID": req.query.produtoId
    }

    const result = await getProdutoEstoque(data);
    if (result[0] != undefined) {
        const dataEnvio = {
            msgError: '',
            item: result[0]
        }
        res.render('dashboardAdicionarProduto', dataEnvio);
    } else {
        res.redirect('/dashboard');
    }
});

paginaRouter.get('/dashboardDeletarProduto', redirectLogin, async (req, res) => {
    const userId = req.session.userId;
    const prodId = req.query.produtoId;

    await deletarProdutoEstoque({"CDUSID": userId, "CDPRODID": prodId});
    await deletarProduto(prodId);

    res.redirect('/dashboard');
})

// <==============>
// ROTAS POST
// <==============>
paginaRouter.post('/login', async (req, res, next) => {
    try {
        const email = req.body.femail
        const senha = req.body.fsenha
        const data = {
            msgError: 'Algo deu errado'
        }

        const user = await getUsuarioByEmail(email);

        if (user[0] && user[0].CDUSSENHA === senha) {
            data.msgError = '';
        }

        if (data.msgError == '') {
            req.session.userId = user[0].CDUSID
            return res.redirect('/dashboard')
        } else {
            return res.render('login', data)
        }
    } catch (error) {
        res.status(500).send({message: 'Tente novamente mais tarde'})
        next(error)
    }
})

paginaRouter.post('/registro', async (req, res, next) => {
    try {
        const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%& "]).{8,}$/
        const errorMessage = {msgError: ''}
        const data = {
            'CDUSNOME': req.body.fnome,
            'CDUSEMAIL': req.body.femail,
            'CDUSCEL': req.body.ftelefone != '' ? req.body.ftelefone : null,
            'CDUSSENHA': req.body.fsenha
        }

        if (data.CDUSNOME == '') {
            errorMessage.msgError = 'Insira um nome de usuário'
            return res.render('registro', errorMessage)
        }

        const verificacao = await getUsuarioByEmail(data.CDUSEMAIL)
        if (verificacao[0] !== undefined) {
            errorMessage.msgError = 'E-mail já em uso'
            return res.render('registro', errorMessage)
        }
        if (!passwordValidation.test(data.CDUSSENHA)) {
            errorMessage.msgError = 'Senha não atende ao padrão'
            return res.render('registro', errorMessage);
        } else if (data.CDUSSENHA != req.body.fconfirmar) {
            errorMessage.msgError = 'Senhas não são iguais'
            return res.render('registro', errorMessage);
        }

        const result = await createUsuario(data);

        req.session.userId = result.insertId
        return res.redirect('/registro')
    } catch (error) {
        res.status(500).send({message: 'Tente novamente mais tarde'})
        next(error)
    }
})

paginaRouter.post('/dashboardAdicionarProduto', async (req, res, next) => {
    try {
        let errorMessage = {
            msgError: '',
            item: {}
        }
        const { userId } = req.session
        const prodData = {
            "CDPRODID": req.body.fprodId,
            "CDPRODNOME": req.body.fprodNome,
            "CDPRODDESC": req.body.fprodDesc,
            "CDPRODPRECO": req.body.fprodPreco
        }
        const estoqueData = {
            "CDUSID": userId,
            "CDESTPRODID" : req.body.fprodId,
            "CDESTQTDPROD": req.body.fprodQtd
        }

        if (prodData.CDPRODNOME == '') {
            errorMessage.msgError = 'Preencha o nome do produto'
            return res.render("dashboardAdicionarProduto", errorMessage);
        }
        if (prodData.CDPRODDESC == '') {
            errorMessage.msgError = 'Preencha a descrição do produto'
            return res.render("dashboardAdicionarProduto", errorMessage);
        }
        if (prodData.CDPRODPRECO == '') {
            errorMessage.msgError = 'Preencha o preço unitário do produto'
            return res.render("dashboardAdicionarProduto", errorMessage);
        }
        if (estoqueData.CDESTQTDPROD == '') {
            errorMessage.msgError = 'Preencha a quantidade do produto'
            return res.render("dashboardAdicionarProduto", errorMessage);
        }

        if (prodData.CDPRODID == '') {
            const [prodResult] = await inserirProduto(prodData);

            estoqueData.CDESTPRODID = prodResult.CDPRODID;
            await adicionarProdutoEstoque(estoqueData);
        } else {
            await atualizarProduto(prodData);
            await atualizarProdutoEstoque(estoqueData);
        }

        res.redirect('/dashboard')
    } catch (error) {
        res.status(500).redirect('/dashboard')
        next(error)
    }
})

paginaRouter.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if(err){
            return res.redirect('/')
        }
        sessionStore.close()
        res.clearCookie(process.env.SESS_NAME)
        res.redirect('/login')
    })
})

export default paginaRouter