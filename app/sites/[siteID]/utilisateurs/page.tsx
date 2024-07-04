'use client'
import { useEffect, useState } from 'react'
import List from '@/components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../styles/components.module.css'

export interface Utilisateurs {
    code_utilisateur: number
    civilite: string
    nom: string
    prenom: string
    tel_perso: string
    mail_restos_du_coeur: string
    commentaires: string
    password: string
    code_type_utilisateur: number
}

function UtilisateursPage({ params }: { params: { siteID: string } }) {
    const [Utilisateurs, setUtilisateurs] = useState<Utilisateurs[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchUtilisateurs = async () => {
            const res = await fetch(
                `http://localhost:3000/api/sites/${params.siteID}/utilisateurs?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Utilisateurs[]; total: number } =
                await res.json()
            setUtilisateurs(data)
            setTotalItems(total) // set the total items
        }

        fetchUtilisateurs()
    }, [page, itemsPerPage, params.siteID])

    // add a function to handle page changes
    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage)
        setPage(1) // reset page to 1 when items per page changes
    }

    return (
        <>
            <div className={style.page}>
                <h1 className={style.lg}>Utilisateurs</h1>
                <List
                    items={Utilisateurs.map(user => ({
                        value1: user.code_utilisateur.toString(),
                        value2: user.civilite,
                        value3: user.nom,
                        value4: user.prenom,
                        value5: user.tel_perso,
                        value6: user.mail_restos_du_coeur,
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `http://localhost:3000/api/sites/${params.siteID}/utilisateurs`,
                    }}
                />
                <Pagination
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange} // pass the new prop here
                    totalItems={totalItems} // use the total items from the state
                    itemsPerPage={itemsPerPage}
                    currentPage={page}
                />{' '}
                {isPopUpOpen && (
                    <div className={style.PopUp}>
                        <PopUp
                            onClose={handleClose}
                            url={`http://localhost:3000/api/sites/${params.siteID}/utilisateurs`}
                            fields={[
                                {
                                    id: 'civilite',
                                    type: 'select',
                                    value: 'Madame',
                                    url: `../../../../../api/select/genre`,
                                    required: true,
                                },
                                {
                                    id: 'nom',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: Dupont',
                                },
                                {
                                    id: 'prenom',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: Jean',
                                },
                                {
                                    id: 'tel_perso',
                                    type: 'number',
                                    value: null,
                                    placeholder: 'Exemple: 0601020304',
                                },
                                {
                                    id: 'mail_restos_du_coeur',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: Jean.dupont@gmail.com',
                                },
                                {
                                    id: 'commentaires',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: Manutentionnaire de Dunkerque',
                                },
                                {
                                    id: 'password',
                                    type: 'password',
                                    value: null,
                                    placeholder: 'Exemple: France2024!',
                                },
                                {
                                    id: 'code_type_utilisateur',
                                    type: 'select',
                                    value: 'AD',
                                    url: `../../../../../api/select/utilisateurs`,
                                },
                            ]}
                        />
                    </div>
                )}
            </div>
        </>
    )
}
export default withAuthorization(UtilisateursPage, ['AD', 'PR'])
