CREATE TABLE Prestataires (
    code_Prestataire INT PRIMARY KEY AUTO_INCREMENT,
    code_type_de_Prestataire CHAR(4) NOT NULL,
    raison_sociale VARCHAR(30) NOT NULL,
    nom_commercial VARCHAR(30),
    Siren CHAR(9),
    Siret CHAR(14),
    adresse VARCHAR(255),
    civilite_contact_prestataire VARCHAR(3),
    nom_contact_prestataire VARCHAR(20),
    prenom_contact_prestataire VARCHAR(20),
    telephone_contact_prestataire VARCHAR(12),
    mail_contact_prestataire VARCHAR(255),
    commentaires VARCHAR(200),
    date_arret_activite_du_prestataire DATE,
    FOREIGN KEY (code_type_de_Prestataire) REFERENCES TypePrestataires(code_type_de_Prestataire) ON UPDATE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
