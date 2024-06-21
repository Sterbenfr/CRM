CREATE TABLE Societe (
    code_Societe INT PRIMARY KEY AUTO_INCREMENT, -- clé primaire
    raison_sociale VARCHAR(30) NOT NULL,
    nom_commercial VARCHAR(30) DEFAULT 'raison_sociale',
    Logo BLOB, -- assuming Logo is an image or binary data
    site_Web VARCHAR(255),
    Siren CHAR(9) NOT NULL,
    code_type_activite_Societe CHAR(4),
    commentaires VARCHAR(200),
    code_Groupe_appartenance INT,
    date_arret_activite_Societe DATE,
    FOREIGN KEY (code_type_activite_Societe) REFERENCES TypeActiviteSociete(code)
);

INSERT INTO Societe (
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
('Société Alpha', NULL, NULL, 'http://www.alpha.com/', '123456789', 'DIS', 'Première société', 1, NULL),
('Société Beta', NULL, NULL, 'http://www.beta.com/', '234567890', 'FAB', 'Deuxième société', 2, NULL),
('Société Gamma', NULL, NULL, 'http://www.gamma.com/', '345678901', 'PRE', 'Troisième société', 3, NULL),
('Société Delta', NULL, NULL, 'http://www.delta.com/', '456789012', 'ADM', 'Quatrième société', 4, NULL),
('Société Epsilon', NULL, NULL, 'http://www.epsilon.com/', '567890123', 'PRE', 'Cinquième société', 5, NULL);
