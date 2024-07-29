CREATE TABLE SitesRattachement (
    code_interlocuteur INT(6) NOT NULL,
    code_site INT(5) NOT NULL,
    code_type_utilisateur CHAR(4) NOT NULL,
    date_fin_activite DATE,
    PRIMARY KEY (code_interlocuteur, code_site),
    FOREIGN KEY (code_interlocuteur) REFERENCES Interlocuteurs(code_interlocuteur) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (code_site) REFERENCES Sites(code_site) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (code_type_utilisateur) REFERENCES TypesUtilisateurs(code_type_utilisateur) ON UPDATE CASCADE
);
INSERT INTO SitesRattachement (
    code_interlocuteur,
    code_site,
    code_type_utilisateur,
    date_fin_activite
) VALUES 
(1, 1, 'EN', NULL),
(2, 2, 'AP', NULL),
(3, 3, 'SU', NULL),
(4, 4, 'AP', NULL),
(5, 5, 'AD', NULL);
