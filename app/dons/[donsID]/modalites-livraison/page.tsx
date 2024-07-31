'use client'
import React, { useCallback, useEffect, useState } from 'react'
import List from '../../../../components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../styles/components.module.css'
import TypesButtons from '@/components/TypesButtons'
import Image from 'next/image'

export interface ModalitesLivraison {
    numero_livraison: number
    code_Don: number
    code_type_livraison: string
    date_prevue_livraison: Date
    heure_prevue_livraison: string
    adresse_enlevement: string
    civilite_contact_enlevement: string
    nom_contact_enlevement: string
    prenom_contact_enlevement: string
    telephone_contact_enlevement: string
    mail_contact_enlevement: string
    code_Prestataire_transporteur: number
    adresse_livraison: string
    civilite_contact_livraison: string
    nom_contact_livraison: string
    prenom_contact_livraison: string
    telephone_contact_livraison: string
    mail_contact_livraison: string
    nombre_palettes_prevu: string
    nombre_palettes_consignees_prevu: string
    nombre_cartons_prevu: string
    poids_prevu_kg: string
    produits_sur_palettes: string
    temperature_conserv_produits: string
    commentaires: string
    pieces_associees: Blob
}

function ModalitesLivraisonPage({ params }: { params: { donsID: string } }) {
    const [ModalitesLivraisons, setModalitesLivraison] = useState<
        ModalitesLivraison[]
    >([])
    const [typeDonData, setTypeDonData] = useState<{
        code_type_don: string
        code_type_produits: string
    }>()
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)
    const [search, setSearch] = useState<ModalitesLivraison[]>([])

    const [fields, setFields] = useState<
        {
            id: string
            type: FieldType
            value: string | null
            placeholder?: string
            required?: boolean
            disabled?: boolean
            url?: string
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[]
    >([])

    const [codeDon] = useState(params.donsID)
    const [codeTypeLivraison, setCodeTypeLivraison] = useState('')
    const [datePrevueLivraison, setDatePrevueLivraison] = useState(new Date())
    const [heurePrevueLivraison, setHeurePrevueLivraison] = useState('12:00:00')
    const [adresseEnlevement, setAdresseEnlevement] = useState('')
    const [civiliteContactEnlevement, setCiviliteContactEnlevement] =
        useState('')
    const [nomContactEnlevement, setNomContactEnlevement] = useState('')
    const [prenomContactEnlevement, setPrenomContactEnlevement] = useState('')
    const [telephoneContactEnlevement, setTelephoneContactEnlevement] =
        useState('')
    const [mailContactEnlevement, setMailContactEnlevement] = useState('')
    const [codePrestataireTransporteur, setCodePrestataireTransporteur] =
        useState('')
    const [adresseLivraison, setAdresseLivraison] = useState('')
    const [civiliteContactLivraison, setCiviliteContactLivraison] = useState('')
    const [nomContactLivraison, setNomContactLivraison] = useState('')
    const [prenomContactLivraison, setPrenomContactLivraison] = useState('')
    const [telephoneContactLivraison, setTelephoneContactLivraison] =
        useState('')
    const [mailContactLivraison, setMailContactLivraison] = useState('')
    const [nombrePalettesPrevu, setNombrePalettesPrevu] = useState('')
    const [nombrePalettesConsigneesPrevu, setNombrePalettesConsigneesPrevu] =
        useState('')
    const [nombreCartonsPrevu, setNombreCartonsPrevu] = useState('')
    const [poidsPrevuKg, setPoidsPrevuKg] = useState('')
    const [produitsSurPalettes, setProduitsSurPalettes] = useState(false)
    const [temperatureConservProduits, setTemperatureConservProduits] =
        useState('')
    const [commentaires, setCommentaires] = useState('')
    const [piecesAssociees, setPiecesAssociees] = useState('')

    const handleCodeTypeLivraison = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeTypeLivraison(event.target.value)
    }
    const handleDatePrevueLivraison = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDatePrevueLivraison(new Date(event.target.value))
    }
    const handleHeurePrevueLivraison = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (
            event.target.value[event.target.value.length - 1] === ':' ||
            !isNaN(parseInt(event.target.value[event.target.value.length - 1]))
        ) {
            if (parseInt(event.target.value.slice(0, 2)) > 23) {
                event.target.value = '23' + event.target.value.slice(2)
            }
            if (parseInt(event.target.value.slice(3, 5)) > 59) {
                event.target.value =
                    event.target.value.slice(0, 3) +
                    '59' +
                    event.target.value.slice(5)
            }
            if (parseInt(event.target.value.slice(6, 8)) > 59) {
                event.target.value =
                    event.target.value.slice(0, 6) +
                    '59' +
                    event.target.value.slice(8)
            }
            if (
                event.target.value.length === 3 &&
                event.target.value[2] !== ':'
            ) {
                event.target.value =
                    event.target.value.slice(0, 2) + ':' + event.target.value[2]
            }
            if (event.target.value.length === 5) {
                event.target.value = event.target.value + ':00'
            }
            if (event.target.value.length === 7) {
                event.target.value = event.target.value.slice(0, 5)
            }
            setHeurePrevueLivraison(event.target.value)
        } else {
            event.target.value = event.target.value.slice(
                0,
                event.target.value.length - 1,
            )
        }
    }
    const handleAdresseEnlevement = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setAdresseEnlevement(event.target.value)
    }
    const handleCiviliteContactEnlevement = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCiviliteContactEnlevement(event.target.value)
    }
    const handleNomContactEnlevement = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNomContactEnlevement(event.target.value)
    }
    const handlePrenomContactEnlevement = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setPrenomContactEnlevement(event.target.value)
    }
    const handleTelephoneContactEnlevement = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setTelephoneContactEnlevement(event.target.value)
    }
    const handleMailContactEnlevement = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setMailContactEnlevement(event.target.value)
    }
    const handleCodePrestataireTransporteur = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCodePrestataireTransporteur(event.target.value)
    }
    const handleAdresseLivraison = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setAdresseLivraison(event.target.value)
    }
    const handleCiviliteContactLivraison = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCiviliteContactLivraison(event.target.value)
    }
    const handleNomContactLivraison = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNomContactLivraison(event.target.value)
    }
    const handlePrenomContactLivraison = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setPrenomContactLivraison(event.target.value)
    }
    const handleTelephoneContactLivraison = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setTelephoneContactLivraison(event.target.value)
    }
    const handleMailContactLivraison = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setMailContactLivraison(event.target.value)
    }
    const handleNombrePalettesPrevu = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNombrePalettesPrevu(event.target.value)
    }
    const handleNombrePalettesConsigneesPrevu = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNombrePalettesConsigneesPrevu(event.target.value)
    }
    const handleNombreCartonsPrevu = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNombreCartonsPrevu(event.target.value)
    }
    const handlePoidsPrevuKg = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPoidsPrevuKg(event.target.value)
    }

    const handleTemperatureConservProduits = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setTemperatureConservProduits(event.target.value)
    }
    const handleCommentaires = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentaires(event.target.value)
    }
    const handlePiecesAssociees = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setPiecesAssociees(event.target.value)
    }

    const handleProduitsSurPalettes = () => {
        setProduitsSurPalettes(!produitsSurPalettes)
    }

    const handleClose = () => {
        setIsPopUpOpen(false)
        setProduitsSurPalettes(false)
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
            required?: boolean
            disabled?: boolean
            url?: string
            createURL?: string
            maxLength?: number
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[] = [
            {
                id: 'code_Don',
                type: 'input',
                value: codeDon,
                required: true,
                disabled: true,
            },
            {
                id: 'code_type_livraison',
                type: 'select',
                value: codeTypeLivraison,
                url: `../../api/dons/${params.donsID}/modalites-livraison/type-livraison`,
                required: true,
                onChange: handleCodeTypeLivraison,
            },
            {
                id: 'date_prevue_livraison',
                type: 'date',
                value: !isNaN(datePrevueLivraison.getTime())
                    ? datePrevueLivraison.toISOString().split('T')[0]
                    : null,
                onInputChange: handleDatePrevueLivraison,
                required: true,
            },
            {
                id: 'heure_prevue_livraison',
                type: 'input',
                value: heurePrevueLivraison,
                maxLength: 8,
                onInputChange: handleHeurePrevueLivraison,
                placeholder: 'Exemple: 14:00',
            },
            {
                id: 'adresse_enlevement',
                type: 'input',
                placeholder: 'Exemple: 1 rue de la Paix, 75000 Paris',
                value: adresseEnlevement,
                maxLength: 255,
                onInputChange: handleAdresseEnlevement,
            },
            {
                id: 'civilite_contact_enlevement',
                type: 'select',
                value: civiliteContactEnlevement,
                url: '../../api/select/genre',
                onChange: handleCiviliteContactEnlevement,
            },
            {
                id: 'nom_contact_enlevement',
                type: 'input',
                value: nomContactEnlevement,
                placeholder: 'Exemple: Dupont',
                maxLength: 20,
                onInputChange: handleNomContactEnlevement,
            },
            {
                id: 'prenom_contact_enlevement',
                type: 'input',
                value: prenomContactEnlevement,
                placeholder: 'Exemple: Jean',
                maxLength: 20,
                onInputChange: handlePrenomContactEnlevement,
            },
            {
                id: 'telephone_contact_enlevement',
                type: 'number',
                value: telephoneContactEnlevement,
                placeholder: 'Exemple: 0123456789',
                maxLength: 12,
                required: true,
                onInputChange: handleTelephoneContactEnlevement,
            },
            {
                id: 'mail_contact_enlevement',
                type: 'input',
                value: mailContactEnlevement,
                placeholder: 'Exemple: Jean.dupont@gmail.com',
                maxLength: 255,
                required: true,
                onInputChange: handleMailContactEnlevement,
            },
            {
                id: 'adresse_livraison',
                type: 'search',
                value: adresseLivraison,
                url: '../../api/select/sites',
                createURL: '/sites',
                maxLength: 255,
                required: true,
                placeholder: 'Exemple: Siège social',
                onInputChange: handleAdresseLivraison,
            },
            {
                id: 'civilite_contact_livraison',
                type: 'select',
                value: civiliteContactLivraison,
                url: '../../api/select/genre',
                onChange: handleCiviliteContactLivraison,
            },
            {
                id: 'nom_contact_livraison',
                type: 'input',
                value: nomContactLivraison,
                placeholder: 'Exemple: Petit',
                maxLength: 20,
                onInputChange: handleNomContactLivraison,
            },
            {
                id: 'prenom_contact_livraison',
                type: 'input',
                value: prenomContactLivraison,
                placeholder: 'Exemple: Michel',
                maxLength: 20,
                onInputChange: handlePrenomContactLivraison,
            },
            {
                id: 'telephone_contact_livraison',
                type: 'number',
                value: telephoneContactLivraison,
                placeholder: 'Exemple: 0123456789',
                maxLength: 12,
                required: true,
                onInputChange: handleTelephoneContactLivraison,
            },
            {
                id: 'mail_contact_livraison',
                type: 'input',
                value: mailContactLivraison,
                placeholder: 'Exemple: Michel.petit@gmail.com',
                maxLength: 255,
                required: true,
                onInputChange: handleMailContactLivraison,
            },
            {
                id: 'nombre_palettes_prevu',
                type: 'number',
                value: nombrePalettesPrevu,
                placeholder: 'Exemple: 10',
                maxLength: 10,
                onInputChange: handleNombrePalettesPrevu,
            },
            {
                id: 'nombre_palettes_consignees_prevu',
                type: 'number',
                value: nombrePalettesConsigneesPrevu,
                placeholder: 'Exemple: 7',
                maxLength: 10,
                onInputChange: handleNombrePalettesConsigneesPrevu,
            },
            {
                id: 'nombre_cartons_prevu',
                type: 'number',
                value: nombreCartonsPrevu,
                placeholder: 'Exemple: 34',
                maxLength: 10,
                onInputChange: handleNombreCartonsPrevu,
            },
            {
                id: 'poids_prevu_kg',
                type: 'number',
                value: poidsPrevuKg,
                placeholder: 'Exemple: 580',
                onInputChange: handlePoidsPrevuKg,
            }, //pas negatif
            {
                id: 'produits_sur_palettes',
                type: 'checkbox',
                value: produitsSurPalettes ? 'O' : 'N',
                onInputChange: handleProduitsSurPalettes,
            },
            {
                id: 'pieces_associees',
                type: 'file',
                value: piecesAssociees,
                onInputChange: handlePiecesAssociees,
            },
            {
                id: 'commentaires',
                type: 'input',
                value: commentaires,
                placeholder: 'Exemple: Livraison de produits Auchan',
                maxLength: 200,
                onInputChange: handleCommentaires,
            },
        ]

        const FindIndex = (id: string) => {
            return fields.findIndex(field => field.id === id)
        }

        if (fields[FindIndex('poids_prevu_kg')].value === '') {
            fields[FindIndex('poids_prevu_kg')].value = null
        }
        if (fields[FindIndex('nombre_cartons_prevu')].value === '') {
            fields[FindIndex('nombre_cartons_prevu')].value = null
        }
        if (
            fields[FindIndex('nombre_palettes_consignees_prevu')].value === ''
        ) {
            fields[FindIndex('nombre_palettes_consignees_prevu')].value = null
        }
        if (fields[FindIndex('nombre_palettes_prevu')].value === '') {
            fields[FindIndex('nombre_palettes_prevu')].value = null
        }
        if (fields[FindIndex('telephone_contact_livraison')].value !== '') {
            fields[FindIndex('mail_contact_livraison')].required = false
        } else if (fields[FindIndex('mail_contact_livraison')].value !== '') {
            fields[FindIndex('telephone_contact_livraison')].required = false
        }

        if (fields[FindIndex('telephone_contact_enlevement')].value !== '') {
            fields[FindIndex('mail_contact_enlevement')].required = false
        } else if (fields[FindIndex('mail_contact_enlevement')].value !== '') {
            fields[FindIndex('telephone_contact_enlevement')].required = false
        }

        if (
            fields[FindIndex('pieces_associees')].value === undefined ||
            fields[FindIndex('pieces_associees')].value === ''
        ) {
            fields[FindIndex('pieces_associees')].value = null
        }

        if (codeTypeLivraison === 'TRA') {
            fields.splice(2, 0, {
                id: 'code_Prestataire_transporteur',
                type: 'search',
                value: codePrestataireTransporteur,
                url: '../../../api/select/prestataire',
                createURL: '/prestataire',
                placeholder: 'Exemple: Entreprise alpha',
                required: true,
                onInputChange: handleCodePrestataireTransporteur,
            })
        }

        const typeDon = async () => {
            if (typeDonData === undefined) {
                const res = await fetch(
                    `../../../api/select/dons/${params.donsID}/type-don`,
                )
                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }
                const data: {
                    code_type_don: string
                    code_type_produits: string
                } = (await res.json())[0]
                setTypeDonData(data)
            }

            if (
                typeDonData !== undefined &&
                typeDonData.code_type_don === 'MAR' &&
                typeDonData.code_type_produits === 'ALI'
            ) {
                fields.splice(FindIndex('produits_sur_palettes') + 1, 0, {
                    id: 'temperature_conserv_produits',
                    type: 'number',
                    placeholder: 'Exemple: 27',
                    value: temperatureConservProduits,
                    maxLength: 3,
                    onInputChange: handleTemperatureConservProduits,
                })

                if (
                    fields[FindIndex('temperature_conserv_produits')].value ===
                    ''
                ) {
                    fields[FindIndex('temperature_conserv_produits')].value =
                        null
                }
            }
        }
        typeDon()
        return fields
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        params.donsID,
        codeDon,
        codeTypeLivraison,
        datePrevueLivraison,
        heurePrevueLivraison,
        adresseEnlevement,
        civiliteContactEnlevement,
        nomContactEnlevement,
        prenomContactEnlevement,
        telephoneContactEnlevement,
        mailContactEnlevement,
        codePrestataireTransporteur,
        adresseLivraison,
        civiliteContactLivraison,
        nomContactLivraison,
        prenomContactLivraison,
        telephoneContactLivraison,
        mailContactLivraison,
        nombrePalettesPrevu,
        nombrePalettesConsigneesPrevu,
        nombreCartonsPrevu,
        poidsPrevuKg,
        produitsSurPalettes,
        temperatureConservProduits,
        commentaires,
        piecesAssociees,
    ])

    useEffect(() => {
        const fetchModalitesLivraisons = async () => {
            const res = await fetch(
                `../../../api/dons/${params.donsID}/modalites-livraison?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const {
                data,
                total,
            }: { data: ModalitesLivraison[]; total: number } = await res.json()
            setModalitesLivraison(data)
            setTotalItems(total)
        }

        const fetchSearchModalitesLivraisons = async () => {
            if (search.length === 0) {
                const res = await fetch(
                    `../../../api/dons/${params.donsID}/modalites-livraison`,
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const { data }: { data: ModalitesLivraison[] } =
                    await res.json()
                setSearch(data)
            }
        }

        fetchModalitesLivraisons()
        fetchSearchModalitesLivraisons()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, itemsPerPage, params.donsID])

    useEffect(() => {
        setFields(generateFields())
    }, [generateFields])

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
                    <h1 className={style.lg1}>Modalités livraison</h1>
                    <a href='javascript:history.go(-1)' className={style.btnC}>
                        <Image
                            className={style.CR}
                            src='/IMG/return.svg'
                            height={30}
                            width={30}
                            alt='Fermer la fenêtre'
                        />
                    </a>
                </div>

                <List
                    items={ModalitesLivraisons.map(ModalitesLivraison => ({
                        value1: ModalitesLivraison.numero_livraison.toString()
                            ? ModalitesLivraison.numero_livraison.toString()
                            : '/',
                        value2: ModalitesLivraison.code_Don.toString()
                            ? ModalitesLivraison.code_Don.toString()
                            : '/',
                        value3: ModalitesLivraison.date_prevue_livraison
                            .toString()
                            .split('T')[0]
                            ? ModalitesLivraison.date_prevue_livraison
                                  .toString()
                                  .split('T')[0]
                            : '/',
                        value4: ModalitesLivraison.telephone_contact_enlevement.toString()
                            ? ModalitesLivraison.telephone_contact_enlevement.toString()
                            : '/',
                        value5: ModalitesLivraison.mail_contact_enlevement.toString()
                            ? ModalitesLivraison.mail_contact_enlevement.toString()
                            : '/',
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `../../../api/dons/${params.donsID}/modalites-livraison`,
                    }}
                    attribut={{
                        att1: 'Code don',
                        att2: 'Date prévue livraison',
                        att3: "Téléphone du contact de l'enlèvement",
                        att4: "Mail du contact de l'enlèvement",
                    }}
                    searchItems={search.map(ModalitesLivraison => ({
                        value1: ModalitesLivraison.numero_livraison.toString(),
                        value2: ModalitesLivraison.code_Don.toString(),
                        value3: ModalitesLivraison.date_prevue_livraison
                            .toString()
                            .split('T')[0],
                        value4: ModalitesLivraison.telephone_contact_enlevement.toString(),
                        value5: ModalitesLivraison.mail_contact_enlevement.toString(),
                    }))}
                    pageInfos={{
                        page,
                        itemsPerPage,
                        totalItems,
                        setTotal: setTotalItems,
                    }}
                    dataExcel={ModalitesLivraisons}
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
                            url={`../../../api/dons/${params.donsID}/modalites-livraison`}
                            fields={fields}
                        />
                    </div>
                )}
                <TypesButtons
                    items={[
                        { label: 'Types de livraison', url: 'type-livraison' },
                    ]}
                />
            </div>
        </>
    )
}

export default withAuthorization(ModalitesLivraisonPage, [
    'AD',
    'AP',
    'EN',
    'SU',
])
