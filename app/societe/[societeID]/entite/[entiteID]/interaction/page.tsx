'use client'

import { useEffect, useState } from 'react'
import List from '@/components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../../../styles/components.module.css'

export interface Interactions {
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
    const [EntiteInteraction, setEntiteInteraction] = useState('2')

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    const handleEntiteInteraction = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setEntiteInteraction(event.target.value)
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

        fetchInteractions()
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
                <List
                    items={Interactions.map(Interactions => ({
                        value1: Interactions.code_Entite_Prospectee.toString(),
                        value2: Interactions.date_interaction
                            .toString()
                            .split('T')[0],
                        value3: Interactions.code_contact_entite.toString(),
                        value4: Interactions.date_relance
                            .toString()
                            .split('T')[0],
                        value5: Interactions.commentaires,
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}/interactions`,
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
                                    type: 'search',
                                    value: null,
                                    url: '../../../../../api/select/societe/entite',
                                    required: true,
                                }, // a voir remplissage auto
                                {
                                    id: 'date_interaction',
                                    type: 'date',
                                    value: null,
                                    required: true,
                                }, // mettre date du jour par defaut
                                {
                                    id: 'code_type_interaction',
                                    type: 'select',
                                    value: 'PRE',
                                    url: `../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/interactions/type-interactions`,
                                },
                                {
                                    id: 'code_modalite_interaction',
                                    type: 'select',
                                    value: 'MAI',
                                    url: `../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/interactions/type-modalite-interactions`,
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
                                    placeholder: 'Exemple: Relance pour aide a Dunkerque',
                                },
                                {
                                    id: 'pieces_associees',
                                    type: 'file',
                                    value: null,
                                }, // type blob
                                {
                                    id: 'date_relance',
                                    type: 'date',
                                    value: null,
                                }, // a voir si utile car date interraction existe deja
                            ]}
                        />
                    </div>
                )}
            </div>
        </>
    )
}
export default withAuthorization(InteractionsPage, ['AD', 'PR'])
