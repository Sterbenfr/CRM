'use client'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import List from '@/components/list'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../../../../styles/components.module.css'
import Image from 'next/image'

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
                `../../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/interactions/type-interactions`,
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
            <div className={style.page}>
                <div className={style.croixID}>
                    <h1 className={style.lg1}>Types d&apos;interactions</h1>
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
                    items={Interactions.map(typeInteraction => ({
                        value1: typeInteraction.id,
                        value2: typeInteraction.id,
                        value3: typeInteraction.label,
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `../../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/interactions/type-interactions`,
                    }}
                    attribut={{
                        att1: 'Code',
                        att2: 'Libellé',
                    }}
                />
                {isPopUpOpen && (
                    <div className={style.PopUpType}>
                        <PopUp
                            onClose={handleClose}
                            url={`../../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/interactions/type-interactions`}
                            fields={[
                                {
                                    id: 'code_type_interaction',
                                    type: 'input',
                                    value: null,
                                    required: true,
                                    maxLength: 4,
                                },
                                {
                                    id: 'libelle',
                                    type: 'input',
                                    value: null,
                                    required: true,
                                    maxLength: 50,
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
