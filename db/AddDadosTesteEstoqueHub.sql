-- -----------------------------------------------------
-- Add test data
-- -----------------------------------------------------
INSERT INTO CDUSUARIO (CDUSNOME, CDUSEMAIL, CDUSSENHA) VALUES ('Teste', 'teste@email.com.br', 'qwer');

INSERT INTO CDPRODUTO (CDPRODNOME, CDPRODDESC, CDPRODPRECO)
VALUES ('Celular', 'Smasnug', 750),
('Lápis', 'Fabercastell', 12.5),
('Garrafa', 'Inox', 50),
('Mouse', 'Razer', 180),
('Teclado', 'Logitech', 350),
('Carro', 'Fiat Uno Quadrado', 10000),
('DAC', 'Amplificador e Conversor de Áudio Fiio Q11', 249.99),
('Mochila', 'Ultra resistente, cabe até um buraco negro', 8000);

INSERT INTO CDESTOQUE (CDESTUSUARIOID, CDESTPRODID, CDESTQTDPROD)
VALUES (1, 1, 4),
(1, 2, 50),
(1, 3, 10),
(1, 4, 20),
(1, 5, 124),
(1, 6, 3),
(1, 7, 47),
(1, 8, 2);