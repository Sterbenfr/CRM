CREATE TABLE Groupe (
    code_groupe INT PRIMARY KEY AUTO_INCREMENT,
    nom_du_Groupe VARCHAR(50) NOT NULL,
    Logo VARCHAR(200),
    site_Web VARCHAR(255),
    commentaires VARCHAR(200),
    date_arret_activite_du_Groupe DATE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

