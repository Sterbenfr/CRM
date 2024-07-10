'use client'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import List from '../../../../../components/list'

export interface type_utilisateur {
    id: string
    label: string
}

function UtilisateursPage({ params }: { params: { siteID: string } }) {
    const [Utilisateurs, setUtilisateurs] = useState<type_utilisateur[]>([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchUtilisateurs = async () => {
            if (!params.siteID) return
            const res = await fetch(
                `http://localhost:3000/api/sites/${params.siteID}/utilisateurs/type-utilisateurs`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Utilisateurs: type_utilisateur[] = await res.json()
            setUtilisateurs(Utilisateurs)
        }

        fetchUtilisateurs()
    }, [params.siteID])

    return (
        <>
            <List
                items={Utilisateurs.map(utilisateur => ({
                    value1: utilisateur.id.toString(),
                    value2: utilisateur.id.toString(),
                    value3: utilisateur.label,
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
                    url={`http://localhost:3000/api/sites/${params.siteID}/utilisateurs/type-utilisateurs`}
                    fields={[
                        {
                            id: 'code_type_utilisateur',
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
    )
}

export default withAuthorization(UtilisateursPage, ['AD', 'PR'])
