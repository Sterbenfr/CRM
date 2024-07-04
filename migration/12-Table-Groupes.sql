CREATE TABLE Groupe (
    code_Groupe INT PRIMARY KEY AUTO_INCREMENT, -- clé primaire
    nom_du_Groupe VARCHAR(255) NOT NULL,
    Logo BLOB, -- assuming Logo is an image or binary data
    site_Web VARCHAR(255),
    commentaires VARCHAR(200),
    date_arret_activite_du_Groupe DATE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO Groupe (
    nom_du_Groupe,
    Logo,
    site_Web,
    commentaires,
    date_arret_activite_du_Groupe
) VALUES 
('Groupe Alpha', NULL, 'http://www.alpha.com', 'Premier groupe', NULL),
('Groupe Beta', NULL, 'http://www.beta.com', 'Deuxième groupe', NULL),
('Groupe Gamma', NULL, 'http://www.gamma.com', 'Troisième groupe', NULL),
('Groupe Delta', NULL, 'http://www.delta.com', 'Quatrième groupe', NULL),
('Groupe Epsilon', NULL, 'http://www.epsilon.com', 'Cinquième groupe', NULL);

