'use client'
import { useEffect, useState } from 'react'
import List from '@/components/list'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../../styles/components.module.css'
import Image from 'next/image'

export interface Entite {
    id: string
    label: string
}

function EntitesPage({ params }: { params: { societeID: string } }) {
    const [Entites, setEntites] = useState<Entite[]>([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchEntites = async () => {
            const res = await fetch(
                `../../../../api/societe/${params.societeID}/entite/type-entites`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Entites: Entite[] = await res.json()
            setEntites(Entites)
        }

        fetchEntites()
    }, [params.societeID])

    return (
        <>
            <div className={style.page}>
                <div className={style.croixID}>
                    <h1 className={style.lg1}>Types d&apos;entités</h1>
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
                    items={Entites.map(TypesEntites => ({
                        value1: TypesEntites.id,
                        value2: TypesEntites.id,
                        value3: TypesEntites.label,
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `../../../../api/societe/${params.societeID}/entite/type-entites`,
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
                            url={`../../../../api/societe/${params.societeID}/entite/type-entites`}
                            fields={[
                                {
                                    id: 'code_type_entite',
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
export default withAuthorization(EntitesPage, ['AD', 'PR'])
