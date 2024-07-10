'use client'
import { useEffect, useState } from 'react'
import List from '../../../components/list'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'

export interface TypeActiviteSociete {
    code: string
    libelle: string
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
            <List
                items={TypesActiviteSociete.map(TypeActiviteSociete => ({
                    value1: TypeActiviteSociete.code.toString(),
                    value2: TypeActiviteSociete.libelle,
                }))}
                functions={{
                    fonc1: () => {
                        isPopUpOpen
                            ? setIsPopUpOpen(false)
                            : setIsPopUpOpen(true)
                    },
                }}
            />
            <button onClick={() => setIsPopUpOpen(true)}>Open PopUp</button>
            {isPopUpOpen && (
                <PopUp
                    onClose={handleClose}
                    url='http://localhost:3000/api/societe'
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
            )}
        </>
    )
}
export default withAuthorization(TypesActiviteSocietesPage, ['AD', 'PR'])
