'use client'

import { useEffect, useState, useCallback } from 'react'
import List from '@/components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../../../styles/components.module.css'
import TypesButtons from '@/components/TypesButtons'
import Image from 'next/image'

export interface Interactions {
    code_interaction: number
    code_Utilisateur_Prospecteur: number
    code_Entite_Prospectee: number
    date_interaction: Date
    code_type_interaction: string
    code_modalite_interaction: string
    code_contact_entite: number
    commentaires: string
    pieces_associees: Blob
    date_relance: Date
    raison_sociale?: string
    nom?: string
}

function InteractionsPage({
    params,
}: {
    params: { societeID: string; entiteID: string }
}) {
    const [Interactions, setInteractions] = useState<Interactions[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [search, setSearch] = useState<Interactions[]>([])

    const [codeUtilisateurProspecteur, setCodeUtilisateurProspecteur] =
        useState('')
    const [dateInteraction, setDateInteraction] = useState(new Date())
    const [codeTypeInteraction, setCodeTypeInteraction] = useState('')
    const [codeModaliteInteraction, setCodeModaliteInteraction] = useState('')
    const [codeContactEntiteInteraction, setCodeContactEntiteInteraction] =
        useState('')
    const [commentaires, setCommentaires] = useState('')
    const today = new Date()
    const [dateRelance, setDateRelance] = useState(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15),
    )

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    const handleCodeTypeInteraction = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeTypeInteraction(event.target.value)
    }

    const handleCodeModaliteInteraction = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeModaliteInteraction(event.target.value)
    }

    const handleCodeContactEntiteInteraction = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeContactEntiteInteraction(event.target.value)
    }

    const handleCodeUtilisateurProspecteur = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCodeUtilisateurProspecteur(event.target.value)
    }

    const handleDateInteraction = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDateInteraction(new Date(event.target.value))
    }

    const handleCommentaires = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentaires(event.target.value)
    }

    const handleDateRelance = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateRelance(new Date(event.target.value))
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

    const generateFields = useCallback(() => {
        const fields: {
            id: string
            type: FieldType
            value: string | null
            placeholder?: string
            url?: string
            createURL?: string
            required?: boolean
            disabled?: boolean
            maxLength?: number
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[] = [
            {
                id: 'code_Entite_Prospectee',
                type: 'input',
                value: params.entiteID,
                disabled: true,
                required: true,
            },
            {
                id: 'code_Utilisateur_Prospecteur',
                type: 'search',
                value: codeUtilisateurProspecteur,
                url: '../../../../../api/select/sites/utilisateurs',
                required: true,
                onInputChange: handleCodeUtilisateurProspecteur,
            },
            {
                id: 'date_interaction',
                type: 'date',
                value: !isNaN(dateInteraction.getTime())
                    ? dateInteraction.toISOString().split('T')[0]
                    : null,
                required: true,
                onInputChange: handleDateInteraction,
            },
            {
                id: 'code_type_interaction',
                type: 'select',
                value: codeTypeInteraction,
                url: `../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/interactions/type-interactions`,
                onChange: handleCodeTypeInteraction,
            },
            {
                id: 'code_modalite_interaction',
                type: 'select',
                value: codeModaliteInteraction,
                url: `../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/interactions/type-modalite-interactions`,
                onChange: handleCodeModaliteInteraction,
            },
            {
                id: 'code_contact_entite',
                type: 'select',
                value: codeContactEntiteInteraction,
                url: `../../../../../api/select/societe/entite/${params.entiteID}/contact`,
                onChange: handleCodeContactEntiteInteraction,
            },
            {
                id: 'commentaires',
                type: 'input',
                value: commentaires,
                placeholder: 'Exemple: Relance pour aide a Dunkerque',
                maxLength: 200,
                onInputChange: handleCommentaires,
            },
            {
                id: 'pieces_associees',
                type: 'file',
                value: null,
            }, // type blob
            {
                id: 'date_relance',
                type: 'date',
                value: !isNaN(dateRelance.getTime())
                    ? dateRelance.toISOString().split('T')[0]
                    : null,
                onInputChange: handleDateRelance,
            },
        ]

        return fields
    }, [
        codeUtilisateurProspecteur,
        codeModaliteInteraction,
        codeContactEntiteInteraction,
        codeTypeInteraction,
        commentaires,
        dateInteraction,
        dateRelance,
        params.entiteID,
        params.societeID,
    ])

    useEffect(() => {
        const fetchInteractions = async () => {
            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}/interactions?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            const { data, total }: { data: Interactions[]; total: number } =
                await res.json()
            setInteractions(data)
            setTotalItems(total)
            setFields(generateFields())
        }

        const fetchSearchInteractions = async () => {
            if (search.length === 0) {
                const res = await fetch(
                    `http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}/interactions?limit=5000`,
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const { data }: { data: Interactions[] } = await res.json()
                setSearch(data)
            }
        }

        fetchInteractions()
        fetchSearchInteractions()
    }, [
        page,
        itemsPerPage,
        params.societeID,
        params.entiteID,
        search,
        generateFields,
    ])
    // add a function to handle page changes
    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage)
        setPage(1)
    }

    return (
        <>
            <div className={style.page}>
                <div className={style.croixID}>
                    <h1 className={style.lg1}>Interactions</h1>
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
                    items={Interactions.map(Interactions => ({
                        value1: Interactions.code_interaction.toString(),
                        value2: Interactions.raison_sociale
                            ? Interactions.raison_sociale
                            : '/',
                        value3:
                            Interactions.date_interaction
                                .toString()
                                .split('T')[0] == ''
                                ? '/'
                                : Interactions.date_interaction
                                      .toString()
                                      .split('T')[0],
                        value4: Interactions.nom ? Interactions.nom : '/',
                        value5:
                            Interactions.date_relance
                                .toString()
                                .split('T')[0] == ''
                                ? '/'
                                : Interactions.date_relance
                                      .toString()
                                      .split('T')[0],
                        value6:
                            Interactions.commentaires == ''
                                ? '/'
                                : Interactions.commentaires,
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}/interactions`,
                    }}
                    attribut={{
                        att1: 'Donateur',
                        att2: 'Date interaction',
                        att3: 'Personne contactée',
                        att4: 'Date relance',
                        att5: 'Commentaire',
                    }}
                    searchItems={search.map(Interactions => ({
                        value1: Interactions.code_interaction.toString(),
                        value2: Interactions.raison_sociale
                            ? Interactions.raison_sociale
                            : '',
                        value3:
                            Interactions.date_interaction
                                .toString()
                                .split('T')[0] == ''
                                ? '/'
                                : Interactions.date_interaction
                                      .toString()
                                      .split('T')[0],
                        value4: Interactions.nom ? Interactions.nom : '',
                        value5:
                            Interactions.date_relance
                                .toString()
                                .split('T')[0] == ''
                                ? '/'
                                : Interactions.date_relance.toString(),
                        value6: Interactions.commentaires,
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
                            url={`http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}/interactions`}
                            fields={fields}
                            fileUrl='../../../../../api/upload/piece'
                            fileIndex={7}
                        />
                    </div>
                )}
                <TypesButtons
                    items={[
                        {
                            label: `Types d'interactions`,
                            url: 'type-interactions',
                        },
                        {
                            label: `Types de modalités d'interactions`,
                            url: 'type-modalite-interactions',
                        },
                    ]}
                />
            </div>
        </>
    )
}
export default withAuthorization(InteractionsPage, ['AD', 'PR'])
