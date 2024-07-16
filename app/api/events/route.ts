import { NextResponse } from 'next/server'
import pool from '../../../utils/db'

export async function GET() {
    try {
        // Récupérer les données de don, réception, modalités de livraison et entreprise
        const [donsD] = await pool.query(
            'SELECT nom_commercial, code_Don AS id, date_debut_mise_disposition AS date, CONCAT("Début de mise à disposition du don : ", nom_commercial) AS title FROM `dons` LEFT JOIN Entite ON Entite.code_entite = Dons.code_Entite_donatrice',
        )

        const [donsF] = await pool.query(
            'SELECT nom_commercial, code_Don AS id, date_fin_mise_disposition AS date, CONCAT("Fin de mise à disposition du don : ", nom_commercial) AS title FROM `dons` LEFT JOIN Entite ON Entite.code_entite = Dons.code_Entite_donatrice',
        )

        const [receptions] = await pool.query(
            'SELECT r.code_Don, r.numero_reception AS id, r.date_reception AS date, CONCAT("Reception du don : ", nom_commercial) AS title, e.nom_commercial AS nom_commercial FROM `reception` r LEFT JOIN `Dons` d ON r.code_Don = d.code_Don LEFT JOIN `Entite` e ON d.code_Entite_donatrice = e.code_entite',
        )

        const [modaliteslivraison] = await pool.query(
            'SELECT ml.code_Don, ml.numero_livraison AS id, ml.date_prevue_livraison AS date, CONCAT("Livraison du don : ", nom_commercial) AS title, e.nom_commercial AS nom_commercial FROM `modaliteslivraison` ml LEFT JOIN `Dons` d ON ml.code_Don = d.code_Don LEFT JOIN `Entite` e ON d.code_Entite_donatrice = e.code_entite',
        )

        const [interactions] = await pool.query(
            'SELECT i.code_Entite_Prospectee, i.code_interaction AS id, i.date_interaction AS date, CONCAT("Interaction du don : ", e.nom_commercial) AS title, e.code_societe_appartenance, e.nom_commercial FROM `interactions` i LEFT JOIN `Entite` e ON e.code_entite = i.code_Entite_Prospectee',
        )

        const [interactionsrelance] = await pool.query(
            'SELECT i.code_Entite_Prospectee, i.code_interaction AS id, i.date_relance AS date, CONCAT("Relance d\'interaction du don : ", i.code_interaction) AS title, e.code_societe_appartenance, e.nom_commercial FROM `interactions` i LEFT JOIN `Entite` e ON e.code_entite = i.code_Entite_Prospectee',
        )

        console.log(donsD)

        // Ajouter un préfixe aux identifiants pour éviter les conflits
        const formattedDonsD = donsD.map((donsD: { id: number }) => ({
            ...donsD,
            id: `donsD-${donsD.id}`,
            url: `http://localhost:3000/dons/${donsD.id}`,
        }))

        const formattedDonsF = donsF.map((donsF: { id: number }) => ({
            ...donsF,
            id: `don-${donsF.id}`,
            url: `http://localhost:3000/dons/${donsF.id}`,
        }))

        const formattedReceptions = receptions.map(
            (reception: { id: number; code_Don: number }) => ({
                ...reception,
                id: `reception-${reception.id}`,
                url: `http://localhost:3000/dons/${reception.code_Don}/reception/${reception.id}`,
            }),
        )

        const formattedModalitesLivraison = modaliteslivraison.map(
            (modaliteslivraison: { id: number; code_Don: number }) => ({
                ...modaliteslivraison,
                id: `modaliteslivraison-${modaliteslivraison.id.toString()}`,
                url: `http://localhost:3000/dons/${modaliteslivraison.code_Don}/modalites-livraison/${modaliteslivraison.id}`,
            }),
        )

        const formattedInteractions = interactions.map(
            (interactions: {
                id: number
                code_Utilisateur_Prospecteur: number
                code_societe_appartenance: number
            }) => ({
                ...interactions,
                id: `interactions-${interactions.id.toString()}`,
                url: `http://localhost:3000/societe/${interactions.code_Utilisateur_Prospecteur}/entite/${interactions.code_societe_appartenance}/interaction/${interactions.id}`,
            }),
        )

        const formattedInteractionsRelance = interactionsrelance.map(
            (interactionsrelance: {
                id: number
                code_Utilisateur_Prospecteur: number
                code_societe_appartenance: number
            }) => ({
                ...interactionsrelance,
                id: `interactionsrelance-${interactionsrelance.id.toString()}`,
                url: `http://localhost:3000/societe/${interactionsrelance.code_Utilisateur_Prospecteur}/entite/${interactionsrelance.code_societe_appartenance}/interaction/${interactionsrelance.id}`,
            }),
        )

        // Combiner les ensembles de résultats
        const events = [
            ...formattedDonsD,
            ...formattedDonsF,
            ...formattedReceptions,
            ...formattedModalitesLivraison,
            ...formattedInteractions,
            ...formattedInteractionsRelance,
        ]

        return NextResponse.json(events)
    } catch (err) {
        console.error('Internal Server Error:', err) // Log the error for debugging purposes
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}
