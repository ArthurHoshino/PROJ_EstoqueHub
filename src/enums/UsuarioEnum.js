export const UsuarioEnum = {
    ID: 'CDUSID',
    NOME: 'CDUSNOME',
    EMAIL: 'CDUSEMAIL',
    CEL: 'CDUSCEL',
    SENHA: 'CDUSSENHA'
}

export function getUsuarioEnum(chave) {
    switch (chave) {
        case 'fnome':
            return UsuarioEnum.NOME;
        case 'femail':
            return UsuarioEnum.EMAIL;
        case 'ftelefone':
            return UsuarioEnum.CEL;
        case 'fsenha':
            return UsuarioEnum.SENHA;
        default:
            return 'default';
    }
}