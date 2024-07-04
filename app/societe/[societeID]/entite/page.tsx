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
                                    type: 'search',
                                    value: null,
                                    url: '../../api/select/societe/entite',
                                    required: true,
                                }, // pourvoir add
                                {
                                    id: 'nom_commercial',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: Alpha Corp',
                                },
                                {
                                    id: 'logo',
                                    type: 'file',
                                    value: null,
                                }, // type blob
                                {
                                    id: 'Siret',
                                    type: 'number',
                                    value: null,
                                    placeholder: 'Exemple: 15269783246918',
                                    required: true,
                                }, // if number !== 14 = pas de validation
                                {
                                    id: 'code_ape',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: 1234A',
                                }, // 4 chiffres et 1 lettre
                                {
                                    id: 'code_rna',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: W123456789',
                                }, // W + 9 chiffres
                                {
                                    id: 'code_cee',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: 123456789',
                                },
                                {
                                    id: 'code_societe_appartenance',
                                    type: 'search',
                                    value: null,
                                    url: '../../api/select/societe',
                                },
                                {
                                    id: 'adresse',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: 12 rue de la paix',
                                },
                                {
                                    id: 'telephone',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: 0123456789',
                                },
                                {
                                    id: 'mail',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: Alpha.corp@gmail.com',
                                },
                                {
                                    id: 'site_internet',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: http://www.alpha.com/',
                                },
                                {
                                    id: 'commentaires',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: Societe de service informatique',
                                },
                                {
                                    id: 'code_type_entite',
                                    type: 'select',
                                    value: null,
                                    url: `../../api/societe/${params.societeID}/entite/type-entites`,
                                }, // a voir les conditions
                                {
                                    id: 'code_type_don',
                                    type: 'select',
                                    value: null,
                                    url: `../../api/dons/type-don`,
                                },// a voir les conditions
                                {
                                    id: 'code_type_produit',
                                    type: 'select',
                                    value: null,
                                    url: `../../api/dons/type-produits`,
                                },// a voir les conditions
                                {
                                    id: 'code_type_competence',
                                    type: 'select',
                                    value: null,
                                    url: `../../api/dons/type-competences`,
                                },// a voir les conditions
                                {
                                    id: 'commentaires_logistique',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: Societe de service informatique',
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
                                }, // typz blob
                                {
                                    id: 'mail_contact_prestataire',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: prestataire.alphacorp@gmail.com',
                                },
                                {
                                    id: 'cerfa',
                                    type: 'checkbox',
                                    value: false,
                                },
                                {
                                    id: 'code_frequence_cerfa',
                                    type: 'select',
                                    value: 'ANN',
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
