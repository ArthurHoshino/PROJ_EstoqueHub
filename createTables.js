import fs from 'fs'
import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

async function executarSQL(filePath, dadosTeste) {
    const connection = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        // database: process.env.DB_NAME, // ele tenta conectar em um banco que nao existe ainda
        multipleStatements: true
    }).promise()

    try {
        const sqlContent = fs.readFileSync(filePath, 'utf8')
        await connection.query(sqlContent)

        if (process.env.NODE_ENV === 'development') {
            const dadosTesteContent = fs.readFileSync(dadosTeste, 'utf-8');
            await connection.query(dadosTesteContent);
        }

        console.log('Banco criado com sucesso!')
    } catch (error) {
        console.log('Erro ao executar o arquivo SQL:', error)
    } finally {
        await connection.end()
    }
}

executarSQL('./db/CreateEstoqueHubDb.sql', './db/AddDadosTesteEstoqueHub.sql');