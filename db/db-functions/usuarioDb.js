import { pool } from "../db.js";

export async function createUsuario(data) {
    const query = Object.keys(data).map(key => key).join(", ")
    const parametros = [...Object.values(data)]
    const values = Object.keys(data).map(key => `?`).join(", ")

    const [result] = await pool.query(`
    INSERT INTO CDUSUARIO(${query})
    VALUES(${values})
    `, parametros)

    return result
}

export async function getUsuarioById(idUsuario) {
    const [rows] = await pool.query(`
        SELECT CDUSNOME, CDUSEMAIL, CDUSCEL FROM CDUSUARIO
        WHERE CDUSID = ?
    `, [idUsuario])

    return rows[0]
}

export async function getUsuarioByEmail(email) {
    const [row] = await pool.query(`
    SELECT CDUSID, CDUSEMAIL, CDUSSENHA FROM CDUSUARIO
    WHERE CDUSEMAIL = ?
    `, [email])

    return row
}

export async function updateUsuario(idUsuario, data) {
    const query = Object.keys(data).map(key => `${key} = ?`).join(", ")
    const parametros = [...Object.values(data), idUsuario]

    const result = await pool.query(`
    UPDATE CDUSUARIO
    SET ${query}, CDUSDTATUALIZADO = NOW()
    WHERE CDUSID = ?`, parametros);

    return result
}

export async function deletarUsuario(data) {
    const result = await pool.query(`
    DELETE FROM CDUSUARIO
    WHERE CDUSID = ?
    `, [data.idUsuario])

    return result
}