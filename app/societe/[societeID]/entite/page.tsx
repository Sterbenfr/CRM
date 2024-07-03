'use client'
import { useCallback, useEffect, useState } from 'react'
import List from '../../../../components/list'
import { Pagination } from '@/components/pagination'
import withAuthorization from '@/components/withAuthorization'
import PopUp from '@/components/popUp'
import style from '../../../../styles/components.module.css'

export interface Entite {
    code_entite: number
    raison_sociale: string
    nom_commercial: string
    logo: Blob
    siret: string
    code_ape: string
    code_rna: string
    code_cee: string
    code_societe_appartenance: number
    adresse: string
    telephone: string
    mail: string
    site_internet: string
    commentaires: string
    code_type_entite: string
    code_type_don: string
    code_type_produit: string
    code_type_competence: string
    commentaires_logistique: string
    presence_quai: string
    pieces_associees: Blob
    cerfa: string
    code_frequence_cerfa: string
    date_arret_activite: string
}

function EntitesPage({ params }: { params: { societeID: string } }) {
    const [Entites, setEntite] = useState<Entite[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const [fields, setFields] = useState<
        {
            id: string
            type: FieldType
            value: string | null
            placeholder?: string
            url?: string
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[]
    >([])

    const [raisonSociale, setRaisonSociale] = useState('')
    const [nomCommercial, setNomCommercial] = useState('')
    const [logo, setLogo] = useState<Blob>()
    const [siret, setSiret] = useState('')
    const [codeApe, setCodeApe] = useState('')
    const [codeRna, setCodeRna] = useState('')
    const [codeCee, setCodeCee] = useState('')
    const [codeSocieteAppartenance, setCodeSocieteAppartenance] = useState('')
    const [adresse, setAdresse] = useState('')
    const [telephone, setTelephone] = useState('')
    const [mail, setMail] = useState('')
    const [siteInternet, setSiteInternet] = useState('')
    const [commentaires, setCommentaires] = useState('')
    const [codeTypeEntite, setCodeTypeEntite] = useState('')
    const [codeTypeDon, setCodeTypeDon] = useState('')
    const [codeTypeProduit, setCodeTypeProduit] = useState('')
    const [codeTypeCompetence, setCodeTypeCompetence] = useState('')
    const [commentairesLogistique, setCommentairesLogistique] = useState('')
    const [presenceQuai, setPresenceQuai] = useState('')
    const [piecesAssociees, setPiecesAssociees] = useState<Blob>()
    const [mailContactPrestataire, setMailContactPrestataire] = useState('')
    const [cerfa, setCerfa] = useState('')
    const [codeFrequenceCerfa, setCodeFrequenceCerfa] = useState('')
    const [dateArretActivite, setDateArretActivite] = useState('')

    const handleRaisonSocialeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRaisonSociale(event.target.value)
    }

    const handleNomCommercialChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNomCommercial(event.target.value)
    }

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setLogo(event.target.files[0])
        }
    }

    const handleSiretChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSiret(event.target.value)
    }

    const handleCodeApeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCodeApe(event.target.value)
    }

    const handleCodeRnaChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCodeRna(event.target.value)
    }

    const handleCodeCeeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCodeCee(event.target.value)
    }

    const handleCodeSocieteAppartenanceChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCodeSocieteAppartenance(event.target.value)
    }

    const handleAdresseChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setAdresse(event.target.value)
    }

    const handleTelephoneChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setTelephone(event.target.value)
    }

    const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMail(event.target.value)
    }

    const handleSiteInternetChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSiteInternet(event.target.value)
    }

    const handleCommentairesChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCommentaires(event.target.value)
    }

    const handleCodeTypeEntiteChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeTypeEntite(event.target.value)
    }

    const handleCodeTypeDonChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeTypeDon(event.target.value)
    }

    const handleCodeTypeProduitChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeTypeProduit(event.target.value)
    }

    const handleCodeTypeCompetenceChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeTypeCompetence(event.target.value)
    }

    const handleCommentairesLogistiqueChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCommentairesLogistique(event.target.value)
    }

    const handlePresenceQuaiChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setPresenceQuai(event.target.value)
    }

    const handlePiecesAssocieesChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.files) {
            setPiecesAssociees(event.target.files[0])
        }
    }

    const handleMailContactPrestataireChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setMailContactPrestataire(event.target.value)
    }

    const handleCerfaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCerfa(event.target.value)
    }

    const handleCodeFrequenceCerfaChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeFrequenceCerfa(event.target.value)
    }

    const handleDateArretActiviteChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDateArretActivite(event.target.value)
    }

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    type FieldType =
        | 'number'
        | 'search'
        | 'date'
        | 'select'
        | 'input'
        | 'file'
        | 'checkbox'
        | 'enum'

    const generateFields = useCallback(() => {
        const fields: {
            id: string
            type: FieldType
            value: string | null
            placeholder?: string
            url?: string
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[] = [
            {
                id: 'raison_sociale',
                type: 'input',
                value: raisonSociale,
                onInputChange: handleRaisonSocialeChange,
            },
            {
                id: 'nom_commercial',
                type: 'input',
                value: nomCommercial,
                onInputChange: handleNomCommercialChange,
            },
            {
                id: 'logo',
                type: 'file',
                value: null,
                onInputChange: handleLogoChange,
            },
            {
                id: 'Siret',
                type: 'number',
                value: siret,
                onInputChange: handleSiretChange,
            },
            {
                id: 'code_ape',
                type: 'input',
                value: codeApe,
                onInputChange: handleCodeApeChange,
            },
            {
                id: 'code_rna',
                type: 'input',
                value: codeRna,
                onInputChange: handleCodeRnaChange,
            },
            {
                id: 'code_cee',
                type: 'input',
                value: codeCee,
                onInputChange: handleCodeCeeChange,
            },
            {
                id: 'code_societe_appartenance',
                type: 'number',
                value: codeSocieteAppartenance.toString(),
                onInputChange: handleCodeSocieteAppartenanceChange,
            },
            {
                id: 'adresse',
                type: 'input',
                value: adresse,
                onInputChange: handleAdresseChange,
            },
            {
                id: 'telephone',
                type: 'input',
                value: telephone,
                onInputChange: handleTelephoneChange,
            },
            {
                id: 'mail',
                type: 'input',
                value: mail,
                onInputChange: handleMailChange,
            },
            {
                id: 'site_internet',
                type: 'input',
                value: siteInternet,
                onInputChange: handleSiteInternetChange,
            },
            {
                id: 'commentaires',
                type: 'input',
                value: commentaires,
                onInputChange: handleCommentairesChange,
            },
            {
                id: 'code_type_entite',
                type: 'select',
                value: codeTypeEntite,
                url: `../../api/societe/${params.societeID}/entite/type-entites`,
                onChange: handleCodeTypeEntiteChange,
            },
            {
                id: 'code_type_don',
                type: 'select',
                value: codeTypeDon,
                url: `../../api/dons/type-don`,
                onChange: handleCodeTypeDonChange,
            },
            {
                id: 'commentaires_logistique',
                type: 'input',
                value: commentairesLogistique,
                onInputChange: handleCommentairesLogistiqueChange,
            },
            {
                id: 'presence_quai',
                type: 'input',
                value: presenceQuai,
                onInputChange: handlePresenceQuaiChange,
            },
            {
                id: 'pieces_associees',
                type: 'file',
                value: null,
                onInputChange: handlePiecesAssocieesChange,
            },
            {
                id: 'mail_contact_prestataire',
                type: 'input',
                value: mailContactPrestataire,
                onInputChange: handleMailContactPrestataireChange,
            },
            {
                id: 'cerfa',
                type: 'input',
                value: cerfa,
                onInputChange: handleCerfaChange,
            },
            {
                id: 'code_frequence_cerfa',
                type: 'select',
                value: codeFrequenceCerfa,
                url: `../../api/societe/${params.societeID}/entite/type-frequences-cerfa`,
                onChange: handleCodeFrequenceCerfaChange,
            },
            {
                id: 'date_arret_activite',
                type: 'date',
                value: dateArretActivite,
                onInputChange: handleDateArretActiviteChange,
            },
        ]
        if (codeTypeDon === 'MAR') {
            fields.push({
                id: 'code_type_produit',
                type: 'select',
                value: codeTypeProduit,
                url: `../../api/dons/type-produits`,
                onChange: handleCodeTypeProduitChange,
            })
        } else if (codeTypeDon === 'SIP') {
            fields.push({
                id: 'code_type_competence',
                type: 'select',
                value: codeTypeCompetence,
                url: `../../api/dons/type-competences`,
                onChange: handleCodeTypeCompetenceChange,
            })
        }
        return fields
    }, [
        params,
        raisonSociale,
        nomCommercial,
        siret,
        codeApe,
        codeRna,
        codeCee,
        codeSocieteAppartenance,
        adresse,
        telephone,
        mail,
        siteInternet,
        commentaires,
        codeTypeEntite,
        codeTypeDon,
        codeTypeProduit,
        codeTypeCompetence,
        commentairesLogistique,
        presenceQuai,
        mailContactPrestataire,
        cerfa,
        codeFrequenceCerfa,
        dateArretActivite,
    ])

    useEffect(() => {
        const fetchEntite = async () => {
            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}/entite?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Entite[]; total: number } =
                await res.json()
            setEntite(data)
            setTotalItems(total) // set the total items
            setFields(generateFields())
        }

        fetchEntite()
    }, [params.societeID, page, itemsPerPage, generateFields])

    // add a function to handle page changes
    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage)
        setPage(1) // reset page to 1 when items per page changes
    }

    return (
        <>
            <div className={style.page}>
                <h1 className={style.lg}>Entité</h1>
                <List
                    items={Entites.map(entite => ({
                        value1: entite.code_entite.toString(),
                        value2: entite.raison_sociale,
                        value3: entite.telephone,
                        value4: entite.mail,
                        value5: entite.adresse,
                        value6:
                            entite.date_arret_activite == null
                                ? ''
                                : entite.date_arret_activite
                                      .toString()
                                      .split('T')[0],
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `http://localhost:3000/api/societe/${params.societeID}/entite`,
                    }}
                />
                <Pagination
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange} // pass the new prop here
                    totalItems={totalItems} // use the total items from the state
                    itemsPerPage={itemsPerPage}
                    currentPage={page}
                />
                {''}
                {isPopUpOpen && (
                    <div className={style.PopUp}>
                        <PopUp
                            onClose={handleClose}
                            url={`http://localhost:3000/api/societe/${params.societeID}/entite`}
                            fields={fields}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default withAuthorization(EntitesPage, ['AD', 'PR'])
