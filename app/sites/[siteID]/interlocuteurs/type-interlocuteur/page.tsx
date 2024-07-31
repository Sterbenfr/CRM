'use client'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import List from '../../../../../components/list'
import style from '../../../../../styles/components.module.css'
import Image from 'next/image'

export interface type_interlocuteur {
    id: string
    label: string
}

function InterlocuteursPage({ params }: { params: { siteID: string } }) {
    const [Interlocuteurs, setInterlocuteurs] = useState<type_interlocuteur[]>(
        [],
    )

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchInterlocuteurs = async () => {
            if (!params.siteID) return
            const res = await fetch(
                `../../../../api/sites/${params.siteID}/interlocuteurs/type-interlocuteur`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Interlocuteurs: type_interlocuteur[] = await res.json()
            setInterlocuteurs(Interlocuteurs)
        }

        fetchInterlocuteurs()
    }, [params.siteID])

    return (
        <>
            <div className={style.page}>
                <div className={style.croixID}>
                    <h1 className={style.lg1}>
                        Types d&apos;interlocuteurs RC
                    </h1>
                    <a href='javascript:history.go(-1)' className={style.btnC}>
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
                    items={Interlocuteurs.map(type_interlocuteur => ({
                        value1: type_interlocuteur.id.toString(),
                        value2: type_interlocuteur.id.toString(),
                        value3: type_interlocuteur.label,
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `../../../../api/sites/${params.siteID}/interlocuteurs/type-interlocuteur`,
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
                            url={`../../../../api/sites/${params.siteID}/interlocuteurs/type-interlocuteur`}
                            fields={[
                                {
                                    id: 'code_type_interlocuteur',
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

export default withAuthorization(InterlocuteursPage, ['AD', 'SU'])
