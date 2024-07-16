CREATE TABLE Groupe (
    code_groupe INT PRIMARY KEY AUTO_INCREMENT,
    nom_du_Groupe VARCHAR(50) NOT NULL,
    Logo VARCHAR(200),
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

