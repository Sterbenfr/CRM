'use client'
import List from '../../../components/list'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../styles/components.module.css'
import Image from 'next/image'

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
            const res = await fetch('../../api/dons/type-don')

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
                <div className={style.croixID}>
                    <h1 className={style.lg1}>Types de dons</h1>
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
                        url: '../../api/dons/type-don',
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
                            url='../../api/dons/type-don'
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
