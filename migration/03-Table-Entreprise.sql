CREATE TABLE Entreprise (
    code_Societe INT NOT NULL AUTO_INCREMENT,
    raison_sociale VARCHAR(30) NOT NULL,
    nom_commercial VARCHAR(30),
    Logo BLOB,
    site_Web VARCHAR(255),
    Siren CHAR(9) NOT NULL,
    code_type_activite_Societe CHAR(4) NOT NULL,
    commentaires VARCHAR(200),
    code_Groupe_appartenance INT,
    date_arret_activite_Societe DATE,
    PRIMARY KEY (code_Societe),
    FOREIGN KEY (code_type_activite_Societe) REFERENCES TypeActiviteSociete(code) ON UPDATE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO Entreprise (
    raison_sociale,
    nom_commercial,
    Logo,
    site_Web,
    Siren,
    code_type_activite_Societe,
    commentaires,
    code_Groupe_appartenance,
    date_arret_activite_Societe
) VALUES 
('Entreprise Alpha', 'Alpha Corp', NULL, 'http://www.alpha.com/', '123456789', 'DIS', 'Première société', 1, NULL),
('Entreprise Beta', 'Beta Corp', NULL, 'http://www.beta.com/', '234567890', 'FAB', 'Deuxième société', 2, NULL),
('Entreprise Gamma', 'Gamma Corp', NULL, 'http://www.gamma.com/', '345678901', 'PRE', 'Troisième société', 3, NULL),
('Entreprise Delta', 'Delta Corp', NULL, 'http://www.delta.com/', '456789012', 'ADM', 'Quatrième société', 4, NULL),
('Entreprise Epsilon', 'Epsilon Corp', NULL, 'http://www.epsilon.com/', '567890123', 'PRE', 'Cinquième société', 5, NULL);
