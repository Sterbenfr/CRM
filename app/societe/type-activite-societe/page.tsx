'use client'
import { useEffect, useState } from 'react'
import List from '../../../components/list'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../styles/components.module.css'
import Image from 'next/image'

export interface TypeActiviteSociete {
    id: string
    label: string
}

function TypesActiviteSocietesPage() {
    const [TypesActiviteSociete, setTypesActiviteSociete] = useState<
        TypeActiviteSociete[]
    >([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchTypesActiviteSociete = async () => {
            const res = await fetch(
                'http://localhost:3000/api/societe/type-activite-societe',
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const TypesActiviteSociete: TypeActiviteSociete[] = await res.json()
            setTypesActiviteSociete(TypesActiviteSociete)
        }

        fetchTypesActiviteSociete()
    }, [])

    return (
        <>
            <div className={style.page}>
                <div className={style.croixID}>
                    <h1 className={style.lg1}>
                        Types d&apos;activité de la société
                    </h1>
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
                    items={TypesActiviteSociete.map(TypeActiviteSociete => ({
                        value1: TypeActiviteSociete.id,
                        value2: TypeActiviteSociete.id,
                        value3: TypeActiviteSociete.label,
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: 'http://localhost:3000/api/societe/type-activite-societe',
                    }}
                    attribut={{
                        att1: 'Code',
                        att2: 'Libellé',
                    }}
                />
                {''}
                {isPopUpOpen && (
                    <div className={style.PopUpType}>
                        <PopUp
                            onClose={handleClose}
                            url='http://localhost:3000/api/societe/type-activite-societe'
                            fields={[
                                {
                                    id: 'code',
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
export default withAuthorization(TypesActiviteSocietesPage, ['AD', 'PR'])
