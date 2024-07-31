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
