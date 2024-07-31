CREATE TABLE Reception (
    numero_reception INT AUTO_INCREMENT,
    code_Don INT NOT NULL,
    numero_livraison INT NOT NULL,
    date_reception DATE NOT NULL,
    heure_reception TIME NOT NULL,
    nombre_palettes_recues INT,
    nombre_palettes_consignees_recues INT,
    nombre_palettes_consignees_rendues INT,
    nombre_cartons_recus INT,
    poids_recu_kg INT,
    produits_sur_palettes ENUM('O', 'N'),
    commentaires VARCHAR(200),
    pieces_associees VARCHAR(200),
    PRIMARY KEY (numero_reception),
    FOREIGN KEY (code_Don) REFERENCES Dons(code_Don) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (numero_livraison) REFERENCES ModalitesLivraison(numero_livraison) ON UPDATE CASCADE ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;