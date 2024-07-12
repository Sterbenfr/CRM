CREATE TABLE Contacts (
    code_entite INT(7) NOT NULL,
    code_contact INT(3) NOT NULL AUTO_INCREMENT,
    civilite CHAR(3) NOT NULL,
    nom VARCHAR(20) NOT NULL,
    prenom VARCHAR(20) NOT NULL,
    photo BLOB,
    fonction VARCHAR(30),
    service VARCHAR(30),
    numero_fixe VARCHAR(12),
    numero_portable VARCHAR(12),
    adresse_mail TEXT,
    commentaires VARCHAR(200),
    date_arret_contact DATE,
    PRIMARY KEY (code_contact,code_entite),
    FOREIGN KEY (code_entite) REFERENCES Entite(code_entite) ON UPDATE CASCADE ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO Contacts (
    code_entite,
    civilite,
    nom,
    prenom,
    photo,
    fonction,
    service,
    numero_fixe,
    numero_portable,
    adresse_mail,
    commentaires,
    date_arret_contact
) VALUES 
(1, 'M.', 'Dupont', 'Jean', NULL, 'Directeur', 'Administration', '0123456789', '0612345678', 'jean.dupont@example.com', 'Premier contact', NULL),
(2, 'Mme', 'Martin', 'Sophie', NULL, 'Responsable', 'Comptabilité', '0123456790', '0612345679', 'sophie.martin@example.com', 'Deuxième contact', NULL),
(3, 'M.', 'Durand', 'Pierre', NULL, 'Technicien', 'Informatique', '0123456791', '0612345680', 'pierre.durand@example.com', 'Troisième contact', NULL),
(4, 'Mme', 'Leroy', 'Claire', NULL, 'Assistante', 'Ressources Humaines', '0123456792', '0612345681', 'claire.leroy@example.com', 'Quatrième contact', NULL),
(5, 'M.', 'Moreau', 'Louis', NULL, 'Chef de projet', 'Marketing', '0123456793', '0612345682', 'louis.moreau@example.com', 'Cinquième contact', NULL);
