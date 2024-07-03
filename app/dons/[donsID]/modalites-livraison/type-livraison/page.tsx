'use client'
import List from '../../../../../components/list'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'

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
                }}
            />
            {isPopUpOpen && (
                <PopUp
                    onClose={handleClose}
                    url={`http://localhost:3000/api/dons/${params.donsID}/modalites-livraison/type-livraison`}
                    fields={[
                        { id: 'id', type: 'input', value: null, required: true},
                        { id: 'label', type: 'input', value: null, required: true},
                    ]}
                />
            )}
        </>
    )
}

export default withAuthorization(Type_LivraisonsPage, ['AD', 'PR'])
