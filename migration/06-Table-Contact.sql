CREATE TABLE Contacts (
    code_entite INT(7) NOT NULL,
    code_contact INT(3) NOT NULL AUTO_INCREMENT,
    civilite CHAR(3) NOT NULL,
    nom VARCHAR(20) NOT NULL,
    prenom VARCHAR(20) NOT NULL,
    photo BLOB,
    fonction VARCHAR(30),
    service VARCHAR(30),
    numero_fixe TEXT,
    numero_portable TEXT,
    adresse_mail TEXT,
    commentaires VARCHAR(200),
    date_arret_contact DATE,
    PRIMARY KEY (code_contact,code_entite),
    FOREIGN KEY (code_entite) REFERENCES Entite(code_entite) ON UPDATE CASCADE ON DELETE CASCADE
);
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
(1, 'M.', 'Dupont', 'Jean', NULL, 'Directeur', 'Administration', '01 23 45 67 89', '06 12 34 56 78', 'jean.dupont@example.com', 'Premier contact', NULL),
(2, 'Mme', 'Martin', 'Sophie', NULL, 'Responsable', 'Comptabilité', '01 23 45 67 90', '06 12 34 56 79', 'sophie.martin@example.com', 'Deuxième contact', NULL),
(3, 'M.', 'Durand', 'Pierre', NULL, 'Technicien', 'Informatique', '01 23 45 67 91', '06 12 34 56 80', 'pierre.durand@example.com', 'Troisième contact', NULL),
(4, 'Mme', 'Leroy', 'Claire', NULL, 'Assistante', 'Ressources Humaines', '01 23 45 67 92', '06 12 34 56 81', 'claire.leroy@example.com', 'Quatrième contact', NULL),
(5, 'M.', 'Moreau', 'Louis', NULL, 'Chef de projet', 'Marketing', '01 23 45 67 93', '06 12 34 56 82', 'louis.moreau@example.com', 'Cinquième contact', NULL);
