-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`CDUSUARIO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`CDUSUARIO` (
  `CDUSID` INT NOT NULL AUTO_INCREMENT,
  `CDUSNOME` VARCHAR(100) NOT NULL,
  `CDUSEMAIL` VARCHAR(100) NOT NULL,
  `CDUSCEL` VARCHAR(20) NULL,
  `CDUSSENHA` VARCHAR(45) NOT NULL,
  `CDUSDTCRIADO` DATETIME DEFAULT NOW(),
  `CDUSDTATUALIZADO` DATETIME DEFAULT NOW(),
  PRIMARY KEY (`CDUSID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CDPRODUTO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`CDPRODUTO` (
  `CDPRODID` INT NOT NULL AUTO_INCREMENT,
  `CDPRODNOME` VARCHAR(100) NOT NULL,
  `CDPRODDESC` VARCHAR(200) NOT NULL,
  `CDPRODPRECO` DECIMAL(10,2) NOT NULL,
  `CDPRODDTCRIADO` DATETIME DEFAULT NOW(),
  `CDPRODDTATUALIZADO` DATETIME DEFAULT NOW(),
  PRIMARY KEY (`CDPRODID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CDESTOQUE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`CDESTOQUE` (
  `CDESTUSUARIOID` INT NOT NULL,
  `CDESTPRODID` INT NOT NULL,
  `CDESTQTDPROD` INT NOT NULL,
  `CDESTDTCRIADO` DATETIME DEFAULT NOW(),
  `CDESTDTATUALIZADO` DATETIME DEFAULT NOW(),
  PRIMARY KEY (`CDESTUSUARIOID`, `CDESTPRODID`),
  INDEX `fk_CDUSUARIO_has_CDPRODUTO_CDPRODUTO1_idx` (`CDESTPRODID` ASC) VISIBLE,
  INDEX `fk_CDUSUARIO_has_CDPRODUTO_CDUSUARIO_idx` (`CDESTUSUARIOID` ASC) VISIBLE,
  CONSTRAINT `fk_CDUSUARIO_has_CDPRODUTO_CDUSUARIO`
    FOREIGN KEY (`CDESTUSUARIOID`)
    REFERENCES `mydb`.`CDUSUARIO` (`CDUSID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CDUSUARIO_has_CDPRODUTO_CDPRODUTO1`
    FOREIGN KEY (`CDESTPRODID`)
    REFERENCES `mydb`.`CDPRODUTO` (`CDPRODID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`sessions` (
  `session_id` VARCHAR(128) NOT NULL,
  `expires` INT NOT NULL,
  `data` MEDIUMTEXT NULL,
  PRIMARY KEY (`session_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Add test data
-- -----------------------------------------------------
INSERT INTO CDUSUARIO (CDUSNOME, CDUSEMAIL, CDUSSENHA) VALUES ('Teste', 'teste@email.com.br', 'Qw!2erty');

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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
