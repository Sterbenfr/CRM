'use client'
import List from '../../../components/list'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'

export interface Produit {
    id: string
    label: string
}

function TypeProduitsPage() {
    const [Produits, setProduits] = useState<Produit[]>([])
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchProduits = async () => {
            const res = await fetch(
                'http://localhost:3000/api/dons/type-produits',
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Produits: Produit[] = await res.json()
            setProduits(Produits)
        }

        fetchProduits()
    }, [])

    return (
        <>
            <List
                items={Produits.map(typeProduit => ({
                    value1: typeProduit.id.toString(),
                    value2: typeProduit.id.toString(),
                    value3: typeProduit.label,
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
                    url='http://localhost:3000/api/dons/type-produits'
                    fields={[
                        { id: 'id', type: 'input', value: null, required: true},
                        { id: 'label', type: 'input', value: null, required: true},
                    ]}
                />
            )}
        </>
    )
}

export default withAuthorization(TypeProduitsPage, ['AD', 'PR'])
