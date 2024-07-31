CREATE TABLE Entreprise (
    code_Societe INT NOT NULL AUTO_INCREMENT,
    raison_sociale VARCHAR(30) NOT NULL,
    nom_commercial VARCHAR(30),
    Logo VARCHAR(200),
    site_Web VARCHAR(255),
    Siren CHAR(9) NOT NULL,
    code_type_activite_Societe CHAR(4) NOT NULL,
    commentaires VARCHAR(200),
    code_Groupe_appartenance INT,
    date_arret_activite_Societe DATE,
    PRIMARY KEY (code_Societe),
    FOREIGN KEY (code_type_activite_Societe) REFERENCES TypeActiviteSociete(code) ON UPDATE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
