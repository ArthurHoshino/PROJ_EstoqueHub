export const EstoqueEnum = {
    QUANTIDADE: 'CDESTQTDPROD'
}

export function getEstoqueEnum(chave) {
    switch (chave) {
        case 'fprodQtd':
            return EstoqueEnum.QUANTIDADE;
    }
}