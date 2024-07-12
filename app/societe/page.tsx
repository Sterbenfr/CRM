'use client'
import { useEffect, useState, useCallback } from 'react'
import List from '../../components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../styles/components.module.css'
import TypesButtons from '@/components/TypesButtons'

export interface Societe {
    code_Societe: number
    raison_sociale: string
    nom_commercial: string
    Logo: Blob
    site_Web: string
    Siren: string
    code_type_activite_Societe: string
    commentaires: string
    code_Groupe_appartenance: number
    date_arret_activite_Societe: Date
}

function SocietesPage() {
    const [Societes, setSocietes] = useState<Societe[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [search, setSearch] = useState<Societe[]>([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const [fields, setFields] = useState<
        {
            id: string
            type: FieldType
            value: string | null
            placeholder?: string
            url?: string
            maxLength?: number
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[]
    >([])

    const [raisonSociale, setRaisonSociale] = useState('')
    const [nomCommercial, setNomCommercial] = useState('')
    //const [Logo, setLogo] = useState<Blob>()
    const [siteWeb, setSiteWeb] = useState('')
    const [Siren, setSiren] = useState('')
    const [codeTypeActiviteSociete, setCodeTypeActiviteSociete] =
        useState('')
    const [commentaires, setCommentaires] = useState('')
    const [codeGroupeAppartenance, setCodeGroupeAppartenance] = useState('')
    const [dateArretActiviteSociete, setDateArretActiviteSociete] =
        useState<Date>()

    const handleClose = () => {
        setIsPopUpOpen(false)
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

    /*const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setLogo(event.target.files[0])
        }
    }*/

    const handleSiteWebChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSiteWeb(event.target.value)
    }

    const handleSirenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSiren(event.target.value)
    }

    const handleCodeTypeActiviteSocieteChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeTypeActiviteSociete(event.target.value)
    }

    const handleCommentairesChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCommentaires(event.target.value)
    }

    const handleCodeGroupeAppartenanceChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCodeGroupeAppartenance(event.target.value)
    }

    const handleDateArretActiviteSocieteChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDateArretActiviteSociete(new Date(event.target.value))
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
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[] = [
            {
                id: 'raison_sociale',
                type: 'input',
                value: raisonSociale,
                placeholder: 'Exemple: Alpha Coproration',
                required: true,
                onInputChange: handleRaisonSocialeChange,
                maxLength: 30,
            },
            {
                id: 'nom_commercial',
                type: 'input',
                value: nomCommercial,
                placeholder: 'Exemple: Alpha Corp',
                onInputChange: handleNomCommercialChange,
                maxLength: 30,
            },
            {
                id: 'Siren',
                type: 'number',
                value: Siren,
                placeholder: 'Exemple: 453684259',
                required: true,
                maxLength: 9,
                onInputChange: handleSirenChange,
            }, // if number !== 9 = pas de validation
            {
                id: 'code_type_activite_Societe',
                type: 'select',
                value: codeTypeActiviteSociete,
                url: '../api/societe/type-activite-societe',
                required: true,
                onChange: handleCodeTypeActiviteSocieteChange,
            },
            {
                id: 'Logo',
                type: 'file',
                value: null,
                //onInputChange: handleLogoChange,
            }, // type Blob
            {
                id: 'site_Web',
                type: 'input',
                value: siteWeb,
                placeholder: 'Exemple: http://www.alpha.com/',
                onInputChange: handleSiteWebChange,
                maxLength: 255,
            },
            {
                id: 'commentaires',
                type: 'input',
                value: commentaires,
                placeholder: 'Exemple: Societe de service informatique',
                maxLength: 200,
                onInputChange: handleCommentairesChange,
            },
            {
                id: 'code_Groupe_appartenance',
                type: 'search',
                value: codeGroupeAppartenance,
                url: '../api/select/societe/groupe',
                placeholder : 'Exemple: Groupe Alpha',
                onInputChange: handleCodeGroupeAppartenanceChange,
            },
            {
                id: 'date_arret_activite_Societe',
                type: 'date',
                value: dateArretActiviteSociete?.toISOString().split('T')[0] || '',
                onInputChange: handleDateArretActiviteSocieteChange,
            },
        ]
        if (dateArretActiviteSociete === undefined) {
            fields[8].value = null
        }

        if (codeGroupeAppartenance === '') {
            fields[7].value = null
        }
        return fields
    }, [
        raisonSociale,
        nomCommercial,
        siteWeb,
        Siren,
        codeTypeActiviteSociete,
        commentaires,
        codeGroupeAppartenance,
        dateArretActiviteSociete,
    ])

    useEffect(() => {
        const fetchSocietes = async () => {
            const res = await fetch(
                `http://localhost:3000/api/societe?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Societe[]; total: number } =
                await res.json()
            setSocietes(data)
            setTotalItems(total) // set the total items
            setFields(generateFields())
        }

        const fetchSocieteSearch = async () => {
            if (search.length === 0) {
                const res = await fetch(
                    `http://localhost:3000/api/societe?limit=10000`,
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const { data }: { data: Societe[] } = await res.json()
                setSearch(data)
            }
        }

        fetchSocietes()
        fetchSocieteSearch()

    }, [page, itemsPerPage, generateFields, search])

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
                <h1 className={style.lg}>Entreprise</h1>
                <List
                    items={Societes.map(Societe => ({
                        value1: Societe.code_Societe.toString(),
                        value2: Societe.raison_sociale,
                        value3: Societe.site_Web == '' ? '/' : Societe.site_Web,
                        value4: Societe.code_type_activite_Societe,
                        value5: Societe.commentaires == '' ? '/' : Societe.commentaires,
                        value6:
                            Societe.date_arret_activite_Societe == null
                                ? '/'
                                : Societe.date_arret_activite_Societe
                                      .toString()
                                      .split('T')[0],
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: 'http://localhost:3000/api/societe',
                    }}
                    attribut={{
                        att1: 'Raison Sociale',
                        att2: 'Site Web',
                        att3: 'Code type ativite societe',
                        att4: 'Commentaires',
                        att5: 'Date Arret Activite',
                    }}
                    searchItems={search.map(Societe => ({
                        value1: Societe.code_Societe.toString(),
                        value2: Societe.raison_sociale,
                        value3: Societe.site_Web == '' ? '/' : Societe.site_Web,
                        value4: Societe.code_type_activite_Societe,
                        value5: Societe.commentaires == '' ? '/' : Societe.commentaires,
                        value6:
                            Societe.date_arret_activite_Societe == null
                                ? '/'
                                : Societe.date_arret_activite_Societe
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
                            url='http://localhost:3000/api/societe'
                            fields={fields}
                        />
                    </div>
                )}
                <TypesButtons
                    items={[
                        {
                            label: 'Types activite societe',
                            url: 'type-activite-societe',
                        },
                    ]}
                />
            </div>
        </>
    )
}
export default withAuthorization(SocietesPage, ['AD', 'PR'])
