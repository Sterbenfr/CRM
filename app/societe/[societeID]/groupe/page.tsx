'use client'
import { useEffect, useState, useCallback } from 'react'
import List from '@/components/list'
import { Pagination } from '../../../../components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../styles/components.module.css'
import Image from 'next/image'

export interface Groupe {
    code_groupe: number
    nom_du_Groupe: string
    Logo: Blob
    site_Web: string
    commentaires: string
    date_arret_activite_du_groupe: Date
}

function GroupesPage({ params }: { params: { societeID: string } }) {
    const [groupes, setGroupes] = useState<Groupe[]>([])
    const [page, setPage] = useState(1) 
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)
    const [search, setSearch] = useState<Groupe[]>([])

    const [nomDuGroupe, setNomDuGroupe] = useState('')
    const [siteWeb, setSiteWeb] = useState('')
    const [commentaires, setCommentaires] = useState('')
    const [dateArretActiviteDuGroupe, setDateArretActiviteDuGroupe] =
        useState<Date>()

    const handleClose = () => {
        setIsPopUpOpen(false)
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

    const handleNomDuGroupeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNomDuGroupe(event.target.value)
    }

    const handleSiteWebChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSiteWeb(event.target.value)
    }

    const handleCommentairesChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCommentaires(event.target.value)
    }

    const handleDateArretActiviteDuGroupeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDateArretActiviteDuGroupe(new Date(event.target.value))
    }

    const generateFields = useCallback(() => {
        const fields: {
            id: string
            type: FieldType
            value: string | null
            placeholder?: string
            url?: string
            createURL?: string
            disabled?: boolean
            required?: boolean
            maxLength?: number
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[] = [
            {
                id: 'nom_du_Groupe',
                type: 'input',
                value: nomDuGroupe,
                placeholder: 'Exemple: Groupe Alpha',
                maxLength: 50,
                required: true,
                onInputChange: handleNomDuGroupeChange,
            },
            {
                id: 'Logo',
                type: 'file',
                value: null,
            },
            {
                id: 'site_Web',
                type: 'input',
                value: siteWeb,
                placeholder: 'Exemple: http://www.groupealpha.com',
                maxLength: 255,
                onInputChange: handleSiteWebChange,
            },
            {
                id: 'commentaires',
                type: 'input',
                value: commentaires,
                placeholder: 'Exemple: Groupe actif en dons alimentaires',
                maxLength: 200,
                onInputChange: handleCommentairesChange,
            },
            {
                id: 'date_arret_activite_du_Groupe',
                type: 'date',
                value:
                    dateArretActiviteDuGroupe &&
                    !isNaN(dateArretActiviteDuGroupe.getTime())
                        ? dateArretActiviteDuGroupe.toISOString().split('T')[0]
                        : null,
                onInputChange: handleDateArretActiviteDuGroupeChange,
            },
        ]

        if (dateArretActiviteDuGroupe === undefined) {
            fields[4].value = null
        }

        return fields
    }, [commentaires, dateArretActiviteDuGroupe, nomDuGroupe, siteWeb])

    useEffect(() => {
        const fetchGroupes = async () => {
            const res = await fetch(
                `../../../api/societe/${params.societeID}/groupe?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Groupe[]; total: number } =
                await res.json()
            setGroupes(data)
            setTotalItems(total)
        }

        const fetchSearchGroupe = async () => {
            if (search.length === 0) {
                const res = await fetch(
                    `../../../api/societe/${params.societeID}/groupe`,
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const { data }: { data: Groupe[] } = await res.json()
                setSearch(data)
            }
        }

        fetchGroupes()
        fetchSearchGroupe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, itemsPerPage, params.societeID])

    useEffect(() => {
        setFields(generateFields())
    }, [generateFields])

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage)
        setPage(1) 
    }

    return (
        <div>
            <>
                <div className={style.page}>
                    <div className={style.croixID}>
                        <h1 className={style.lg1}>Groupe</h1>
                        <a
                            href='javascript:history.go(-1)'
                            className={style.btnC}
                        >
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
                        items={groupes.map(groupe => ({
                            value1: groupe.code_groupe.toString(),
                            value2: groupe.nom_du_Groupe,
                            value3:
                                groupe.site_Web === '' ? '/' : groupe.site_Web,
                            value4:
                                groupe.commentaires === ''
                                    ? '/'
                                    : groupe.commentaires,
                            value5:
                                groupe.date_arret_activite_du_groupe == null
                                    ? '/'
                                    : groupe.date_arret_activite_du_groupe
                                          .toString()
                                          .split('T')[0],
                        }))}
                        functions={{
                            fonc1: () => {
                                isPopUpOpen
                                    ? setIsPopUpOpen(false)
                                    : setIsPopUpOpen(true)
                            },
                            url: `../../../api/societe/${params.societeID}/groupe`,
                        }}
                        attribut={{
                            att1: 'Nom du groupe',
                            att2: 'Site web',
                            att3: 'Commentaire',
                            att4: "Date d'arrêt d'activité",
                        }}
                        dataExcel={groupes}
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
                                url={`../../../api/societe/${params.societeID}/groupe`}
                                fields={fields}
                                fileUrl2='../../../api/upload/image'
                                fileIndex2={1}
                            />
                        </div>
                    )}
                </div>
            </>
        </div>
    )
}

export default withAuthorization(GroupesPage, ['AD', 'SU', 'AP'])
