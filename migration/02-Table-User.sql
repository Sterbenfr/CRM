CREATE TABLE Utilisateurs (
    code_utilisateur INT(6) NOT NULL AUTO_INCREMENT,
    civilite CHAR(3) NOT NULL,
    nom VARCHAR(20) NOT NULL,
    prenom VARCHAR(20) NOT NULL,
    tel_perso VARCHAR(12),
    mail_restos_du_coeur VARCHAR(50),
    commentaires VARCHAR(200),
    password VARCHAR(150) NOT NULL,
    code_type_utilisateur CHAR(4) NOT NULL,
    PRIMARY KEY (code_utilisateur),
    FOREIGN KEY (code_type_utilisateur) REFERENCES TypesUtilisateurs(code_type_utilisateur) ON UPDATE CASCADE 
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO Utilisateurs (civilite, nom, prenom, tel_perso, mail_restos_du_coeur, commentaires, password, code_type_utilisateur) VALUES
('Mr.', 'Dupont', 'Jean', '0123456789', 'jean.dupont@restosducoeur.org', 'Nouveau bénévole.', '$2b$10$c80G054p1ZlKW42Qf9bDuexFCdDjxc4R/xdaisQi7AvZfiGShpmLe', 'PR'),
('Mme', 'Martin', 'Marie', '0987654321', 'marie.martin@restosducoeur.org', 'Responsable de secteur.', '$2b$10$c80G054p1ZlKW42Qf9bDuexFCdDjxc4R/xdaisQi7AvZfiGShpmLe', 'AP'),
('Mr.', 'Durand', 'Paul', '0123987654', 'paul.durand@restosducoeur.org', 'Volontaire depuis 2 ans.', '$2b$10$c80G054p1ZlKW42Qf9bDuexFCdDjxc4R/xdaisQi7AvZfiGShpmLe', 'RR'),
('Mme', 'Petit', 'Sophie', '0765432109', 'sophie.petit@restosducoeur.org', 'Coordination des événements.', '$2b$10$c80G054p1ZlKW42Qf9bDuexFCdDjxc4R/xdaisQi7AvZfiGShpmLe', 'RE'),
('Mr.','Admin','Admin','0123456789','admin@admin.com','Administrateur.', '$2b$10$c80G054p1ZlKW42Qf9bDuexFCdDjxc4R/xdaisQi7AvZfiGShpmLe', 'AD'),
('M.', 'Leroy', 'Julien', '0654321987', 'julien.leroy@restosducoeur.org', 'Gestion des stocks.', '$2b$10$c80G054p1ZlKW42Qf9bDuexFCdDjxc4R/xdaisQi7AvZfiGShpmLe', 'RC');
