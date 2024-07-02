'use client'
import { useEffect, useState } from 'react'
import List from '../../../../components/list'
import { Pagination } from '@/components/pagination'
import withAuthorization from '@/components/withAuthorization'
import PopUp from '@/components/popUp'
import style from '../../../../styles/components.module.css'

export interface Entite {
    code_entite: number
    raison_sociale: string
    nom_commercial: string
    logo: Blob
    siret: string
    code_ape: string
    code_rna: string
    code_cee: string
    code_societe_appartenance: number
    adresse: string
    telephone: string
    mail: string
    site_internet: string
    commentaires: string
    code_type_entite: string
    code_type_don: string
    code_type_produit: string
    code_type_competence: string
    commentaires_logistique: string
    presence_quai: string
    pieces_associees: Blob
    cerfa: string
    code_frequence_cerfa: string
    date_arret_activite: string
}

function EntitesPage({ params }: { params: { societeID: string } }) {
    const [Entites, setEntite] = useState<Entite[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchEntite = async () => {
            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}/entite?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Entite[]; total: number } =
                await res.json()
            setEntite(data)
            setTotalItems(total) // set the total items
        }

        fetchEntite()
    }, [params.societeID, page, itemsPerPage])

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
                <h1 className={style.lg}>Entité</h1>
                <List
                    items={Entites.map(entite => ({
                        value1: entite.code_entite.toString(),
                        value2: entite.raison_sociale,
                        value3: entite.telephone,
                        value4: entite.mail,
                        value5: entite.adresse,
                        value6:
                            entite.date_arret_activite == null
                                ? ''
                                : entite.date_arret_activite
                                      .toString()
                                      .split('T')[0],
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `http://localhost:3000/api/societe/${params.societeID}/entite`,
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
                            url={`http://localhost:3000/api/societe/${params.societeID}/entite`}
                            fields={[
                                {
                                    id: 'raison_sociale',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'nom_commercial',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'logo',
                                    type: 'file',
                                    value: null,
                                },
                                {
                                    id: 'Siret',
                                    type: 'number',
                                    value: null,
                                },
                                {
                                    id: 'code_ape',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'code_rna',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'code_cee',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'code_societe_appartenance',
                                    type: 'number',
                                    value: null,
                                },
                                {
                                    id: 'adresse',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'telephone',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'mail',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'site_internet',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'commentaires',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'code_type_entite',
                                    type: 'select',
                                    value: null,
                                    url: `../../api/societe/${params.societeID}/entite/type-entites`,
                                },
                                {
                                    id: 'code_type_don',
                                    type: 'select',
                                    value: null,
                                    url: `../../api/dons/type-don`,
                                },
                                {
                                    id: 'code_type_produit',
                                    type: 'select',
                                    value: null,
                                    url: `../../api/dons/type-produits`,
                                },
                                {
                                    id: 'code_type_competence',
                                    type: 'select',
                                    value: null,
                                    url: `../../api/dons/type-competences`,
                                },
                                {
                                    id: 'commentaires_logistique',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'presence_quai',
                                    type: 'checkbox',
                                    value: false,
                                },
                                {
                                    id: 'pieces_associees',
                                    type: 'file',
                                    value: null,
                                },
                                {
                                    id: 'mail_contact_prestataire',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'cerfa',
                                    type: 'checkbox',
                                    value: false,
                                },
                                {
                                    id: 'code_frequence_cerfa',
                                    type: 'select',
                                    value: null,
                                    url: `../../api/societe/${params.societeID}/entite/type-frequences-cerfa`,
                                },
                                {
                                    id: 'date_arret_activite',
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

export default withAuthorization(EntitesPage, ['AD', 'PR'])
