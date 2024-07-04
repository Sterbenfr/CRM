'use client'
import { useEffect, useState } from 'react'
import List from '../../components/list'
import { Pagination } from '@/components/pagination'
import withAuthorization from '@/components/withAuthorization'
import PopUp from '@/components/popUp'
import style from '../../styles/components.module.css'

export interface Prestataire {
    code_Prestataire: number
    code_type_de_Prestataire: string
    raison_sociale: string
    nom_commercial: string
    Siren: string
    Siret: string
    telephone: string
    mail: string
    adresse: string
    civilite_contact_prestataire: string
    nom_contact_prestataire: string
    prenom_contact_prestataire: string
    telephone_contact_prestataire: string
    mail_contact_prestataire: string
    commentaires: string
    date_arret_activite_du_prestataire: Date
}

function PrestatairesPage() {
    const [Prestataires, setPrestataires] = useState<Prestataire[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchDons = async () => {
            const res = await fetch(
                `http://localhost:3000/api/prestataire?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Prestataire[]; total: number } =
                await res.json()
            setPrestataires(data)
            setTotalItems(total) // set the total items
        }

        fetchDons()
    }, [page, itemsPerPage])

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
                <h1 className={style.lg}>Prestataire</h1>
                <List
                    items={Prestataires.map(Prestataire => ({
                        value1: Prestataire.code_Prestataire.toString(),
                        value2: Prestataire.raison_sociale.toString(),
                        value3: Prestataire.telephone.toString(),
                        value4: Prestataire.mail.toString(),
                        value5: Prestataire.telephone_contact_prestataire.toString(),
                        value6: Prestataire.mail_contact_prestataire.toString(),
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: 'http://localhost:3000/api/prestataire',
                    }}
                />
                <Pagination
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange} // pass the new prop here
                    totalItems={totalItems} // use the total items from the state
                    itemsPerPage={itemsPerPage}
                    currentPage={page}
                />
                {''}
                {isPopUpOpen && (
                    <div className={style.PopUp}>
                        <PopUp
                            onClose={handleClose}
                            url='http://localhost:3000/api/prestataire'
                            fields={[
                                {
                                    id: 'code_type_de_Prestataire',
                                    type: 'select',
                                    value: 'TRA',
                                    required: true,
                                    url: '../api/prestataire/type-prestataires',
                                },
                                {
                                    id: 'raison_sociale',
                                    type: 'select',
                                    value: 'Société Alpha',
                                    required: true,
                                    url: '../api/select/prestataire',
                                }, //pouvoir en ajouter une
                                {
                                    id: 'nom_commercial',
                                    type: 'input',
                                    value: null,
                                },// a voir si search
                                {
                                    id: 'Siren',
                                    type: 'number',
                                    value: null,
                                    placeholder: 'Exemple: 453684259',
                                }, // if number !== 9 = pas de validation
                                {
                                    id: 'Siret',
                                    type: 'number',
                                    value: null,
                                    placeholder: 'Exemple: 15269783246918',
                                }, // if number !== 14 = pas de validation
                                {
                                    id: 'telephone',
                                    type: 'number',
                                    placeholder: 'Exemple: 0658905910',
                                    value: null,
                                },
                                {
                                    id: 'mail',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: Prestataire.prestataire@gmail.com',
                                },
                                {
                                    id: 'adresse',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: 12 rue de la paix',
                                },
                                {
                                    id: 'civilite_contact_prestataire',
                                    type: 'select',
                                    value: null,
                                    url: '../api/select/genre',
                                },
                                {
                                    id: 'nom_contact_prestataire',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: Delacroix',
                                },
                                {
                                    id: 'prenom_contact_prestataire',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: David',
                                },
                                {
                                    id: 'telephone_contact_prestataire',
                                    type: 'number',
                                    value: null,
                                    placeholder: 'Exemple: 0658905910',
                                },
                                {
                                    id: 'mail_contact_prestataire',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: David.delacroix@gmail.com',
                                },
                                {
                                    id: 'commentaires',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: Prestataire très sérieux',
                                },
                                {
                                    id: 'date_arret_activite_du_prestataire',
                                    type: 'date',
                                    value: null,
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
