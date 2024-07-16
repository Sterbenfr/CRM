CREATE TABLE Reception (
    numero_reception INT AUTO_INCREMENT,
    code_Don INT,
    numero_livraison INT,
    date_reception DATE,
    heure_reception TIME,
    nombre_palettes_recues INT,
    nombre_palettes_consignees_recues INT,
    nombre_palettes_consignees_rendues INT,
    nombre_cartons_recus INT,
    poids_recu_kg INT,
    produits_sur_palettes VARCHAR(1),
    commentaires VARCHAR(200),
    pieces_associees VARCHAR(200),
    PRIMARY KEY (numero_reception),
    FOREIGN KEY (code_Don) REFERENCES Dons(code_Don) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (numero_livraison) REFERENCES ModalitesLivraison(numero_livraison) ON UPDATE CASCADE ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO Reception (
    numero_reception,
    code_Don,
    numero_livraison,
    date_reception,
    heure_reception,
    nombre_palettes_recues,
    nombre_palettes_consignees_recues,
    nombre_palettes_consignees_rendues,
    nombre_cartons_recus,
    poids_recu_kg,
    produits_sur_palettes,
    commentaires,
    pieces_associees
) VALUES 
(1, 1, 1, '2023-06-01', '08:00:00', 10, 8, 8, 200, 1000, 'O', 'Réception conforme', NULL),
(2, 2, 2, '2023-06-02', '09:00:00', 12, 10, 10, 250, 1200, 'O', 'Réception conforme', NULL),
(3, 3, 3, '2023-06-03', '10:00:00', 15, 12, 12, 300, 1500, 'O', 'Réception conforme', NULL),
(4, 4, 4, '2023-06-04', '11:00:00', 20, 18, 18, 400, 2000, 'O', 'Réception conforme', NULL),
(5, 5, 5, '2023-06-05', '12:00:00', 25, 20, 20, 500, 2500, 'O', 'Réception conforme', NULL);
