CREATE TABLE Interactions (
    code_interaction INT AUTO_INCREMENT,
    code_Utilisateur_Prospecteur INT,
    code_Entite_Prospectee INT NOT NULL,
    date_interaction DATE NOT NULL,
    code_type_interaction CHAR(4),
    code_modalite_interaction CHAR(4),
    code_contact_entite INT,
    commentaires VARCHAR(200),
    pieces_associees VARCHAR(200),
    date_relance DATE,
    PRIMARY KEY (code_interaction),
    FOREIGN KEY (code_Utilisateur_Prospecteur) REFERENCES Utilisateurs(code_utilisateur) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (code_Entite_Prospectee) REFERENCES Entite(code_Entite) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (code_type_interaction) REFERENCES TypeInteractions(code_type_interaction) ON UPDATE CASCADE,
    FOREIGN KEY (code_modalite_interaction) REFERENCES ModaliteInteractions(code_modalite_interaction) ON UPDATE CASCADE,
    FOREIGN KEY (code_contact_entite) REFERENCES Contacts(code_contact) ON UPDATE CASCADE ON DELETE SET NULL
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;