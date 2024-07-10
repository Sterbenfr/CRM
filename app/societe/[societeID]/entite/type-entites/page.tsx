'use client'
import { useEffect, useState } from 'react'
import List from '@/components/list'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'

export interface Entite {
    code_type_entite: string
    libelle: string
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
                `http://localhost:3000/api/societe/${params.societeID}/entite/type-entites`,
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
        <div>
            <>
                <List
                    items={Entites.map(TypesEntites => ({
                        value1: TypesEntites.code_type_entite.toString(),
                        value2: TypesEntites.libelle.toString(),
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
                        url={`http://localhost:3000/api/societe/${params.societeID}/entite/type-entites`}
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
                )}
            </>
        </div>
    )
}
export default withAuthorization(EntitesPage, ['AD', 'PR'])
