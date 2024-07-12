CREATE TABLE ContactEntite (
    code_entite INT(7) NOT NULL,
    code_type_site CHAR(4) NOT NULL,
    code_site_suivi INT(5) NOT NULL,
    code_utilisateur_suivant INT(6) NOT NULL,
    PRIMARY KEY (code_entite, code_site_suivi, code_type_site),
    FOREIGN KEY (code_entite) REFERENCES Entite(code_entite) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (code_type_site) REFERENCES SiteTypes(code_type_site) ON UPDATE CASCADE,
    FOREIGN KEY (code_site_suivi) REFERENCES Sites(code_site) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (code_utilisateur_suivant) REFERENCES Utilisateurs(code_utilisateur) ON UPDATE CASCADE ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO ContactEntite (
    code_entite,
    code_type_site,
    code_site_suivi,
    code_utilisateur_suivant
) VALUES 
(1, 'AN', 1, 1),
(2, 'DR', 2, 2),
(3, 'AD', 3, 3),
(4, 'CD', 4, 4),
(5, 'EO', 5, 5);
