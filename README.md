# Projeto de Desenvolvimento Web

## Sistema Web desenvolvido para a matéria de Desenvolvimento Web no Univem


### 🧑‍💻 Tecnologias utilizadas
* Node.JS
* Express
* EJS
* MySQL 8.0

**Node.js** é um ambiente de tempo de execução de JavaScript criado usando a engine de JavaScript do Chrome, que utiliza um modelo assíncrono e não bloqueador, oferecendo um ambiente de execução de back-end, permitindo o desenvolvimento tanto do back-end quanto do front-end na mesma linguagem.
<br/>
<br/>
Em conjunto com o Node.JS, foi utilizado o framework **Express.JS** para auxiliar na criação do sistema web, pois oferece ferramentas para tratar solicitações e requisições HTTP, roteamento e middleware.
<br/>
<br/>
As páginas do sistema foram montadas utilizando **EJS** (Embedded JavaScript templating) que permite a inserção de código JavaScript em arquivos HTML, facilitando a criação de páginas dinâmicas através da renderização dos dados no lado do servidor.
<br/>
<br/>
Para o banco de dados, foi utilizado o MySQL pelo seu desempenho, ser bastante utilizado e facilidade de uso.


### 💻 Executando o projeto
Clone o projeto e acesse a pasta. Modifique o arquivo `.env` com as informações
para conectar ao seu banco. Em seguida, instale as dependências para o projeto utilizando:
```bash
npm install
```

Agora vamos criar as tabelas do nosso banco (se preferir, o arquivo SQL com alguns dados de teste está na pasta `db`):
```bash
node .\createTables.js
```
Você deve receber uma mensagem dizendo `Tabelas criadas com sucesso!`

Com isso feito, basta rodar o projeto, utilizando:
```bash
npm run dev
```
E o projeto estará disponível em `http://127.0.0.1:8080`. Para fins de teste, você já
pode logar no sistema utilizando o e-mail e senha abaixo, entretanto para criar um novo usuário é necessário colocar uma senha mais forte.
| E-mail | Senha |
|:------|------:|
|teste@email.com|qwer|

### Imagens do projeto
![Tela inicial](/documentacao/projeto-imagens-video/1-main.png?raw=true)
![Dashboard](/documentacao/projeto-imagens-video/5-dashboard.png?raw=true)

Encontre outras imagens e vídeo passando pelo sistema na pasta `documentacao/projeto-imagens-video`

## 🧑‍💻 Integrantes
[Arthur Osaka Hoshino](https://github.com/ArthurHoshino)<br/>
[Bruno Koji Nakao](https://github.com/Bruno-235789)<br/>
[Fernando Manso Isaac](https://github.com/Fernando-MI)<br/>
[Guilherme Silva Piantamar](https://github.com/gpiantamar)<br/>
[João Henrique Guimarães da Silva](https://github.com/joao591)<br/>
[Nikolas Dalton Perassoli Varella](https://github.com/Nikolas-Dalton)<br/>

---
Estilização e imagens por:<br/>
[Themesine](https://www.themesine.com/)<br/>
[Freepik](https://www.freepik.com/)
