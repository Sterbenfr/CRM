/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState, useCallback } from 'react'
import List from '@/components/list'
import { Pagination } from '../../components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../styles/components.module.css'

export interface Sites {
    code_site: number
    designation_longue: string
    designation_courte: string
    adresse: string
    code_type_site: string
    date_ouverture: Date
    date_fermeture: Date
    numero_telephone: string
    adresse_mail: string
    commentaire: string
}

function SitesPage() {
    const [Sites, setSites] = useState<Sites[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [search, setSearch] = useState<Sites[]>([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    const [designationLongue, setDesignationLongue] = useState('')
    const [designationCourte, setDesignationCourte] = useState('')
    const [Adresse, setAdresse] = useState('')
    const [codeTypeSite, setCodeTypeSite] = useState('AD')

    /*
    const [lastDateOuverture, setLastDateOuverture] = useState(new Date())
    const [dateOuverture, setDateOuverture] = useState(
        lastDateOuverture !== new Date() ? lastDateOuverture : new Date())

        
    const [lastDateFermeture, setLastDateFermeture] = useState<Date>()
    const [dateFermeture, setDateFermeture] = useState(
        lastDateFermeture !== new Date() ? lastDateFermeture : new Date())
    */

    const [dateOuverture, setDateOuverture] = useState(new Date())
    const [dateFermeture, setDateFermeture] = useState<Date>()


    const [numeroTelephone, setNumeroTelephone] = useState('')
    const [adresseMail, setAdresseMail] = useState('')
    const [commentaires, setCommentaires] = useState('')

    const [fields, setFields] = useState<
        {
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
        }[]
    >([])

    type FieldType =
    | 'number'
    | 'search'
    | 'date'
    | 'select'
    | 'input'
    | 'file'
    | 'checkbox'
    | 'enum'

    const handledesignationLongueChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDesignationLongue(event.target.value)
    }

    const handledesignationCourteChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDesignationCourte(event.target.value)
    }

    const handleAdresseChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setAdresse(event.target.value)
    }

    const handleCodeTypeSiteChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeTypeSite(event.target.value)
    }

    const handleDateOuvertureChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDateOuverture(new Date(event.target.value))
    }

    const handleDateFermetureChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDateFermeture(new Date(event.target.value))
        /*  
        let returnedDate = new Date(event.target.value)
        const newFinMiseDispo = new Date(event.target.value)
            .toISOString()
            .split('T')[0]
        const debut = dateOuverture.toISOString().split('T')[0]
        if (newFinMiseDispo < debut) {
            returnedDate = dateOuverture
            setDateFermeture(returnedDate)
        } else {
            setDateFermeture(returnedDate)
        }
        */
    }

    const handleNumeroTelephoneChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNumeroTelephone(event.target.value)
    }

    const handleAdresseMailChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setAdresseMail(event.target.value)
    }

    const handleCommentairesChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCommentaires(event.target.value)
    }

    const generateFields = useCallback((
        
    ) => {
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
                id: 'designation_longue',
                type: 'input',
                value: designationLongue,
                required: true,
                placeholder: 'Siège social de la société',
                onInputChange: handledesignationLongueChange,
                maxLength: 40,
            },
            {
                id: 'designation_courte',
                type: 'input',
                value: designationCourte,
                placeholder: 'Siège',
                onInputChange: handledesignationCourteChange,
                maxLength: 15,
            },
            {
                id: 'adresse',
                type: 'input',
                value: Adresse,
                required: true,
                placeholder: 'Exemple: 1 rue de Paris',
                onInputChange: handleAdresseChange,
            },
            {
                id: 'code_type_site',
                type: 'select',
                value: codeTypeSite,
                required: true,
                url: '../api/sites/type-site-types',
                onChange: handleCodeTypeSiteChange,
            },
            {
                id: 'date_ouverture',
                type: 'date',
                value: dateOuverture.toISOString().split('T')[0],
                onInputChange: handleDateOuvertureChange,
            },
            {
                id: 'date_fermeture',
                type: 'date',
                value: dateFermeture?.toISOString().split('T')[0] || '',
                onInputChange: handleDateFermetureChange,
            }, // pas avant date ouverture
            {
                id: 'numero_telephone',
                type: 'input',
                value: numeroTelephone,
                placeholder: 'Exemple: 0658905910',
                onInputChange: handleNumeroTelephoneChange,
                maxLength: 12,
            },
            {
                id: 'adresse_mail',
                type: 'input',
                value: adresseMail,
                placeholder: 'Exemple: Siege.social@gmail.com',
                onInputChange: handleAdresseMailChange,
            },
            {
                id: 'commentaires',
                type: 'input',
                value: commentaires,
                placeholder: 'Exemple: Siège social de la société',
                onInputChange: handleCommentairesChange,
                maxLength: 200,
            }
        ]

        /*
        if (dateOuverture !== new Date()) {
            console.log('date ouverture !== new Date()')
            setLastDateOuverture(dateOuverture)
            setDateOuverture(dateOuverture)
            if (dateFermeture !== undefined && dateOuverture > dateFermeture) {
                console.log('date ouverture > date fermeture')
                setLastDateFermeture(dateOuverture)
            }
        }

        if (dateFermeture !== new Date() && dateFermeture !== undefined) {
            console.log('date fermeture !== new Date()')
            setLastDateFermeture(dateFermeture)
        }
        */

        return fields
    }, [
        designationLongue,
        designationCourte,
        Adresse,
        codeTypeSite,
        numeroTelephone,
        adresseMail,
        commentaires,
    ])

    useEffect(() => {
        const fetchSites = async () => {
            const res = await fetch(
                `http://localhost:3000/api/sites?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Sites[]; total: number } =
                await res.json()
            setSites(data)
            setTotalItems(total) // set the total items
            setFields(generateFields())
        }

        const fetchSearchSites = async () => {
            if (search.length === 0) {
                const res = await fetch(
                    'http://localhost:3000/api/sites?limit=10000',
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const { data }: { data: Sites[] } = await res.json()
                setSearch(data)
            }
        }

        fetchSites()
        fetchSearchSites()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, itemsPerPage, generateFields, dateOuverture, dateFermeture])
        
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
                <h1 className={style.lg}>Sites</h1>
                <List
                    items={Sites.map(Sites => ({
                        value1: Sites.code_site.toString(),
                        value2: Sites.designation_longue.toString(),
                        value3: Sites.adresse.toString(),
                        value4: Sites.date_ouverture.toString().split('T')[0],
                        value5: Sites.numero_telephone.toString(),
                        value6: Sites.adresse_mail.toString(),
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: 'http://localhost:3000/api/sites',
                    }}
                    searchItems={search.map(Sites => ({
                        value1: Sites.code_site.toString(),
                        value2: Sites.designation_longue.toString(),
                        value3: Sites.adresse.toString(),
                        value4: Sites.date_ouverture.toString().split('T')[0],
                        value5: Sites.numero_telephone.toString(),
                        value6: Sites.adresse_mail.toString(),
                    }))}
                />
                <Pagination
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange} // pass the new prop here
                    totalItems={totalItems} // use the total items from the state
                    itemsPerPage={itemsPerPage}
                    currentPage={page}
                />{' '}
                {isPopUpOpen && (
                    <div className={style.PopUp}>
                        <PopUp
                            onClose={handleClose}
                            url='http://localhost:3000/api/sites'
                            fields={fields}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default withAuthorization(SitesPage, ['AD', 'PR'])
