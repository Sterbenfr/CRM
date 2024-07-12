'use client'
import List from '../../../components/list'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../styles/components.module.css'

export interface Competence {
    id: string
    label: string
}

function TypeCompetencePage() {
    const [competences, setCompetence] = useState<Competence[]>([])
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchCompetences = async () => {
            const res = await fetch(
                'http://localhost:3000/api/dons/type-competences',
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const competences: Competence[] = await res.json()
            setCompetence(competences)
        }

        fetchCompetences()
    }, [])

    return (
        <>
            <div className={style.page}>
                <h1 className={style.lg}>Types de compétences</h1>
                <List
                    items={competences.map(typeCompetence => ({
                        value1: typeCompetence.id.toString(),
                        value2: typeCompetence.id.toString(),
                        value3: typeCompetence.label,
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: 'http://localhost:3000/api/dons/type-competences',
                    }}
                    attribut={{
                        att1: 'Code',
                        att2: 'Libellé',
                    }}
                />
                {isPopUpOpen && (
                    <PopUp
                        onClose={handleClose}
                        url='http://localhost:3000/api/dons/type-competences'
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
export default withAuthorization(TypeCompetencePage, ['AD', 'PR'])
