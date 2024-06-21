CREATE TABLE Prestataires (
    code_Prestataire INT PRIMARY KEY AUTO_INCREMENT,
    code_type_de_Prestataire CHAR(4) NOT NULL,
    raison_sociale VARCHAR(30) NOT NULL,
    nom_commercial VARCHAR(30),
    Siren CHAR(9),
    Siret CHAR(14),
    telephone VARCHAR(12),
    mail VARCHAR(255),
    adresse VARCHAR(255),
    civilite_contact_prestataire VARCHAR(3),
    nom_contact_prestataire VARCHAR(20),
    prenom_contact_prestataire VARCHAR(20),
    telephone_contact_prestataire VARCHAR(12),
    mail_contact_prestataire VARCHAR(255),
    commentaires VARCHAR(200),
    date_arret_activite_du_prestataire DATE,
    FOREIGN KEY (code_type_de_Prestataire) REFERENCES TypePrestataires(code_type_de_Prestataire)
);
INSERT INTO Prestataires (
    code_type_de_Prestataire,
    raison_sociale,
    nom_commercial,
    Siren,
    Siret,
    telephone,
    mail,
    adresse,
    civilite_contact_prestataire,
    nom_contact_prestataire,
    prenom_contact_prestataire,
    telephone_contact_prestataire,
    mail_contact_prestataire,
    commentaires,
    date_arret_activite_du_prestataire
) VALUES 
('TRA', 'Société Alpha', 'Société Alpha', '123456789', '12345678901234', '0123456789', 'contact@alpha.com', '123 Rue de Paris, 75001 Paris', 'M.', 'Dupont', 'Jean', '0123456789', 'jean.dupont@alpha.com', 'Premier prestataire', NULL),
('TRA', 'Société Beta', 'Société Beta', '234567890', '23456789012345', '0234567890', 'contact@beta.com', '456 Avenue de Lyon, 69000 Lyon', 'Mme', 'Martin', 'Sophie', '0234567890', 'sophie.martin@beta.com', 'Deuxième prestataire', NULL),
('TRA', 'Société Gamma', 'Société Gamma', '345678901', '34567890123456', '0345678901', 'contact@gamma.com', '789 Boulevard de Nice, 06000 Nice', 'M.', 'Durand', 'Pierre', '0345678901', 'pierre.durand@gamma.com', 'Troisième prestataire', NULL),
('TRA', 'Société Delta', 'Société Delta', '456789012', '45678901234567', '0456789012', 'contact@delta.com', '101 Rue de Marseille, 13000 Marseille', 'Mme', 'Leroy', 'Claire', '0456789012', 'claire.leroy@delta.com', 'Quatrième prestataire', NULL),
('TRA', 'Société Epsilon', 'Société Epsilon', '567890123', '56789012345678', '0567890123', 'contact@epsilon.com', '202 Place de Bordeaux, 33000 Bordeaux', 'M.', 'Moreau', 'Louis', '0567890123', 'louis.moreau@epsilon.com', 'Cinquième prestataire', NULL);

SELECT code_Prestataire,TypePrestataires.libelle as TP_libelle,raison_sociale,nom_commercial,Siren,Siret,telephone,mail,adresse,civilite_contact_prestataire,nom_contact_prestataire,prenom_contact_prestataire,telephone_contact_prestataire,mail_contact_prestataire,commentaires,date_arret_activite_du_prestataire FROM Prestataires
LEFT JOIN TypePrestataires ON Prestataires.code_type_de_Prestataire = TypePrestataires.code_type_de_Prestataire
WHERE code_Prestataire = ?;