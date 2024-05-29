------------------------------------------------------------------------------------
------------- CRIANDO TABELAS
------------------------------------------------------------------------------------ 
CREATE TABLE IF NOT EXISTS Animal (idAnimal SERIAL NOT NULL PRIMARY KEY,
					nomeAnimal VARCHAR(50) NOT NULL,
					idadeAnimal INT,
					generoAnimal VARCHAR(15) NOT NULL,
                    envergadura FLOAT NOT NULL);
				 
CREATE TABLE IF NOT EXISTS Habitat (idHabitat SERIAL NOT NULL PRIMARY KEY,
					 nomeHabitat VARCHAR(50) NOT NULL);
					 
CREATE TABLE IF NOT EXISTS Atracao (idAtracao SERIAL NOT NULL PRIMARY KEY,
					 nomeAtracao VARCHAR(50) NOT NULL,
					 idHabitat INT,
					 FOREIGN KEY (idHabitat) REFERENCES Habitat(idHabitat));
					 
CREATE TABLE IF NOT EXISTS Animal_Habitat(idAnimalHabitat SERIAL NOT NULL PRIMARY KEY,
						   idAnimal INT,
						   idHabitat INT,
						   FOREIGN KEY (idAnimal) REFERENCES Animal(idAnimal),
						   FOREIGN KEY (idHabitat) REFERENCES Habitat(idHabitat));

------------------------------------------------------------------------------------
------------- POPULANDO TABELAS (INSERT)
------------------------------------------------------------------------------------
INSERT INTO Animal(nomeAnimal, idadeAnimal, generoAnimal, envergadura)
VALUES

-- 1. FALCÃO-CELESTIAL
('FALCÃO-CELESTIAL', 7, 'MACHO', 1.85),

-- 2. CORUJA-DA-MEIA-NOITE
('CORUJA-DA-MEIA-NOITE', 3, 'FEMEA', 2.30),

-- 3. BEIJA-FLOR-DA-AURORA
('BEIJA-FLOR-DA-AURORA', 5, 'FEMEA', 0.75),

-- 4. ÁGUIA-DO-SOL
('ÁGUIA-DO-SOL', 9, 'FEMEA', 2.50),

-- 5. PÁSSARO-DO-PARAÍSO-AZUL
('PÁSSARO-DO-PARAÍSO-AZUL', 2, 'MACHO', 0.90),

-- 6. TUCANO-DE-BICO-DOURADO
('TUCANO-DE-BICO-DOURADO', 8, 'MACHO', 0.65),

-- 7. GARÇA-REAL
('GARÇA-REAL', 1, 'FEMEA', 1.40),

-- 8. PAPAGAIO-ARCO-ÍRIS
('PAPAGAIO-ARCO-ÍRIS', 4, 'MACHO', 1.20),

-- 9. CONDOR-DOS-ANDES
('CONDOR-DOS-ANDES', 10, 'MACHO', 3.20),

-- 10. PINGUIM-IMPERADOR
('PINGUIM-IMPERADOR', 6, 'MACHO', 1.15),

-- 11. AVESTRUZ-AFRICANO
('AVESTRUZ-AFRICANO', 5, 'FEMEA', 2.75),

-- 12. CEGONHA-BRANCA
('CEGONHA-BRANCA', 3, 'FEMEA', 1.70),

-- 13. FLAMINGO-VERMELHO
('FLAMINGO-VERMELHO', 8, 'MACHO', 1.50),

-- 14. GALO-DE-BRIGA
('GALO-DE-BRIGA', 1, 'MACHO', 0.55),

-- 15. GALINHA-DE-ANGOLA
('GALINHA-DE-ANGOLA', 4, 'FEMEA', 0.40),

-- 16. PATO-SELVAGEM
('PATO-SELVAGEM', 6, 'MACHO', 0.95),

-- 17. CISNE-BRANCO
('CISNE-BRANCO', 2, 'FEMEA', 1.60),

-- 18. POMBA-CORREIO
('POMBA-CORREIO', 7, 'FEMEA', 0.60),

-- 19. PARDAL
('PARDAL', 5, 'MACHO', 0.35),

-- 20. BEIJA-FLOR-RUBI
('BEIJA-FLOR-RUBI', 3, 'FEMEA', 0.50),

-- 21. ÁGUIA-PESQUEIRA
('ÁGUIA-PESQUEIRA', 9, 'FEMEA', 2.10),

-- 22. CORUJA-BURAQUÊIRA
('CORUJA-BURAQUÊIRA', 4, 'MACHO', 1.30),

-- 23. GARÇA-AZUL
('GARÇA-AZUL', 6, 'FEMEA', 1.55),

-- 24. PAPAGAIO-CINZA
('PAPAGAIO-CINZA', 8, 'MACHO', 1.00),

-- 25. PINGUIM-DE-MAGALHÃES
('PINGUIM-DE-MAGALHÃES', 2, 'FEMEA', 0.80);

	
INSERT INTO Habitat(nomeHabitat)
	VALUES
	('PLANÍCIE'),	-- id 1
	('FLORESTA'),	-- id 2
	('PÂNTANO'),	-- id 3
	('MONTANHA'),	-- id 4
	('ILHA');		-- id 5
	
-- Para cada animal cadastrado na query anterior (de 1 a 25), insira o ID do habitat estaticamente

INSERT INTO Animal_Habitat(idAnimal, idHabitat)
VALUES

-- Animal 1
(1, 2),

-- Animal 2
(2, 3),

-- Animal 3
(3, 1),

-- Animal 4
(4, 5),

-- Animal 5
(5, 2),

-- Animal 6
(6, 3),

-- Animal 7
(7, 1),

-- Animal 8
(8, 5),

-- Animal 9
(9, 2),

-- Animal 10
(10, 3),

-- Animal 11
(11, 1),

-- Animal 12
(12, 5),

-- Animal 13
(13, 2),

-- Animal 14
(14, 3),

-- Animal 15
(15, 1),

-- Animal 16
(16, 5),

-- Animal 17
(17, 2),

-- Animal 18
(18, 3),

-- Animal 19
(19, 1),

-- Animal 20
(20, 5),

-- Animal 21
(21, 2),

-- Animal 22
(22, 3),

-- Animal 23
(23, 1),

-- Animal 24
(24, 5),

-- Animal 25
(25, 2);

	
INSERT INTO Atracao(nomeAtracao, idHabitat)
	VALUES
	('PASSEIO DE JEEP', 1),		-- id 1
	('ALIMENTAR OS LEÕES', 1),	-- id 2
	('PENTEAR MACACO', 2),		-- id 3
	('CORRER DAS COBRAS', 3);	-- id 4