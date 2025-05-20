import { pool } from "../db.js";


export async function getProdutosFiltro(CDUSID, pagina, porPagina, offset, filtroOpt = null, filtroValor = null) {
    const retorno = {
        itens: [],
        totalPaginas: 0
    }
    const whereQry = filtroOpt != null ? ` AND ${filtroOpt} = ${filtroValor}` : "";
    const queryTotalItens = `SELECT COUNT(*) AS total FROM CDESTOQUE
    INNER JOIN CDPRODUTO ON CDPRODID = CDESTPRODID
    WHERE CDESTUSUARIOID = ?
    ${whereQry}`;
    const query = `SELECT * FROM CDPRODUTO
    INNER JOIN CDESTOQUE ON CDESTPRODID = CDPRODID
    WHERE CDESTUSUARIOID = ?
    ${whereQry}
    LIMIT ${porPagina} OFFSET ${offset}`;

    const [total] = await pool.query(queryTotalItens, [CDUSID]);

    if (total[0].total != 0) {
        const [rows] = await pool.query(query, [CDUSID]);

        retorno.itens = rows;
        retorno.totalPaginas = Math.ceil(total[0].total / porPagina);

    }
    return retorno;
}

export async function atualizarProduto(data) {
    await pool.query(`UPDATE CDPRODUTO
                    SET CDPRODNOME = ?, CDPRODDESC = ?, CDPRODPRECO = ?
                    WHERE CDPRODID = ?`, [data.CDPRODNOME, data.CDPRODDESC, data.CDPRODPRECO, data.CDPRODID]);

    return true;
}

export async function inserirProduto(data) {
    await pool.query(`INSERT INTO CDPRODUTO (CDPRODNOME, CDPRODDESC, CDPRODPRECO)
    VALUES (?, ?, ?)`, [data.CDPRODNOME, data.CDPRODDESC, data.CDPRODPRECO]);

    const [row] = await pool.query(`SELECT * FROM CDPRODUTO ORDER BY CDPRODID DESC LIMIT 1`);

    return row
}

export async function deletarProduto(CDPRODID) {
    await pool.query(`DELETE FROM CDPRODUTO WHERE CDPRODID = ?`, [CDPRODID]);

    return true;
}