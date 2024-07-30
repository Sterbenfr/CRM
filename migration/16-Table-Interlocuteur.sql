CREATE TABLE Interlocuteurs (
    code_interlocuteur INT(6) NOT NULL AUTO_INCREMENT,
    civilite CHAR(3) NOT NULL,
    nom VARCHAR(20) NOT NULL,
    prenom VARCHAR(20) NOT NULL,
    tel_perso VARCHAR(12),
    mail VARCHAR(50),
    commentaires VARCHAR(200),
    code_type_interlocuteur CHAR(4) NOT NULL,
    PRIMARY KEY (code_interlocuteur),
    FOREIGN KEY (code_type_interlocuteur) REFERENCES TypeInterlocuteur(code_type_interlocuteur) ON UPDATE CASCADE 
);
INSERT INTO Interlocuteurs (civilite, nom, prenom, tel_perso, mail, commentaires, code_type_interlocuteur) VALUES
('M.', 'Dupont', 'Jean', '0123456789', 'jean.dupont@gmail.com', 'Nouveau bénévole.', null),
('Mme', 'Martin', 'Marie', '0987654321', 'marie.martin@gmail.com', 'Responsable de secteur.', null),
('M.', 'Durand', 'Paul', '0123987654', 'paul.durand@gmail.com', 'Volontaire depuis 2 ans.', null),
('Mme', 'Petit', 'Sophie', '0765432109', 'sophie.petit@gmail.com', 'Coordination des événements.', null),
('Aut','Admin','Admin','0123456789','admin@admin.com','Administrateur.', null),
('M.', 'Leroy', 'Julien', '0654321987', 'julien.leroy@gmail.com', 'Gestion des stocks.', null);
