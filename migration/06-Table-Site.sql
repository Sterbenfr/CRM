CREATE TABLE Sites (
    code_site INT(5) NOT NULL AUTO_INCREMENT,
    designation_longue VARCHAR(40),
    designation_courte VARCHAR(15) NOT NULL,
    adresse TEXT NOT NULL,
    code_type_site CHAR(4) NOT NULL,
    date_ouverture DATE,
    date_fermeture DATE,
    numero_telephone VARCHAR(12),
    adresse_mail TEXT,
    commentaires VARCHAR(200),
    PRIMARY KEY (code_site),
    FOREIGN KEY (code_type_site) REFERENCES SiteTypes(code_type_site) ON UPDATE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO Sites (
    designation_longue,
    designation_courte,
    adresse,
    code_type_site,
    date_ouverture,
    date_fermeture,
    numero_telephone,
    adresse_mail,
    commentaires
) VALUES 
('Siège Social', 'Siège', '123 Rue de Paris, 75001 Paris', 'AN', '2020-01-01', NULL, '0123456789', 'contact@entreprise.com', 'Commentaires sur le siège social'),
('Entrepôt Principal', 'Entrepôt', '456 Avenue de Lyon, 69000 Lyon', 'EO', '2020-02-01', NULL, '0234567890', 'entrepot@entreprise.com', "Commentaires sur l'entrepôt principal"),
('Bureau Régional', 'Bureau', '789 Boulevard de Nice, 06000 Nice', 'AD', '2020-03-01', NULL, '0345678901', 'bureau@entreprise.com', 'Commentaires sur le bureau régional'),
('Centre de Distribution', 'Distribution', '101 Rue de Marseille, 13000 Marseille', 'DR', '2020-04-01', NULL, '0456789012', 'distribution@entreprise.com', 'Commentaires sur le centre de distribution'),
('Magasin de Détail', 'Magasin', '202 Place de Bordeaux, 33000 Bordeaux', 'CD', '2020-05-01', NULL, '0567890123', 'magasin@entreprise.com', 'Commentaires sur le magasin de détail');
