'use client'
import List from '../../../components/list'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'

export interface TypeDon {
    id: string
    label: string
}

function TypeDonsPage() {
    const [Dons, setDons] = useState<TypeDon[]>([])
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchDons = async () => {
            const res = await fetch('http://localhost:3000/api/dons/type-don')

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Dons: TypeDon[] = await res.json()
            setDons(Dons)
        }

        fetchDons()
    }, [])

    return (
        <>
            <List
                items={Dons.map(typeDon => ({
                    value1: typeDon.id.toString(),
                    value2: typeDon.id.toString(),
                    value3: typeDon.label,
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
                    url='http://localhost:3000/api/dons/type-don'
                    fields={[
                        { id: 'id', type: 'input', value: null, required: true},
                        { id: 'label', type: 'input', value: null, required: true},
                    ]}
                />
            )}
        </>
    )
}

export default withAuthorization(TypeDonsPage, ['AD', 'PR'])
