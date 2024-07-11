'use client'

import { useEffect, useState } from 'react'
import List from '@/components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../../../styles/components.module.css'

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
}

function InteractionsPage({
    params,
}: {
    params: { societeID: string; entiteID: string }
}) {
    const [Interactions, setInteractions] = useState<Interactions[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [search, setSearch] = useState<Interactions[]>([])

    const [EntiteInteraction, setEntiteInteraction] = useState(params.entiteID)
    const [codeTypeInteraction, setCodeTypeInteraction] = useState('PRE')
    const [codeModaliteInteraction, setCodeModaliteInteraction] =
        useState('MAI')
    const today = new Date()

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    const handleEntiteInteraction = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setEntiteInteraction(event.target.value)
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
        }

        const fetchSearchInteractions = async () => {
            if (search.length === 0) {
                const res = await fetch(
                    `http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}/interactions?limit=10000`,
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, itemsPerPage, params.societeID, params.entiteID])
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
                <h1 className={style.lg}>Interactions</h1>
                <List
                    items={Interactions.map(Interactions => ({
                        value1: Interactions.code_interaction.toString(),
                        value2: Interactions.code_Entite_Prospectee.toString(),
                        value3: Interactions.date_interaction
                            .toString()
                            .split('T')[0],
                        value4: Interactions.code_contact_entite.toString(),
                        value5: Interactions.date_relance
                            .toString()
                            .split('T')[0],
                        value6: Interactions.commentaires,
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
                        att1: '',
                        att2: 'Code interaction',
                        att3: 'Date interaction',
                        att4: 'Code contact entité',
                        att5: 'Date relance',
                        att6: '',
                        att7: 'Commentaires',
                    }}
                    searchItems={search.map(Interactions => ({
                        value1: Interactions.code_interaction.toString(),
                        value2: Interactions.code_Entite_Prospectee.toString(),
                        value3: Interactions.date_interaction
                            .toString()
                            .split('T')[0],
                        value4: Interactions.code_contact_entite.toString(),
                        value5: Interactions.date_relance
                            .toString()
                            .split('T')[0],
                        value6: Interactions.commentaires,
                    }))}
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
                            fields={[
                                {
                                    id: 'code_Utilisateur_Prospecteur',
                                    type: 'search',
                                    value: null,
                                    url: '../../../../../api/select/sites/utilisateurs',
                                    required: true,
                                },
                                {
                                    id: 'code_Entite_Prospectee',
                                    type: 'input',
                                    value: params.entiteID,
                                    disabled: true,
                                    required: true,
                                },
                                {
                                    id: 'date_interaction',
                                    type: 'date',
                                    value: today.toISOString().split('T')[0],
                                    required: true,
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
                                    type: 'search',
                                    value: null,
                                    url: `../../../../../api/select/societe/entite/${EntiteInteraction}/contact`,
                                    onInputChange: handleEntiteInteraction,
                                },
                                {
                                    id: 'commentaires',
                                    type: 'input',
                                    value: null,
                                    placeholder:
                                        'Exemple: Relance pour aide a Dunkerque',
                                    maxLength: 200,
                                },
                                {
                                    id: 'pieces_associees',
                                    type: 'file',
                                    value: null,
                                }, // type blob
                                {
                                    id: 'date_relance',
                                    type: 'date',
                                    value: new Date(
                                        today.getFullYear(),
                                        today.getMonth(),
                                        today.getDate() + 15,
                                    )
                                        .toISOString()
                                        .split('T')[0],
                                },
                            ]}
                        />
                    </div>
                )}
            </div>
        </>
    )
}
export default withAuthorization(InteractionsPage, ['AD', 'PR'])
