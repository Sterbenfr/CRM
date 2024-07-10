'use client'
import { useEffect, useState } from 'react'
import List from '../../../../../components/list'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../../styles/components.module.css'

export interface Frequence_cerfa {
    id: string
    label: string
}

function Frequences_cerfaPage({ params }: { params: { societeID: string } }) {
    const [Frequences_cerfa, setFrequences_cerfa] = useState<Frequence_cerfa[]>(
        [],
    )

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchFrequences_cerfa = async () => {
            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}/entite/type-frequences-cerfa`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Frequences_cerfa: Frequence_cerfa[] = await res.json()
            setFrequences_cerfa(Frequences_cerfa)
        }

        fetchFrequences_cerfa()
    }, [params.societeID])

    return (
        <>
            <div className={style.page}>
                <h1 className={style.lg}>Types de fréquences cerfa</h1>
                <List
                    items={Frequences_cerfa.map(TypesFrequences_cerfa => ({
                        value1: TypesFrequences_cerfa.id,
                        value2: TypesFrequences_cerfa.id,
                        value3: TypesFrequences_cerfa.label,
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `http://localhost:3000/api/societe/${params.societeID}/entite/type-frequences-cerfa`,
                    }}
                />
                {isPopUpOpen && (
                    <PopUp
                        onClose={handleClose}
                        url={`http://localhost:3000/api/societe/${params.societeID}/entite/type-frequences-cerfa`}
                        fields={[
                            {
                                id: 'code_type_frequences_cerfa',
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
                )}
            </div>
        </>
    )
}

export default withAuthorization(Frequences_cerfaPage, ['AD', 'PR'])
