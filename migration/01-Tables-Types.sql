CREATE TABLE TypesUtilisateurs (
    code_type_utilisateur CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert predefined types of utilisateurs
INSERT INTO TypesUtilisateurs (code_type_utilisateur, libelle)
VALUES
('PR', 'Prospecteur'),
('AP', 'Approvisionneur'),
('RR', 'Responsable Réception'),
('RE', 'Responsable Entrepôt'),
('RC', 'Responsable de Centre'),
('RS', 'Responsable Site'),
('RA', 'Responsable Antenne'),
('RN', 'Responsable National'),
('AD', 'Administrateur');

CREATE TABLE SiteTypes (
    code_type_site CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert predefined types of sites
INSERT INTO SiteTypes (code_type_site, libelle)
VALUES
('AN', 'Association Nationale'),
('DR', 'Délégation Régionale'),
('AD', 'Antenne Départementale'),
('CD', 'Centre de Distribution'),
('EO', "Entrepôt d'Opportunité");

CREATE TABLE TypesEntites (
    code_type_entite CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert predefined types of entites
INSERT INTO TypesEntites (code_type_entite, libelle)
VALUES
('CEN', "Centrale d'Achat"),
('ENT', 'Entrepôt'),
('MAG', 'Magasin'),
('SIE', 'Siège social'),
('SIP', 'Site production'),
('ADM', 'Administration'),
('GRO', 'Grossiste'),
('ECO', 'Ecole');

CREATE TABLE TypesDons (
    code_type_don CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert predefined types of dons
INSERT INTO TypesDons (code_type_don, libelle)
VALUES
('MAR', 'Marchandises'),
('FIN', 'Financiers'),
('RAM', 'Ramasse'),
('SIE', 'Prestations'),
('SIP', 'Compétences');

CREATE TABLE TypesProduits (
    code_type_produits CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert predefined types of produits
INSERT INTO TypesProduits (code_type_produits, libelle)
VALUES
('ALI', 'Alimentaire'),
('VET', 'Vêtements'),
('HYG', 'Hygiène'),
('EQM', 'Equipement maison');

CREATE TABLE TypesCompetences (
    code_type_competence CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert predefined types of competences
INSERT INTO TypesCompetences (code_type_competence, libelle)
VALUES
('FIN', 'Formation informatique'),
('MAK', 'Marketing'),
('DEV', 'Développement informatique'),
('BRI', 'Bricolage');

CREATE TABLE FrequencesCerfa (
    code_frequence_cerfa CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert predefined frequencies for Cerfa
INSERT INTO FrequencesCerfa (code_frequence_cerfa, libelle)
VALUES
('LIV', 'Livraison'),
('MEN', 'Mensuel'),
('ANN', 'Annuel');

CREATE TABLE TypeActiviteSociete (
    code CHAR(3) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO TypeActiviteSociete (code, libelle) VALUES
('DIS', 'Distributeur'),
('FAB', 'Fabricant'),
('PRE', 'Prestataire de Services'),
('ADM', 'Administration');

CREATE TABLE TypePrestataires (
    code_type_de_Prestataire CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO TypePrestataires (code_type_de_Prestataire, libelle) VALUES
('TRA', 'Transporteur');

CREATE TABLE TypeInteractions (
    code_type_interaction CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO TypeInteractions (code_type_interaction, libelle) VALUES
('PRE', '1er contact'),
('REL', 'Relance');

CREATE TABLE ModaliteInteractions (
    code_modalite_interaction CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO ModaliteInteractions (code_modalite_interaction, libelle) VALUES
('TEL', 'Téléphone'),
('MAI', 'Mail'),
('SMS', 'SMS');

CREATE TABLE ModeConservationProduits (
    code_mode_conservation_produits CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO ModeConservationProduits (code_mode_conservation_produits, libelle) VALUES
('AMB', 'Ambiant'),
('SUR', 'Surgelés'),
('FRA', 'Frais');

CREATE TABLE TypeLivraison (
    code_type_livraison CHAR(3) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO TypeLivraison (code_type_livraison, libelle) VALUES
('DON', 'Donateur'),
('RES', 'Restos'),
('TRA', 'Transporteur');