import { NextResponse } from 'next/server'
import pool from '/root/Stage-test/utils/db'

export async function GET() {
    try {
        // Récupérer les données de don, réception, modalités de livraison et entreprise
        const [donsD] = await pool.query(
            'SELECT code_Don AS id, date_debut_mise_disposition AS date, CONCAT("Début de mise à disposition du don n°", code_Don) AS title FROM `dons`',
        )

        const [donsF] = await pool.query(
            'SELECT code_Don AS id, date_fin_mise_disposition AS date, CONCAT("Fin de mise à disposition du don n°", code_Don) AS title FROM `dons`',
        )

        const [receptions] = await pool.query(
            'SELECT code_Don, numero_reception AS id, date_reception AS date, CONCAT("RECEPTION n°", numero_reception) AS title FROM `reception`',
        )

        const [modaliteslivraison] = await pool.query(
            'SELECT code_Don, numero_livraison AS id, date_prevue_livraison AS date, CONCAT("LIVRAISON n°", numero_livraison) AS title FROM `modaliteslivraison`',
        )

        const [interactions] = await pool.query(
            'SELECT code_Entite_Prospectee, code_interaction as id ,date_interaction as date, CONCAT("Interaction n°", code_interaction) AS title, Entite.code_societe_appartenance FROM `interactions` LEFT JOIN Entite ON Entite.code_entite = Interactions.code_Entite_Prospectee',
        )

        const [interactionsrelance] = await pool.query(
            'SELECT code_Entite_Prospectee, code_interaction as id ,date_relance as date, CONCAT("Relance d\'interaction n°", code_interaction) AS title, Entite.code_societe_appartenance FROM `interactions` LEFT JOIN Entite ON Entite.code_entite = Interactions.code_Entite_Prospectee',
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
                id: `interactions-${interactionsrelance.id.toString()}`,
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
