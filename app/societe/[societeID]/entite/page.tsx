/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useCallback, useEffect, useState } from 'react'
import List from '../../../../components/list'
import { Pagination } from '@/components/pagination'
import withAuthorization from '@/components/withAuthorization'
import PopUp from '@/components/popUp'
import style from '../../../../styles/components.module.css'
import TypesButtons from '@/components/TypesButtons'
import Image from 'next/image'

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
    const [search, setSearch] = useState<Entite[]>([])

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
    //const [logo, setLogo] = useState<Blob>()
    const [siret, setSiret] = useState('')
    const [codeApe, setCodeApe] = useState('')
    const [codeRna, setCodeRna] = useState('')
    const [codeCee, setCodeCee] = useState('')
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
    const [presenceQuai, setPresenceQuai] = useState(false)
    //const [piecesAssociees, setPiecesAssociees] = useState<Blob>()
    const [cerfa, setCerfa] = useState(false)
    const [codeFrequenceCerfa, setCodeFrequenceCerfa] = useState('')
    const [dateArretActivite, setDateArretActivite] = useState<Date>()

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

    /*const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setLogo(event.target.files[0])
        }
    }*/

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

    const handlePresenceQuaiChange = () => {
        setPresenceQuai(!presenceQuai)
    }

    /*const handlePiecesAssocieesChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.files) {
            setPiecesAssociees(event.target.files[0])
        }
    }*/

    const handleCodeFrequenceCerfaChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeFrequenceCerfa(event.target.value)
    }

    const handleDateArretActiviteChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDateArretActivite(new Date(event.target.value))
    }

    const handleClose = () => {
        setIsPopUpOpen(false)
        setPresenceQuai(false)
        setCerfa(false)
    }

    const handleCerfaChange = () => {
        setCerfa(!cerfa)
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
            required?: boolean
            maxLength?: number
            disabled?: boolean
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[] = [
            {
                id: 'code_societe_appartenance',
                type: 'input',
                value: params.societeID,
                required: true,
                disabled: true,
            },
            {
                id: 'raison_sociale',
                type: 'input',
                value: raisonSociale,
                placeholder: 'Exemple: Alpha Corporation',
                maxLength: 30,
                onInputChange: handleRaisonSocialeChange,
                required: true,
            },
            {
                id: 'nom_commercial',
                type: 'input',
                value: nomCommercial,
                maxLength: 30,
                onInputChange: handleNomCommercialChange,
                placeholder: 'Exemple: Alpha Corp',
            },
            {
                id: 'code_type_entite',
                type: 'select',
                required: true,
                value: codeTypeEntite,
                url: `../../api/societe/${params.societeID}/entite/type-entites`,
                onChange: handleCodeTypeEntiteChange,
            },
            {
                id: 'adresse',
                type: 'input',
                value: adresse,
                required: true,
                onInputChange: handleAdresseChange,
                placeholder: 'Exemple: 12 rue de la paix',
            },
            {
                id: 'telephone',
                type: 'number',
                value: telephone,
                maxLength: 12,
                onInputChange: handleTelephoneChange,
                placeholder: 'Exemple: 0123456789',
                required: true,
            }, // tel ou mail obligée
            {
                id: 'mail',
                type: 'input',
                value: mail,
                maxLength: 50,
                onInputChange: handleMailChange,
                required: true,
                placeholder: 'Exemple: Alpha.corp@gmail.com',
            },
            {
                id: 'logo',
                type: 'file',
                value: null,
                //onInputChange: handleLogoChange,
            },
            {
                id: 'Siret',
                type: 'number',
                value: siret,
                maxLength: 14,
                onInputChange: handleSiretChange,
                placeholder: 'Exemple: 15269783246918',
            }, // if number !== 14 = pas de validation
            {
                id: 'code_ape',
                type: 'number',
                value: codeApe,
                maxLength: 5,
                onInputChange: handleCodeApeChange,
                placeholder: 'Exemple: 1234A',
            }, // 4 chiffres et 1 lettre
            {
                id: 'code_rna',
                type: 'number',
                value: codeRna,
                maxLength: 10,
                onInputChange: handleCodeRnaChange,
                placeholder: 'Exemple: W123456789',
            }, // W + 9 chiffres
            {
                id: 'code_cee',
                type: 'number',
                value: codeCee,
                maxLength: 13,
                onInputChange: handleCodeCeeChange,
                placeholder: 'Exemple: 123456789',
            },
            {
                id: 'site_internet',
                type: 'input',
                value: siteInternet,
                maxLength: 255,
                onInputChange: handleSiteInternetChange,
                placeholder: 'Exemple: http://www.alpha.com/',
            },
            {
                id: 'commentaires',
                type: 'input',
                value: commentaires,
                maxLength: 200,
                onInputChange: handleCommentairesChange,
                placeholder: 'Exemple: Societe de service informatique',
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
                maxLength: 200,
                onInputChange: handleCommentairesLogistiqueChange,
                placeholder: 'Exemple: Societe de service informatique',
            },
            {
                id: 'presence_quai',
                type: 'checkbox',
                value: presenceQuai ? 'O' : 'N',
                onInputChange: handlePresenceQuaiChange,
            }, // checkbox + dans la table
            {
                id: 'pieces_associees',
                type: 'file',
                value: null,
                //onInputChange: handlePiecesAssocieesChange,
            },
            {
                id: 'cerfa',
                type: 'checkbox',
                value: cerfa ? 'O' : 'N',
                onInputChange: handleCerfaChange,
            }, // checkbox + dans la table
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
                value: dateArretActivite?.toISOString().split('T')[0] || '',
                onInputChange: handleDateArretActiviteChange,
            },
        ]

        const FindIndex = (id: string) => {
            return fields.findIndex(field => field.id === id)
        }

        if (dateArretActivite === undefined) {
            fields[FindIndex('date_arret_activite')].value = null
        }

        if (siret === '') {
            fields[FindIndex('Siret')].value = null
        }

        if (codeApe === '') {
            fields[FindIndex('code_ape')].value = null
        }

        if (codeRna === '') {
            fields[FindIndex('code_rna')].value = null
        }

        if (codeCee === '') {
            fields[FindIndex('code_cee')].value = null
        }

        if (codeTypeDon === '') {
            fields[FindIndex('code_type_don')].value = null
        }

        if (codeTypeCompetence === '' && codeTypeDon === 'SIP') {
            fields[FindIndex('code_type_competence')].value = null
        }

        if (codeTypeProduit === '' && codeTypeDon === 'MAR') {
            fields[FindIndex('code_type_produit')].value = null
        }

        if (codeFrequenceCerfa === '') {
            fields[FindIndex('code_frequence_cerfa')].value = null
        }

        if (codeTypeDon === 'MAR') {
            fields.splice(15, 0, {
                id: 'code_type_produit',
                type: 'select',
                value: codeTypeProduit,
                url: `../../api/dons/type-produits`,
                onChange: handleCodeTypeProduitChange,
            })
        } else if (codeTypeDon === 'SIP') {
            fields.splice(15, 0, {
                id: 'code_type_competence',
                type: 'select',
                value: codeTypeCompetence,
                url: `../../api/dons/type-competences`,
                onChange: handleCodeTypeCompetenceChange,
            })
        }

        if (fields[5].value !== '') {
            fields[6].required = false
        } else if (fields[6].value !== '') {
            fields[5].required = false
        }
        return fields
    }, [
        raisonSociale,
        nomCommercial,
        codeTypeEntite,
        adresse,
        telephone,
        mail,
        siret,
        codeApe,
        codeRna,
        codeCee,
        siteInternet,
        commentaires,
        codeTypeDon,
        commentairesLogistique,
        presenceQuai,
        cerfa,
        codeFrequenceCerfa,
        dateArretActivite,
        codeTypeProduit,
        codeTypeCompetence,
        params.societeID,
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

        const fetchSearchEntite = async () => {
            if (search.length === 0) {
                const res = await fetch(
                    `http://localhost:3000/api/societe/${params.societeID}/entite?limit=10000`,
                )
                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const { data }: { data: Entite[] } = await res.json()
                setSearch(data)
            }
        }

        fetchEntite()
        fetchSearchEntite()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <div className={style.croixID}>
                    <h1 className={style.lg1}>Entité</h1>
                    <a href='javascript:history.go(-1)' className={style.btnC}>
                        <Image
                            className={style.CR}
                            src='/IMG/Return.png'
                            height={30}
                            width={30}
                            alt='Fermer la fenêtre'
                        />
                    </a>
                </div>

                <List
                    items={Entites.map(entite => ({
                        value1: entite.code_entite.toString(),
                        value2: entite.raison_sociale,
                        value3:
                            entite.telephone === '' ? '/' : entite.telephone,
                        value4: entite.mail === '' ? '/' : entite.mail,
                        value5: entite.adresse,
                        value6:
                            entite.date_arret_activite == null
                                ? '/'
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
                    attribut={{
                        att1: 'Raison Sociale',
                        att2: 'Téléphone',
                        att3: 'Mail',
                        att4: 'Adresse',
                        att5: "Date d'arrêt d'activité",
                    }}
                    searchItems={search.map(entite => ({
                        value1: entite.code_entite.toString(),
                        value2: entite.raison_sociale,
                        value3:
                            entite.telephone === '' ? '/' : entite.telephone,
                        value4: entite.mail === '' ? '/' : entite.mail,
                        value5: entite.adresse,
                        value6:
                            entite.date_arret_activite == null
                                ? '/'
                                : entite.date_arret_activite
                                      .toString()
                                      .split('T')[0],
                    }))}
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
                <TypesButtons
                    items={[
                        {
                            label: "Types d'entité",
                            url: 'type-entites',
                        },
                        {
                            label: 'Types de fréquence cerfa',
                            url: 'type-frequences-cerfa',
                        },
                    ]}
                />
            </div>
        </>
    )
}

export default withAuthorization(EntitesPage, ['AD', 'PR'])
