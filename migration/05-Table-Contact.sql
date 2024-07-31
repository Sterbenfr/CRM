CREATE TABLE Contacts (
    code_entite INT(7) NOT NULL,
    code_contact INT(6) NOT NULL AUTO_INCREMENT,
    civilite CHAR(3) NOT NULL,
    nom VARCHAR(20) NOT NULL,
    prenom VARCHAR(20) NOT NULL,
    photo VARCHAR(200),
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
