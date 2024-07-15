'use client'
import List from '../../../components/list'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../styles/components.module.css'

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
            <div className={style.page}>
                <h1 className={style.lg}>Types de dons</h1>
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
                        url: 'http://localhost:3000/api/dons/type-don',
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
                            url='http://localhost:3000/api/dons/type-don'
                            fields={[
                                {
                                    id: 'code_type_don',
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

export default withAuthorization(TypeDonsPage, ['AD', 'PR'])
