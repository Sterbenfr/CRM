'use client'
import { useEffect, useState } from 'react'
import List from '@/components/list'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'

export interface Modalite_Interactions {
    id: string
    label: string
}

function Modalites_InteractionsPage({
    params,
}: {
    params: { societeID: string; entiteID: string }
}) {
    const [Modalites_Interactions, setModalites_Interactions] = useState<
        Modalite_Interactions[]
    >([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchModalites_Interactions = async () => {
            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}/interactions/type-modalite-interactions`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Modalites_Interactions: Modalite_Interactions[] =
                await res.json()
            setModalites_Interactions(Modalites_Interactions)
        }

        fetchModalites_Interactions()
    }, [params.societeID, params.entiteID])
    return (
        <>
            <List
                items={Modalites_Interactions.map(ModalitesInteraction => ({
                    value1: ModalitesInteraction.id.toString(),
                    value2: ModalitesInteraction.id.toString(),
                    value3: ModalitesInteraction.label,
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
                    url={`http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}/interactions/type-modalite-interactions`}
                    fields={[
                        {
                            id: 'code_modalite_interaction',
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
export default withAuthorization(Modalites_InteractionsPage, ['AD', 'PR'])
