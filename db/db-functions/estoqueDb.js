import { pool } from "../db.js";

export async function adicionarProdutoEstoque(data) {
    await pool.query(`
    INSERT INTO CDESTOQUE (CDESTUSUARIOID, CDESTPRODID, CDESTQTDPROD)
    VALUES (?, ?, ?)`, [data.CDUSID, data.CDESTPRODID, data.CDESTQTDPROD]);

    return true;
};

export async function atualizarProdutoEstoque(data) {
    await pool.query(`UPDATE CDESTOQUE
                    SET CDESTQTDPROD = ?
                    WHERE CDESTUSUARIOID = ?
                    AND CDESTPRODID = ?`, [data.CDESTQTDPROD, data.CDUSID, data.CDESTPRODID]);

    return true;
}

export async function deletarProdutoEstoque(data) {
    await pool.query(`DELETE FROM CDESTOQUE
                    WHERE CDESTUSUARIOID = ?
                    AND CDESTPRODID = ?`, [data.CDUSID, data.CDPRODID]);

    return true;
}

export async function getProdutoEstoque(data) {
    const [row] = await pool.query(`
    SELECT * FROM CDESTOQUE
    INNER JOIN CDPRODUTO ON CDPRODID = CDESTPRODID
    WHERE CDESTUSUARIOID = ?
    AND CDESTPRODID = ?`, [data.CDUSID, data.CDPRODID]);

    return row;
}