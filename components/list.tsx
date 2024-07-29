import React, { useEffect, useState } from 'react'
import Line from './line'
import FunctionBlock from './functionBlock'
import style from '../styles/components.module.css'
import Excel from './Excel'
import ErrorPopUp from './ErrorPopUp'
import ConfirmPopUp from './ConfirmPopUp'

interface ListProps {
    value1?: string
    value2?: string
    value3?: string
    value4?: string
    value5?: string
    value6?: string
    value7?: string
}

interface Attribut {
    att1?: string
    att2?: string
    att3?: string
    att4?: string
    att5?: string
}

interface FunctionProps {
    fonc1?: React.MouseEventHandler<HTMLButtonElement>
    url?: string
}

interface PageInfo {
    page: number
    itemsPerPage: number
    totalItems: number
    setTotal: (total: number) => void
}

const List: React.FC<{
    items: ListProps[]
    functions: FunctionProps
    attribut?: Attribut
    searchItems?: ListProps[]
    pageInfos?: PageInfo
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataExcel?: any[]
}> = ({ items, functions, attribut, searchItems, pageInfos, dataExcel }) => {
    const [selectedItems, setSelectedItems] = useState<ListProps[]>()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [lineCheckbox, setLineCheckbox] = useState<any[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isTimeoutReached, setIsTimeoutReached] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handleLineCheckboxChange = (param: string) => {
        const value = !isNaN(parseInt(param)) ? parseInt(param) : param
        if (!lineCheckbox.includes(value)) {
            setLineCheckbox([...lineCheckbox, value])
        } else {
            setLineCheckbox(lineCheckbox.filter(item => item !== value))
        }
    }

    const handleConfirm = () => {
        setShowConfirm(true)
    }

    const confirmDelete = () => {
        if (!functions.url?.includes('type')) {
            Promise.all(
                lineCheckbox.map(item =>
                    fetch(`${functions.url}/${item}`, {
                        method: 'DELETE',
                    }),
                ),
            ).then(() => {
                setTimeout(() => {
                    window.location.reload()
                }, 100)
            })
        } else {
            fetch(functions.url, {
                method: 'DELETE',
                body: JSON.stringify(lineCheckbox),
            })
                .then(res => res.json())
                .then(err => {
                    if (
                        err.error
                            .toString()
                            .includes('foreign key constraint fails')
                    ) {
                        setErrorMessage(
                            'Impossible de supprimer un/des élément(s) sélectionné(s)',
                        )
                    } else {
                        setTimeout(() => {
                            window.location.reload()
                        }, 400)
                    }
                })
        }
    }

    const deleteFunction = () => {
        handleConfirm()
    }

    const searchFunction = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            value: string
        }
        const search = target.value
        setSearchValue(search)
        if (searchItems && search.length >= 3) {
            const searchedItems = searchItems.filter(item => {
                return (
                    item.value1?.toLowerCase().includes(search.toLowerCase()) ||
                    item.value2?.toLowerCase().includes(search.toLowerCase()) ||
                    item.value3?.toLowerCase().includes(search.toLowerCase()) ||
                    item.value4?.toLowerCase().includes(search.toLowerCase()) ||
                    item.value5?.toLowerCase().includes(search.toLowerCase()) ||
                    item.value6?.toLowerCase().includes(search.toLowerCase()) ||
                    item.value7?.toLowerCase().includes(search.toLowerCase())
                )
            })
            setSelectedItems(searchedItems)
            if (pageInfos) pageInfos.setTotal(searchedItems.length)
        } else {
            if (pageInfos && searchItems) pageInfos.setTotal(searchItems.length)
        }
    }

    const exportToExcel = () => {
        const dataToExport = dataExcel
            ?.filter(item => {
                if (
                    lineCheckbox.includes(
                        parseInt(item[Object.keys(item)[0]] as string),
                    )
                ) {
                    return item
                }
                if (lineCheckbox.length === 0) {
                    return item
                }
            })
            ?.map(item => {
                const keyMapping: { [key: string]: string } = {
                    //Dons
                    code_Entite_donatrice: 'Entité donatrice',
                    titre_don: 'Titre du don',
                    date_proposition_don: 'Date de proposition du don',
                    code_contact_Entite_donatrice:
                        "Contact de l'entité donatrice",
                    code_type_don: 'Type de dons',
                    code_type_competences: 'Type de compétences',
                    code_type_produits: 'Type de produits',
                    code_mode_conservation_produits:
                        'Mode de conservation des produits',
                    date_debut_mise_disposition:
                        'Date de début de mise à disposition',
                    date_fin_mise_disposition:
                        'Date de fin de mise à disposition',
                    commentaires: 'Commentaires',
                    pieces_associees: 'Pièces associées',
                    code_Utilisateur_saisie_don:
                        'Utilisateur de la saisie du don',
                    statut_acceptation_don: 'Statut du don',
                    date_acceptation_refus_don:
                        "Date d'acceptation ou de refus du don",
                    code_Utilisateur_accepte_refuse_don: 'Validateur du don',
                    code_site_beneficiaire_don: 'Site bénéficiaire du don',
                    indicateur_remerciement: 'Indicateur du remerciement',
                    date_remerciement: 'Date de remerciement du don',
                    nom_destinataire_cerfa: 'Nom du destinataire cerfa',
                    adresse_destinataire_cerfa: 'Adresse du destinataire cerfa',
                    adresse_mail_destinataire_cerfa:
                        'Adresse mail du destinataire cerfa',
                    telephone_destinataire_cerfa:
                        'Téléphone du destinataire cerfa',
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
                    civilite_contact_enlevement:
                        "Civilité du contact d'enlèvement",
                    nom_contact_enlevement: "Nom du contact d'enlèvement",
                    prenom_contact_enlevement: "Prénom du contact d'enlèvement",
                    telephone_contact_enlevement:
                        "Téléphone du contact d'enlèvement",
                    mail_contact_enlevement: "Mail du contact d'enlèvement",
                    code_Prestataire_transporteur: 'Prestataire transporteur',
                    adresse_livraison: 'Adresse de livraison',
                    civilite_contact_livraison:
                        'Civilité du contact de livraison',
                    nom_contact_livraison: 'Nom du contact de livraison',
                    prenom_contact_livraison: 'Prénom du contact de livraison',
                    telephone_contact_livraison:
                        'Téléphone du contact de livraison',
                    mail_contact_livraison: 'Mail du contact de livraison',
                    nombre_palettes_prevu: 'Nombre de palettes prévues',
                    nombre_palettes_consignees_prevu:
                        'Nombre de palettes consignées prévues',
                    nombre_cartons_prevu: 'Nombre de cartons prévus',
                    poids_prevu_kg: 'Poids prévu en kg',
                    produits_sur_palettes: 'Produits sur palettes',
                    temperature_conserv_produits:
                        'Température de conservation des produits',
                    //Reception
                    numero_reception: 'Numéro de réception',
                    numero_livraion: 'Numéro de livraison',
                    date_reception: 'Date de réception',
                    heure_reception: 'Heure de réception',
                    nombre_palettes_recues: 'Nombre de palettes reçues',
                    nombre_palettes_consignees_recues:
                        'Nombre de palettes consignées reçues',
                    nombre_palettes_consignees_rendues:
                        'Nombre de palettes consignées rendues',
                    nombre_cartons_recus: 'Nombre de cartons reçus',
                    poids_recu_kg: 'Poids reçu en kg',
                    //Prestataires
                    code_Prestataire: 'Prestataire',
                    code_type_de_Prestataire: 'Type de prestataire',
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
                    code_Utilisateur_Prospecteur: 'Utilisateur prospecteur',
                    code_Entite_Prospectee: 'Entité prospectée',
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
                    password: 'Mot de passe',
                    //Societe
                    code_Societe: 'Société',
                    Logo: 'Logo',
                    site_Web: 'Site Web',
                    code_type_activite_Societe: "Type d'activité de la société",
                    code_Groupe_appartenance: 'Appartenance du groupe',
                    date_arret_activite_Societe:
                        "Date d'arrêt d'activité de la société",
                    //SuiviSociete
                    code_type_de_Site: 'Type de site',
                    code_site_suivi: 'Site assurant suivi',
                    code_utilisateur_suivant: 'Utilisateur suivant',
                    //Groupe
                    code_groupe: 'Groupe',
                    nom_du_Groupe: 'Nom du groupe',
                    date_arret_activite_du_Groupe:
                        "Date d'arrêt d'activité du groupe",
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
                    presence_quai: "Présence d'un quai",
                    code_frequence_cerfa: 'Fréquence de cerfa',
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
                    //type
                    code: 'Code',
                    libelle: 'Libellé',
                }

                const transformedItem: { [key: string]: unknown } = {}
                for (const key in item) {
                    if (keyMapping[key]) {
                        transformedItem[keyMapping[key]] = item[key]
                    } else {
                        transformedItem[key] = item[key]
                    }
                }
                return transformedItem
            })

        let TableName = 'Unknown'

        if (dataExcel?.find(item => Object.keys(item)[0] === 'code_Don')) {
            TableName = 'Dons'
        } else if (
            dataExcel?.find(item => Object.keys(item)[0] === 'code_utilisateur')
        ) {
            TableName = 'Utilisateurs'
        } else if (
            dataExcel?.find(item => Object.keys(item)[0] === 'code_site')
        ) {
            TableName = 'Sites'
        } else if (
            dataExcel?.find(item => Object.keys(item)[0] === 'numero_reception')
        ) {
            TableName = 'Réceptions'
        } else if (
            dataExcel?.find(item => Object.keys(item)[0] === 'code_Prestataire')
        ) {
            TableName = 'Préstataires'
        } else if (
            dataExcel?.find(item => Object.keys(item)[0] === 'numero_livraison')
        ) {
            TableName = 'Modalités de livraisons'
        } else if (
            dataExcel?.find(item => Object.keys(item)[0] === 'code_interaction')
        ) {
            TableName = 'Interactions'
        } else if (
            dataExcel?.find(item => Object.keys(item)[0] === 'code_groupe')
        ) {
            TableName = 'Groupes'
        } else if (
            dataExcel?.find(item => Object.keys(item)[0] === 'code_Societe')
        ) {
            TableName = 'Entpreprises'
        } else if (
            dataExcel?.find(item => Object.keys(item)[0] === 'code_entite')
        ) {
            TableName = 'Entités'
        } else if (
            dataExcel?.find(item => Object.keys(item)[1] === 'code_contact')
        ) {
            TableName = 'Contacts'
        } else {
            TableName = 'Excel'
        }

        if (dataToExport) {
            Excel({
                data: dataToExport,
                fileName: TableName,
            })
        }
    }

    useEffect(() => {
        if (searchValue.length < 3) {
            setSelectedItems(undefined)
        }
        if (items.length === 0) {
            const timer = setTimeout(() => {
                setIsTimeoutReached(true)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [searchValue, items])

    const attributeCount = attribut
        ? Object.keys(attribut).filter(
              key => attribut[key as keyof Attribut] !== undefined,
          ).length
        : 0
    let padding = ''
    switch (attributeCount) {
        case 2:
            padding = style.padding0
            break
        case 3:
            padding = style.padding1
            break
        case 4:
            padding = style.padding2
            break
        case 5:
            padding = style.padding3
            break
    }

    return (
        <>
            {errorMessage && <ErrorPopUp err={errorMessage} />}
            {showConfirm && (
                <ConfirmPopUp
                    message='êtes-vous sûr de vouloir supprimer les éléments séléctionnés?'
                    onConfirm={confirmDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
            <FunctionBlock
                fonc1={functions.fonc1}
                fonc2={deleteFunction}
                fonc3={searchFunction}
                fonc4={exportToExcel}
            />
            <div className={`${style.colName} ${padding}`}>
                <div className={style.lineContainer}>
                    {attribut?.att1 ? (
                        <div>
                            <h2 className={style.nameR}>{attribut?.att1}</h2>
                        </div>
                    ) : (
                        ''
                    )}
                    {attribut?.att2 ? (
                        <div>
                            <h2 className={style.nameR}>{attribut?.att2}</h2>
                        </div>
                    ) : (
                        ''
                    )}
                    {attribut?.att3 ? (
                        <div>
                            <h2 className={style.nameR}>{attribut?.att3}</h2>
                        </div>
                    ) : (
                        ''
                    )}
                    {attribut?.att4 ? (
                        <div>
                            <h2 className={style.nameR}>{attribut?.att4}</h2>
                        </div>
                    ) : (
                        ''
                    )}
                    {attribut?.att5 ? (
                        <div>
                            <h2 className={style.nameR}>{attribut?.att5}</h2>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <div className={style.list_line}>
                {items.length !== 0 ? (
                    pageInfos && selectedItems ? (
                        selectedItems.length !== 0 ? (
                            selectedItems
                                .slice(
                                    (pageInfos.page - 1) *
                                        pageInfos.itemsPerPage,
                                    pageInfos.page * pageInfos.itemsPerPage <
                                        pageInfos.totalItems
                                        ? pageInfos.page *
                                              pageInfos.itemsPerPage
                                        : pageInfos.totalItems,
                                )
                                .map(item => (
                                    // Wrap Line component with a div and add onClick event
                                    <div key={item.value1}>
                                        <Line
                                            deleteFunction={
                                                handleLineCheckboxChange
                                            }
                                            param1={
                                                item.value1 == null
                                                    ? ''
                                                    : item.value1
                                            }
                                            param2={
                                                item.value2 == null
                                                    ? ''
                                                    : item.value2
                                            }
                                            param3={
                                                item.value3 == null
                                                    ? ''
                                                    : item.value3
                                            }
                                            param4={
                                                item.value4 == null
                                                    ? ''
                                                    : item.value4
                                            }
                                            param5={
                                                item.value5 == null
                                                    ? ''
                                                    : item.value5
                                            }
                                            param6={
                                                item.value6 == null
                                                    ? ''
                                                    : item.value6
                                            }
                                            paramColor={
                                                item.value7 == null
                                                    ? ''
                                                    : item.value7
                                            }
                                        />
                                    </div>
                                ))
                        ) : (
                            <div>
                                {isTimeoutReached ? (
                                    <p className={style.anyData}>
                                        Pas de données
                                    </p>
                                ) : null}
                            </div>
                        )
                    ) : (
                        items.map(item => (
                            // Wrap Line component with a div and add onClick event
                            <div key={item.value1}>
                                <Line
                                    deleteFunction={handleLineCheckboxChange}
                                    param1={
                                        item.value1 == null ? '' : item.value1
                                    }
                                    param2={
                                        item.value2 == null ? '' : item.value2
                                    }
                                    param3={
                                        item.value3 == null ? '' : item.value3
                                    }
                                    param4={
                                        item.value4 == null ? '' : item.value4
                                    }
                                    param5={
                                        item.value5 == null ? '' : item.value5
                                    }
                                    param6={
                                        item.value6 == null ? '' : item.value6
                                    }
                                    paramColor={
                                        item.value7 == null ? '' : item.value7
                                    }
                                />
                            </div>
                        ))
                    )
                ) : (
                    <div>
                        {isTimeoutReached ? (
                            <p className={style.anyData}>Pas de données</p>
                        ) : null}
                    </div>
                )}
            </div>
        </>
    )
}

export default List
