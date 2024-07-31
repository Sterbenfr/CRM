CREATE TABLE SuiviSociete (
    code_Societe INT NOT NULL,
    code_type_de_Site VARCHAR(4) NOT NULL,
    code_site_suivi INT NOT NULL,
    code_utilisateur_suivant INT NOT NULL,
    PRIMARY KEY (code_Societe, code_type_de_Site),
    FOREIGN KEY (code_Societe) REFERENCES Entreprise(code_Societe) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (code_type_de_Site) REFERENCES SiteTypes(code_type_Site) ON UPDATE CASCADE,
    FOREIGN KEY (code_site_suivi) REFERENCES Sites(code_site) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (code_utilisateur_suivant) REFERENCES Utilisateurs(code_utilisateur) ON UPDATE CASCADE ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;