import React, { useEffect, useState } from 'react'
import SelectComponent from './select-component'
import SearchComponent from './searchComponent'
import style from '../styles/components.module.css'

// Mapping field IDs to column names
const fieldLabels: { [key: string]: string } = {
    //Dons
    code_Entite_donatrice: 'Entité donatrice',
    date_proposition_don: 'Date de proposition du don',
    code_contact_Entite_donatrice: "Contact de l'entité donatrice",
    code_type_don: 'Type de don',
    code_type_competences: 'Type de compétences',
    code_type_produits: 'Type de produits',
    code_mode_conservation_produits: 'Mode de conservation des produits',
    date_debut_mise_disposition: 'Date de début de mise à disposition',
    date_fin_mise_disposition: 'Date de fin de mise à disposition',
    commentaires: 'Commentaires',
    pieces_associees: 'Pièces associées',
    code_Utilisateur_saisie_don: 'Utilisateur de la saisie du don',
    statut_acceptation_don: 'Statut du don',
    date_acceptation_refus_don: "Date d'acceptation ou de refus du don",
    type_date_acceptation_refus: 'TOSEE',
    code_Utilisateur_accepte_refuse_don: 'Utilisateur',
    code_site_beneficiaire_don: 'Site du bénéficiaire',
    indicateur_remerciement: 'Indicateur du remerciement',
    date_remerciement: 'Date de remerciement du don',
    nom_destinataire_cerfa: 'Nom du destinataire cerfa',
    adresse_destinataire_cerfa: 'Adresse du destinataire cerfa',
    adresse_mail_destinataire_cerfa: 'Adresse mail du destinataire cerfa',
    telephone_destinataire_cerfa: 'Téléphone du destinataire cerfa',
    valeur_cerfa: 'Valeur du cerfa',
    cerfa_fait: 'Cerfa fait',
    date_cerfa: 'Date du cerfa',
    cerfa: 'Cerfa',
    //Modaliteés Livraison
    numero_livraison: 'Numéro de livraison',
    code_Don: 'Don',
    code_type_livraison: 'Type de livraison',
    date_prevue_livraison: 'Date de livraison prévue',
    heure_prevue_livraison: 'Heure de livraison prévue',
    adresse_enlevement: "Adresse d'enlèvement",
    civilite_contact_enlevement: "Civilité du contact d'enlèvement",
    nom_contact_enlevement: "Nom du contact d'enlèvement",
    prenom_contact_enlevement: "Prénom du contact d'enlèvement",
    telephone_contact_enlevement: "Téléphone du contact d'enlèvement",
    mail_contact_enlevement: "Mail du contact d'enlèvement",
    code_Prestataire_transporteur: 'Prestataire transporteur',
    adresse_livraison: 'Adresse de livraison',
    civilite_contact_livraison: 'Civilité du contact de livraison',
    nom_contact_livraison: 'Nom du contact de livraison',
    prenom_contact_livraison: 'Prénom du contact de livraison',
    telephone_contact_livraison: 'Téléphone du contact de livraison',
    mail_contact_livraison: 'Mail du contact de livraison',
    nombre_palettes_prevu: 'Nombre de palettes prévues',
    nombre_palettes_consignees_prevu: 'Nombre de palettes consignées prévues',
    nombre_cartons_prevu: 'Nombre de cartons prévus',
    poids_prevu_kg: 'Poids prévu en kg',
    produits_sur_palettes: 'Produits sur palettes',
    temperature_conserv_produits: 'Température de conservation des produits',
    //Reception
    numero_reception: 'Numéro de réception',
    numero_livraion: 'Numéro de livraison',
    date_reception: 'Date de réception',
    heure_reception: 'Heure de réception',
    nombre_palettes_recues: 'Nombre de palettes reçues',
    nombre_palettes_consignees_recues: 'Nombre de palettes consignées reçues',
    nombre_palettes_consignees_rendues: 'Nombre de palettes consignées rendues',
    nombre_cartons_recus: 'Nombre de cartons reçus',
    poids_recu_kg: 'Poids reçu en kg',
    //Cerfa
    numero_Cerfa: 'Numéro de Cerfa',
    montant_HT_Cerfa: 'Montant HT du Cerfa',
    date_realisation_Cerfa: 'Date de réalisation du Cerfa',
    date_envoi_Cerfa: 'Date denvoi du Cerfa',
    addresse_Cerfa: 'Adresse du Cerfa',
    civilite_destinataire_Cerfa: 'Civilité du destinataire du Cerfa',
    nom_destinataire_Cerfa: 'Nom du destinataire du Cerfa',
    prenom_destinataire_Cerfa: 'Prénom du destinataire du Cerfa',
    telephone_destinataire_Cerfa: 'Téléphone du destinataire du Cerfa',
    mail_destinataire_Cerfa: 'Mail du destinataire du Cerfa',
    //Prestataires
    code_Prestataire: 'Prestataire',
    code_type_de_Prestataire: 'Type de Prestataire',
    raison_sociale: 'Raison sociale',
    nom_commercial: 'Nom commercial',
    Siren: 'Siren',
    Siret: 'Siret',
    telephone: 'Téléphone',
    mail: 'Mail',
    adresse: 'Adresse',
    civilite_contact_prestataire: 'Civilité du prestataire',
    nom_contact_prestataire: 'Nom du prestataire',
    prenom_contact_prestataire: 'Prénom du prestataire',
    telephone_contact_prestataire: 'Téléphone du prestataire',
    mail_contact_prestataire: 'Mail du prestataire',
    date_arret_activite_du_prestataire:
        "Date d'arrêt d'activité du prestataire",
    //Interactions
    code_Utilisateur_Prospecteur: 'Utilisateur Prospecteur',
    code_Entite_Prospectee: 'Entité Prospecteur',
    date_interaction: "Date d'interaction",
    code_type_interaction: "Type d'interaction",
    code_modalite_interaction: "Modalité d'interaction",
    code_contact_entite: "Contact de l'entité",
    date_relance: 'Date de relance',
    //Sites
    code_Site: 'Site',
    designation_longue: 'Désignation longue',
    designation_courte: 'Désignation courte',
    code_type_site: 'Type de site',
    date_ouverture: "Date d'ouverture",
    date_fermeture: 'Date de fermeture',
    numero_telephone: 'Numéro de téléphone',
    adresse_mail: 'Adresse mail',
    //SitesRattachement
    code_utilisateur: 'Utilisateur',
    code_site: 'Site',
    code_type_utilisateur: "Type d'utilisateur",
    date_fin_activite: "Date de fin d'activité",
    //Utilisateurs
    civilite: 'Civilité',
    nom: 'Nom',
    prenom: 'Prénom',
    tel_perso: 'Téléphone personnel',
    mail_restos_du_coeur: 'Mail Restos du Coeur',
    password: 'Mot de passe',
    //Societe
    code_Societe: 'Société',
    Logo: 'Logo',
    site_Web: 'Site Web',
    code_type_activite_Societe: "Type d'activité de la société",
    code_Groupe_appartenance: 'Appartenance du Groupe',
    date_arret_activite_Societe: "Date d'arrêt d'activité de la société",
    //SuiviSociete
    code_type_de_Site: 'Type de site',
    code_site_suivi: 'Suivi de site',
    code_utilisateur_suivant: 'Utilisateur suivant',
    //Groupe
    code_Groupe: 'Groupe',
    nom_du_Groupe: 'Nom du Groupe',
    date_arret_activite_du_Groupe: "Date d'arrêt d'activité du Groupe",
    //SuiviGroupe
    //Entité
    code_entite: 'Entité',
    logo: 'Logo',
    siret: 'Siret',
    code_ape: 'APE',
    code_ape_naf: 'APE NAF',
    code_rna: 'RNA',
    code_cee: 'CEE',
    code_societe_appartenance: 'Appartenance de la société',
    site_internet: 'Site internet',
    code_type_entite: "Type d'entité",
    code_type_produit: 'Type de produit',
    code_type_competence: 'Type de compétence',
    commentaires_logistique: 'Commentaires de logistique',
    presence_quai: 'Présence en quai',
    code_frequence_cerfa: 'Fréquence de Cerfa',
    date_arret_activite: "Date d'arrêt d'activité de l'entité",
    //ContactEntite
    //Contacts
    code_contact: 'Contact',
    photo: 'Photo',
    fonction: 'Fonction',
    service: 'Service',
    numero_fixe: 'Numéro de téléphone fixe',
    numero_portable: 'Numéro de téléphone portable',
    date_arret_contact: 'Date arrêt contact',
}

