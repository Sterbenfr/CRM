'use client'
import { useEffect, useState } from 'react'
import List from '../../components/list'
import { Pagination } from '@/components/pagination'
import withAuthorization from '@/components/withAuthorization'
import PopUp from '@/components/popUp'
import style from '../../styles/components.module.css'
import { useCallback } from 'react'
import TypesButtons from '@/components/TypesButtons'

export interface Prestataire {
    code_Prestataire: number
    code_type_de_Prestataire: string
    raison_sociale: string
    nom_commercial: string
    Siren: string
    Siret: string
    telephone: string
    mail: string
    adresse: string
    civilite_contact_prestataire: string
    nom_contact_prestataire: string
    prenom_contact_prestataire: string
    telephone_contact_prestataire: string
    mail_contact_prestataire: string
    commentaires: string
    date_arret_activite_du_prestataire: Date
}

function PrestatairesPage() {
    const [Prestataires, setPrestataires] = useState<Prestataire[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [search, setSearch] = useState<Prestataire[]>([])

    const [codeTypeDePrestataire, setCodeTypeDePrestataire] = useState('')
    const [raisonSociale, setRaisonSociale] = useState('')
    const [nomCommercial, setNomCommercial] = useState('')
    const [siren, setSiren] = useState('')
    const [siret, setSiret] = useState('')
    const [telephone, setTelephone] = useState('')
    const [mail, setMail] = useState('')
    const [adresse, setAdresse] = useState('')
    const [civiliteContactPrestataire, setCiviliteContactPrestataire] =
        useState('')
    const [nomContactPrestataire, setNomContactPrestataire] = useState('')
    const [prenomContactPrestataire, setPrenomContactPrestataire] = useState('')
    const [telephoneContactPrestataire, setTelephoneContactPrestataire] =
        useState('')
    const [mailContactPrestataire, setMailContactPrestataire] = useState('')
    const [commentaires, setCommentaires] = useState('')
    const [dateArretActiviteDuPrestataire, setDateArretActiviteDuPrestataire] =
        useState<Date>()

    const handleCodeTypeDePrestataireChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeTypeDePrestataire(event.target.value)
    }

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

    const handleSirenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSiren(event.target.value)
    }

    const handleSiretChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSiret(event.target.value)
    }

    const handleTelephoneChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setTelephone(event.target.value)
    }

    const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMail(event.target.value)
    }

    const handleAdresseChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setAdresse(event.target.value)
    }

    const handleCiviliteContactPrestataireChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCiviliteContactPrestataire(event.target.value)
    }

    const handleNomContactPrestataireChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNomContactPrestataire(event.target.value)
    }

    const handlePrenomContactPrestataireChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setPrenomContactPrestataire(event.target.value)
    }

    const handleTelephoneContactPrestataireChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setTelephoneContactPrestataire(event.target.value)
    }

    const handleMailContactPrestataireChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setMailContactPrestataire(event.target.value)
    }

    const handleCommentairesChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCommentaires(event.target.value)
    }

    const handleDateArretActiviteDuPrestataireChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDateArretActiviteDuPrestataire(new Date(event.target.value))
    }

    const [fields, setFields] = useState<
        {
            id: string
            type: FieldType
            value: string | null
            placeholder?: string
            url?: string
            createURL?: string
            required?: boolean
            maxlength?: number
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[]
    >([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

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
            createURL?: string
            required?: boolean
            maxLength?: number
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[] = [
            {
                id: 'raison_sociale',
                type: 'input',
                value: raisonSociale,
                required: true,
                placeholder: 'Exemple: Entreprise Alpha',
                maxLength: 30,
                onInputChange: handleRaisonSocialeChange,
            },
            {
                id: 'nom_commercial',
                type: 'input',
                value: nomCommercial,
                placeholder: 'Exemple: Alpha Corp',
                maxLength: 30,
                onInputChange: handleNomCommercialChange,
            },
            {
                id: 'code_type_de_Prestataire',
                type: 'select',
                value: codeTypeDePrestataire,
                required: true,
                url: '../api/prestataire/type-prestataires',
                onChange: handleCodeTypeDePrestataireChange,
            },
            {
                id: 'telephone',
                type: 'number',
                placeholder: 'Exemple: 0658905910',
                value: telephone,
                maxLength: 12,
                required: true,
                onInputChange: handleTelephoneChange,
            },
            {
                id: 'mail',
                type: 'input',
                value: mail,
                required: true,
                placeholder: 'Exemple: Prestataire.prestataire@gmail.com',
                maxLength: 255,
                onInputChange: handleMailChange,
            },
            {
                id: 'Siren',
                type: 'number',
                value: siren,
                placeholder: 'Exemple: 453684259',
                maxLength: 9,
                onInputChange: handleSirenChange,
            },
            {
                id: 'Siret',
                type: 'number',
                value: siret,
                placeholder: 'Exemple: 15269783246918',
                maxLength: 14,
                onInputChange: handleSiretChange,
            },
            {
                id: 'adresse',
                type: 'input',
                value: adresse,
                placeholder: 'Exemple: 12 rue de la paix, 75000 Paris',
                maxLength: 255,
                onInputChange: handleAdresseChange,
            },
            {
                id: 'civilite_contact_prestataire',
                type: 'select',
                value: civiliteContactPrestataire,
                url: '../api/select/genre',
                onChange: handleCiviliteContactPrestataireChange,
            },
            {
                id: 'nom_contact_prestataire',
                type: 'input',
                value: nomContactPrestataire,
                placeholder: 'Exemple: Delacroix',
                maxLength: 20,
                onInputChange: handleNomContactPrestataireChange,
            },
            {
                id: 'prenom_contact_prestataire',
                type: 'input',
                value: prenomContactPrestataire,
                placeholder: 'Exemple: David',
                maxLength: 20,
                onInputChange: handlePrenomContactPrestataireChange,
            },
            {
                id: 'telephone_contact_prestataire',
                type: 'number',
                value: telephoneContactPrestataire,
                placeholder: 'Exemple: 0658905910',
                maxLength: 12,
                onInputChange: handleTelephoneContactPrestataireChange,
            },
            {
                id: 'mail_contact_prestataire',
                type: 'input',
                value: mailContactPrestataire,
                placeholder: 'Exemple: David.delacroix@gmail.com',
                maxLength: 255,
                onInputChange: handleMailContactPrestataireChange,
            },
            {
                id: 'commentaires',
                type: 'input',
                value: commentaires,
                placeholder: 'Exemple: Prestataire très sérieux',
                maxLength: 200,
                onInputChange: handleCommentairesChange,
            },
            {
                id: 'date_arret_activite_du_prestataire',
                type: 'date',
                value:
                    dateArretActiviteDuPrestataire &&
                    !isNaN(dateArretActiviteDuPrestataire?.getTime())
                        ? dateArretActiviteDuPrestataire
                              .toISOString()
                              .split('T')[0]
                        : null,
                onInputChange: handleDateArretActiviteDuPrestataireChange,
            },
        ]

        if (fields[3].value !== '') {
            fields[4].required = false
        } else if (fields[4].value !== '') {
            fields[3].required = false
        }

        if (
            dateArretActiviteDuPrestataire &&
            dateArretActiviteDuPrestataire?.toISOString().split('T')[0] <
                new Date()?.toISOString().split('T')[0]
        ) {
            setDateArretActiviteDuPrestataire(undefined)
        }

        return fields
    }, [
        codeTypeDePrestataire,
        raisonSociale,
        nomCommercial,
        siren,
        siret,
        telephone,
        mail,
        adresse,
        civiliteContactPrestataire,
        nomContactPrestataire,
        prenomContactPrestataire,
        telephoneContactPrestataire,
        mailContactPrestataire,
        commentaires,
        dateArretActiviteDuPrestataire,
    ])

    useEffect(() => {
        const fetchDons = async () => {
            const res = await fetch(
                `http://localhost:3000/api/prestataire?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Prestataire[]; total: number } =
                await res.json()
            setPrestataires(data)
            setTotalItems(total)
            setFields(generateFields())
        }

        const fetchSearchDons = async () => {
            if (search.length === 0) {
                const res = await fetch(
                    'http://localhost:3000/api/prestataire?limit=5000',
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const { data }: { data: Prestataire[] } = await res.json()
                setSearch(data)
            }
        }

        fetchDons()
        fetchSearchDons()
    }, [page, itemsPerPage, generateFields, search])

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
                <h1 className={style.lg}>Prestataire</h1>
                <List
                    items={Prestataires.map(Prestataire => ({
                        value1: Prestataire.code_Prestataire.toString(),
                        value2: Prestataire.raison_sociale.toString(),
                        value3:
                            Prestataire.telephone.toString() == ''
                                ? '/'
                                : Prestataire.telephone.toString(),
                        value4:
                            Prestataire.mail.toString() == ''
                                ? '/'
                                : Prestataire.mail.toString(),
                        value5:
                            Prestataire.telephone_contact_prestataire.toString() ==
                            ''
                                ? '/'
                                : Prestataire.telephone_contact_prestataire.toString(),
                        value6:
                            Prestataire.mail_contact_prestataire.toString() ==
                            ''
                                ? '/'
                                : Prestataire.mail_contact_prestataire.toString(),
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: 'http://localhost:3000/api/prestataire',
                    }}
                    attribut={{
                        att1: 'Raison sociale',
                        att2: 'Téléphone',
                        att3: 'Mail',
                        att4: 'Téléphone du contact',
                        att5: 'Mail du contact',
                    }}
                    searchItems={search.map(Prestataire => ({
                        value1: Prestataire.code_Prestataire.toString(),
                        value2: Prestataire.raison_sociale.toString(),
                        value3:
                            Prestataire.telephone.toString() == ''
                                ? '/'
                                : Prestataire.telephone.toString(),
                        value4:
                            Prestataire.mail.toString() == ''
                                ? '/'
                                : Prestataire.mail.toString(),
                        value5:
                            Prestataire.telephone_contact_prestataire.toString() ==
                            ''
                                ? '/'
                                : Prestataire.telephone_contact_prestataire.toString(),
                        value6:
                            Prestataire.mail_contact_prestataire.toString() ==
                            ''
                                ? '/'
                                : Prestataire.mail_contact_prestataire.toString(),
                    }))}
                    pageInfos={{
                        page,
                        itemsPerPage,
                        totalItems,
                        setTotal: setTotalItems,
                    }}
                />
                <Pagination
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    currentPage={page}
                />
                {''}
                {isPopUpOpen && (
                    <div className={style.PopUp}>
                        <PopUp
                            onClose={handleClose}
                            url='http://localhost:3000/api/prestataire'
                            fields={fields} // Use the fields state here
                        />
                    </div>
                )}
                <TypesButtons
                    items={[
                        {
                            label: 'Types de prestataires',
                            url: 'type-prestataires',
                        },
                    ]}
                />
            </div>
        </>
    )
}

export default withAuthorization(PrestatairesPage, ['AD', 'PR'])
