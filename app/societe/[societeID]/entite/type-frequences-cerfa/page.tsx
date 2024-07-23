'use client'
import { useEffect, useState } from 'react'
import List from '../../../../../components/list'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../../styles/components.module.css'
import Image from 'next/image'

export interface Frequence_cerfa {
    id: string
    label: string
}

function Frequences_cerfaPage({ params }: { params: { societeID: string } }) {
    const [Frequences_cerfa, setFrequences_cerfa] = useState<Frequence_cerfa[]>(
        [],
    )

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchFrequences_cerfa = async () => {
            const res = await fetch(
                `../../../../api/societe/${params.societeID}/entite/type-frequences-cerfa`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Frequences_cerfa: Frequence_cerfa[] = await res.json()
            setFrequences_cerfa(Frequences_cerfa)
        }

        fetchFrequences_cerfa()
    }, [params.societeID])

    return (
        <>
            <div className={style.page}>
                <div className={style.croixID}>
                    <h1 className={style.lg1}>Types de fréquences cerfa</h1>
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
                    items={Frequences_cerfa.map(TypesFrequences_cerfa => ({
                        value1: TypesFrequences_cerfa.id,
                        value2: TypesFrequences_cerfa.id,
                        value3: TypesFrequences_cerfa.label,
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `../../../../api/societe/${params.societeID}/entite/type-frequences-cerfa`,
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
                            url={`../../../../api/societe/${params.societeID}/entite/type-frequences-cerfa`}
                            fields={[
                                {
                                    id: 'code_frequence_cerfa',
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

export default withAuthorization(Frequences_cerfaPage, ['AD', 'PR'])
