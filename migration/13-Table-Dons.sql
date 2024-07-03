CREATE TABLE Dons (
    code_Don INT PRIMARY KEY AUTO_INCREMENT,
    code_Entite_donatrice INT(7),
    date_proposition_don DATE NOT NULL,
    code_contact_Entite_donatrice INT,
    code_type_don CHAR(4) NOT NULL,
    code_type_competences CHAR(4),
    code_type_produits CHAR(4),
    code_mode_conservation_produits CHAR(4),
    date_debut_mise_disposition DATE,
    date_fin_mise_disposition DATE,
    commentaires VARCHAR(200),
    pieces_associees BLOB,
    code_Utilisateur_saisie_don INT NOT NULL,
    statut_acceptation_don ENUM('V', 'R', 'A'),
    date_acceptation_refus_don DATE,
    code_Utilisateur_accepte_refuse_don INT,
    code_site_beneficiaire_don INT,
    indicateur_remerciement ENUM('O','N'),
    date_remerciement DATE,
    nom_destinataire_cerfa VARCHAR(50),
    adresse_destinataire_cerfa VARCHAR(100),
    adresse_mail_destinataire_cerfa VARCHAR(100),
    telephone_destinataire_cerfa VARCHAR(12),
    valeur_cerfa DECIMAL(10,2),
    cerfa_fait ENUM('O','N'),
    date_cerfa DATE,
    cerfa BLOB,
    FOREIGN KEY (code_Entite_donatrice) REFERENCES Entite(code_Entite) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (code_contact_Entite_donatrice) REFERENCES ContactEntite(code_utilisateur_suivant) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (code_type_don) REFERENCES TypesDons(code_type_don) ON UPDATE CASCADE,
    FOREIGN KEY (code_type_competences) REFERENCES TypesCompetences(code_type_competence) ON UPDATE CASCADE,
    FOREIGN KEY (code_type_produits) REFERENCES TypesProduits(code_type_produits) ON UPDATE CASCADE,
    FOREIGN KEY (code_mode_conservation_produits) REFERENCES ModeConservationProduits(code_mode_conservation_produits) ON UPDATE CASCADE,
    FOREIGN KEY (code_Utilisateur_saisie_don) REFERENCES Utilisateurs(code_utilisateur) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (code_Utilisateur_accepte_refuse_don) REFERENCES Utilisateurs(code_utilisateur) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (code_site_beneficiaire_don) REFERENCES Sites(code_site) ON UPDATE CASCADE ON DELETE SET NULL
);
INSERT INTO Dons (
    code_Entite_donatrice,
    date_proposition_don,
    code_contact_Entite_donatrice,
    code_type_don,
    code_type_competences,
    code_type_produits,
    code_mode_conservation_produits,
    date_debut_mise_disposition,
    date_fin_mise_disposition,
    commentaires,
    pieces_associees,
    code_Utilisateur_saisie_don,
    statut_acceptation_don,
    date_acceptation_refus_don,
    code_Utilisateur_accepte_refuse_don,
    code_site_beneficiaire_don,
    indicateur_remerciement,
    date_remerciement,
    nom_destinataire_cerfa,
    adresse_destinataire_cerfa,
    adresse_mail_destinataire_cerfa,
    telephone_destinataire_cerfa,
    valeur_cerfa,
    cerfa_fait,
    date_cerfa,
    cerfa
) VALUES 
(1, '2023-01-01', 1, 'MAR', NULL, 'ALI', 'AMB', '2023-02-01', '2023-12-31', 'Don de compétences techniques', NULL, 1, 'V', '2023-01-15', 1, 1, 'N', NULL, NULL, NULL, NULL, NULL, NULL, 'N', NULL, NULL),
(2, '2023-02-01', 2, 'FIN', NULL, 'VET', NULL, '2023-03-01', '2023-11-30', 'Don de produits alimentaires', NULL, 2, 'V', '2023-02-15', 2, 2, 'O', '2023-06-25', 'John Doe', '123 Main St', 'john.doe@example.com', '1234567890', 500.00, 'O', '2023-06-26', NULL),
(3, '2023-03-01', 3, 'RAM', NULL, NULL, NULL, '2023-04-01', '2023-10-31', 'Don de services juridiques', NULL, 3, 'R', '2023-03-15', 3, 3, 'N', NULL, NULL, NULL, NULL, NULL, NULL, 'N', NULL, NULL),
(4, '2023-04-01', 4, 'SIE', NULL, NULL, NULL, '2023-05-01', '2023-09-30', 'Don de matériel informatique', NULL, 4, 'V', '2023-04-15', 4, 4, 'O', '2023-07-08', 'Jane Smith', '456 Elm St', 'jane.smith@example.com', '0987654321', 1000.00, 'O', '2023-07-09', NULL),
(5, '2023-05-01', 5, 'SIP', 'MAK', NULL, NULL, '2023-06-01', '2023-08-31', 'Don de vêtements', NULL, 5, 'R', '2023-05-15', 5, 5, 'N', NULL, NULL, NULL, NULL, NULL, NULL, 'N', NULL, NULL);
