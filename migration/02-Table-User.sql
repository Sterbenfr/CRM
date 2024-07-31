CREATE TABLE Utilisateurs (
    code_utilisateur INT(6) NOT NULL AUTO_INCREMENT,
    civilite CHAR(3) NOT NULL,
    nom VARCHAR(20) NOT NULL,
    prenom VARCHAR(20) NOT NULL,
    tel_perso VARCHAR(12),
    mail VARCHAR(50),
    commentaires VARCHAR(200),
    password VARCHAR(150) NOT NULL,
    code_type_utilisateur CHAR(4) NOT NULL,
    PRIMARY KEY (code_utilisateur),
    FOREIGN KEY (code_type_utilisateur) REFERENCES TypesUtilisateurs(code_type_utilisateur) ON UPDATE CASCADE 
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;