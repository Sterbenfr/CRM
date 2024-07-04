'use client'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import List from '@/components/list'
import withAuthorization from '@/components/withAuthorization'

export interface Interaction {
    id: string
    label: string
}

function InteractionsPage({
    params,
}: {
    params: { societeID: string; entiteID: string }
}) {
    const [Interactions, setInteractions] = useState<Interaction[]>([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchInteractions = async () => {
            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}/interactions/type-interactions`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Interactions: Interaction[] = await res.json()
            setInteractions(Interactions)
        }

        fetchInteractions()
    }, [params.societeID, params.entiteID])

    return (
        <>
            <List
                items={Interactions.map(typeInteraction => ({
                    value1: typeInteraction.id.toString(),
                    value2: typeInteraction.id.toString(),
                    value3: typeInteraction.label,
                }))}
                functions={{
                    fonc1: () => {
                        isPopUpOpen
                            ? setIsPopUpOpen(false)
                            : setIsPopUpOpen(true)
                    },
                }}
            />
            {isPopUpOpen && (
                <PopUp
                    onClose={handleClose}
                    url={`http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}/interactions/type-interactions`}
                    fields={[
                        {
                            id: 'code_type_interaction',
                            type: 'input',
                            value: null,
                            required: true,
                        },
                        {
                            id: 'libelle',
                            type: 'input',
                            value: null,
                            required: true,
                        },
                    ]}
                />
            )}
        </>
    )
}
export default withAuthorization(InteractionsPage, ['AD', 'PR'])
