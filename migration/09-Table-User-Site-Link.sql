CREATE TABLE SitesRattachement (
    code_utilisateur INT(6) NOT NULL,
    code_site INT(5) NOT NULL,
    code_type_utilisateur CHAR(4) NOT NULL,
    date_fin_activite DATE,
    PRIMARY KEY (code_utilisateur, code_site),
    FOREIGN KEY (code_utilisateur) REFERENCES Utilisateurs(code_utilisateur) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (code_site) REFERENCES Sites(code_site) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (code_type_utilisateur) REFERENCES TypesUtilisateurs(code_type_utilisateur) ON UPDATE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO SitesRattachement (
    code_utilisateur,
    code_site,
    code_type_utilisateur,
    date_fin_activite
) VALUES 
(1, 1, 'PR', NULL),
(2, 2, 'AP', NULL),
(3, 3, 'RR', NULL),
(4, 4, 'RC', NULL),
(5, 5, 'RR', NULL);
