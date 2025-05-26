export const ProdutoEnum = {
    NOME: 'CDPRODNOME',
    DESCRICAO: 'CDPRODDESC',
    PRECO: 'CDPRODPRECO',
};

export function getProdutoEnum(chave) {
    switch (chave) {
        case 'fprodNome':
            return ProdutoEnum.NOME;
        case 'fprodDesc':
            return ProdutoEnum.DESCRICAO;
        case 'fprodPreco':
            return ProdutoEnum.PRECO;
    }
}