type Field = {
    id: string
    type:
        | 'input'
        | 'checkbox'
        | 'number'
        | 'date'
        | 'file'
        | 'select'
        | 'enum'
        | 'search'
        | 'password'
    value: string | boolean | null
    placeholder?: string
    url?: string
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
    onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface PopUpProps {
    onClose: () => void
    fields: Field[]
    url: string
    onFieldChange?: (id: string, value: string | boolean) => void // New callback function
}

const PopUp: React.FC<PopUpProps> = ({
    onClose,
    fields,
    url,
    onFieldChange,
}) => {
    const [inputs, setInputs] = useState<Field[]>(fields)

    useEffect(() => {
        setInputs(fields)
    }, [fields])

    const handleInputChange = (id: string, value: string | boolean) => {
        // Invoke the function if provided
        const updatedInputs = inputs.map(input =>
            input.id === id ? { ...input, value } : input,
        )
        setInputs(updatedInputs)

        // Invoke the parent callback after updating the state
        if (onFieldChange) {
            onFieldChange(id, value)
        }
    }

    const handleSubmit = async () => {
        const endpoint = url

        const inputsData = inputs.reduce<{
            [key: string]: string | boolean | null
        }>((acc, input) => {
            acc[input.id] = input.value
            return acc
        }, {})

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputsData),
            })

            if (response.ok) {
                const jsonResponse = await response.json()
                console.log('Submission successful', jsonResponse)
                onClose()
            } else {
                console.error('Submission failed', await response.text())
            }
        } catch (error) {
            console.error('Network error:', error)
        }
        onClose()
    }

    return (
        <div className={'popup-container'}>
            <div className={style.page1}>
                <h2 className={style.lg}>Ajouter une nouvelle entrée</h2>
                {inputs.map(input => (
                    <div className={style.rowPop} key={input.id}>
                        <label className={style.label}>
                            {fieldLabels[input.id]}
                        </label>
                        {(() => {
                            switch (input.type) {
                                case 'select':
                                    return (
                                        <SelectComponent
                                            key={input.id}
                                            url={input.url as string}
                                            onChange={input.onChange}
                                        />
                                    )
                                case 'search':
                                    return (
                                        <SearchComponent
                                            key={input.id}
                                            url={input.url as string}
                                            onChange={e =>
                                                handleInputChange(
                                                    input.id,
                                                    e.target.value,
                                                )
                                            }
                                            onInputChange={input.onInputChange}
                                        />
                                    )
                                case 'checkbox':
                                    return (
                                        // Utilisez une classe CSS spécifique pour le style de la checkbox
                                        <input
                                            key={input.id}
                                            type='checkbox'
                                            checked={input.value === true}
                                            className={style.checkboxF} // Appliquez votre classe CSS ici
                                            onChange={e =>
                                                handleInputChange(
                                                    input.id,
                                                    e.target.checked,
                                                )
                                            }
                                        />
                                    )
                                default:
                                    return (
                                        <input
                                            key={input.id}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            className={style.selectF}
                                            value={
                                                input.value === null
                                                    ? ''
                                                    : (input.value as string)
                                            }
                                            onChange={e =>
                                                handleInputChange(
                                                    input.id,
                                                    e.target.value,
                                                )
                                            }
                                            onInput={input.onInputChange}
                                        />
                                    )
                            }
                        })()}
                    </div>
                ))}
                <div className={style.BTNdiv}>
                    <button className={style.BTNsub} onClick={onClose}>
                        Exit
                    </button>

                    <button className={style.BTNsub} onClick={handleSubmit}>
                        Envoyer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PopUp

/*
<PopUp
    onClose={handleClose}
    fields={[
        { id: 'code_Don', type: 'input', value: ''},
        { id: 'code_Entite_donatrice', type: 'input', value: '' },
        { id: 'date_proposition_don', type: 'date', value: '' },
        { id: 'code_contact_Entite_donatrice', type: 'input', value: '' },
        { id: 'code_type_don', type: 'input', value: '' },
    ]}
/>*/
