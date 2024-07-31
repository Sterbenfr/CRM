CREATE TABLE Interlocuteurs (
    code_interlocuteur INT(6) NOT NULL AUTO_INCREMENT,
    code_site INT(6) NOT NULL,
    civilite CHAR(3) NOT NULL,
    nom VARCHAR(20) NOT NULL,
    prenom VARCHAR(20) NOT NULL,
    tel_perso VARCHAR(12),
    mail VARCHAR(50),
    commentaires VARCHAR(200),
    code_type_interlocuteur CHAR(4) NOT NULL,
    PRIMARY KEY (code_interlocuteur),
    FOREIGN KEY (code_type_interlocuteur) REFERENCES TypeInterlocuteur(code_type_interlocuteur) ON UPDATE CASCADE,
    FOREIGN KEY (code_site) REFERENCES Sites(code_site) ON UPDATE CASCADE
);
