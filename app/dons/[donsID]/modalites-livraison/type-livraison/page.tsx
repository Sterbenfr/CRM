'use client'
import List from '../../../../../components/list'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../../styles/components.module.css'

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
                `http://localhost:3000/api/dons/${params.donsID}/modalites-livraison/type-livraison`,
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
                <h1 className={style.lg}>Types de livraisons</h1>
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
                        url: `http://localhost:3000/api/dons/${params.donsID}/modalites-livraison/type-livraison`,
                    }}
                    attribut={{
                        att1: 'Code',
                        att2: 'Libellé',
                    }}
                />
                {isPopUpOpen && (
                    <PopUp
                        onClose={handleClose}
                        url={`http://localhost:3000/api/dons/${params.donsID}/modalites-livraison/type-livraison`}
                        fields={[
                            {
                                id: 'id',
                                type: 'input',
                                value: null,
                                required: true,
                            },
                            {
                                id: 'label',
                                type: 'input',
                                value: null,
                                required: true,
                            },
                        ]}
                    />
                )}
            </div>
        </>
    )
}

export default withAuthorization(Type_LivraisonsPage, ['AD', 'PR'])
