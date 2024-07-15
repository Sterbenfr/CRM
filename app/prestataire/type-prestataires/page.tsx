'use client'
import { useEffect, useState } from 'react'
import List from '@/components/list'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../styles/components.module.css'

export interface Prestataire {
    id: string
    label: string
}

function PrestatairesPage() {
    const [Prestataires, setPrestataires] = useState<Prestataire[]>([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchPrestataires = async () => {
            const res = await fetch(
                'http://localhost:3000/api/prestataire/type-prestataires',
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Prestataires: Prestataire[] = await res.json()
            setPrestataires(Prestataires)
        }

        fetchPrestataires()
    }, [])

    return (
        <>
            <div className={style.page}>
                <h1 className={style.lg}>Types de prestataires</h1>
                <List
                    items={Prestataires.map(typePrestataire => ({
                        value1: typePrestataire.id,
                        value2: typePrestataire.id,
                        value3: typePrestataire.label,
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: 'http://localhost:3000/api/prestataire/type-prestataires',
                    }}
                    attribut={{
                        att2: 'Code',
                        att3: 'Libellé',
                    }}
                />
                {isPopUpOpen && (
                    <div className={style.PopUpType}>
                        <PopUp
                            onClose={handleClose}
                            url='http://localhost:3000/api/prestataire/type-prestataires'
                            fields={[
                                {
                                    id: 'code_type_de_Prestataire',
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
export default withAuthorization(PrestatairesPage, ['AD', 'PR'])
