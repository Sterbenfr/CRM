CREATE TABLE AffectationDonateursProspecteurs (
    code_Utilisateur_Prospecteur INT,
    code_Entite INT,
    commentaires VARCHAR(200),
    date_affectation DATE NOT NULL,
    date_arret_affectation DATE,
    PRIMARY KEY (code_Utilisateur_Prospecteur, code_Entite),
    FOREIGN KEY (code_Utilisateur_Prospecteur) REFERENCES Utilisateurs(code_utilisateur) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (code_Entite) REFERENCES Entite(code_Entite) ON UPDATE CASCADE ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO AffectationDonateursProspecteurs (
    code_Utilisateur_Prospecteur,
    code_Entite,
    commentaires,
    date_affectation,
    date_arret_affectation
) VALUES 
(1, 1, 'Premier affectation', '2023-01-01', '2023-12-31'),
(2, 2, 'Deuxième affectation', '2023-02-01', '2023-11-30'),
(3, 3, 'Troisième affectation', '2023-03-01', NULL),
(4, 4, 'Quatrième affectation', '2023-04-01', '2023-10-31'),
(5, 5, 'Cinquième affectation', '2023-05-01', '2023-09-30');
