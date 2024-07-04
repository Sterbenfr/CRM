CREATE TABLE Interactions (
    code_interaction INT AUTO_INCREMENT,
    code_Utilisateur_Prospecteur INT,
    code_Entite_Prospectee INT,
    date_interaction DATE,
    code_type_interaction CHAR(4),
    code_modalite_interaction CHAR(4),
    code_contact_entite INT,
    commentaires VARCHAR(200),
    pieces_associees BLOB, -- Assuming pieces_associees is for storing PDF files or similar
    date_relance DATE,
    PRIMARY KEY (code_interaction),
    FOREIGN KEY (code_Utilisateur_Prospecteur) REFERENCES Utilisateurs(code_utilisateur),
    FOREIGN KEY (code_Entite_Prospectee) REFERENCES Entite(code_Entite),
    FOREIGN KEY (code_type_interaction) REFERENCES TypeInteractions(code_type_interaction),
    FOREIGN KEY (code_modalite_interaction) REFERENCES ModaliteInteractions(code_modalite_interaction),
    FOREIGN KEY (code_contact_entite) REFERENCES ContactEntite(code_utilisateur_suivant)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO Interactions (
    code_Utilisateur_Prospecteur,
    code_Entite_Prospectee,
    date_interaction,
    code_type_interaction,
    code_modalite_interaction,
    code_contact_entite,
    commentaires,
    pieces_associees,
    date_relance
) VALUES 
(1, 1, '2023-06-01', 'PRE', 'TEL', 1, "Première interaction avec l'entité 101", NULL, '2023-06-15'),
(2, 2, '2023-06-02', 'PRE', 'TEL', 2, "Deuxième interaction avec l'entité 102", NULL, '2023-06-16'),
(3, 3, '2023-06-03', 'REL', 'SMS', 3, "Troisième interaction avec l'entité 103", NULL, '2023-06-17'),
(4, 4, '2023-06-04', 'PRE', 'MAI', 4, "Quatrième interaction avec l'entité 104", NULL, '2023-06-18');
