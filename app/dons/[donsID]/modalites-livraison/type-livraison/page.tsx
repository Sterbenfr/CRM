'use client'
import List from '../../../../../components/list'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../../styles/components.module.css'
import Image from 'next/image'

export interface Type_Livraison {
    id: string
    label: string
}

function Type_LivraisonsPage({ params }: { params: { donsID: string } }) {
    const [Type_Livraisons, setType_Livraisons] = useState<Type_Livraison[]>([])
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchType_Livraisons = async () => {
            const res = await fetch(
                `../../../../api/dons/${params.donsID}/modalites-livraison/type-livraison`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Type_Livraisons: Type_Livraison[] = await res.json()
            setType_Livraisons(Type_Livraisons)
        }

        fetchType_Livraisons()
    }, [params.donsID])

    return (
        <>
            <div className={style.page}>
                <div className={style.croixID}>
                    <h1 className={style.lg1}>Types de livraisons</h1>
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
                    items={Type_Livraisons.map(typeLivraison => ({
                        value1: typeLivraison.id.toString(),
                        value2: typeLivraison.id.toString(),
                        value3: typeLivraison.label,
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `../../../../api/dons/${params.donsID}/modalites-livraison/type-livraison`,
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
                            url={`../../../../api/dons/${params.donsID}/modalites-livraison/type-livraison`}
                            fields={[
                                {
                                    id: 'code_type_livraison',
                                    type: 'input',
                                    value: null,
                                    required: true,
                                    maxLength: 3,
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

export default withAuthorization(Type_LivraisonsPage, ['AD', 'PR'])
