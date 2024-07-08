'use client'
import { useEffect, useState } from 'react'
import List from '../../components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../styles/components.module.css'

export interface Societe {
    code_Societe: number
    raison_sociale: string
    nom_commercial: string
    Logo: Blob
    site_Web: string
    Siren: string
    code_type_activite_Societe: string
    commentaires: string
    code_Groupe_appartenance: number
    date_arret_activite_Societe: Date
}

function SocietesPage() {
    const [Societes, setSocietes] = useState<Societe[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const [codeTypeActiviteSociete, setCodeTypeActiviteSociete] =
        useState('ADM')

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    const handleCodeTypeActiviteSocieteChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeTypeActiviteSociete(event.target.value)
    }

    useEffect(() => {
        const fetchSocietes = async () => {
            const res = await fetch(
                `http://localhost:3000/api/societe?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Societe[]; total: number } =
                await res.json()
            setSocietes(data)
            setTotalItems(total) // set the total items
        }

        fetchSocietes()
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
                <h1 className={style.lg}>Entreprise</h1>
                <List
                    items={Societes.map(Societe => ({
                        value1: Societe.code_Societe.toString(),
                        value2: Societe.raison_sociale,
                        value3: Societe.site_Web,
                        value4: Societe.commentaires,
                        value5:
                            Societe.date_arret_activite_Societe == null
                                ? ''
                                : Societe.date_arret_activite_Societe
                                      .toString()
                                      .split('T')[0],
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: 'http://localhost:3000/api/societe',
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
                            url='http://localhost:3000/api/societe'
                            fields={[
                                {
                                    id: 'raison_sociale',
                                    type: 'input',
                                    value: '',
                                    placeholder: 'Exemple: Alpha',
                                    required: true,
                                },
                                {
                                    id: 'nom_commercial',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: Nom commercial',
                                }, // a voir si utile
                                {
                                    id: 'Logo',
                                    type: 'file',
                                    value: null,
                                }, // type blob
                                {
                                    id: 'site_Web',
                                    type: 'input',
                                    value: null,
                                    placeholder:
                                        'Exemple: http://www.alpha.com/',
                                },
                                {
                                    id: 'Siren',
                                    type: 'number',
                                    value: null,
                                    placeholder: 'Exemple: 453684259',
                                    required: true,
                                }, // if number !== 9 = pas de validation
                                {
                                    id: 'code_type_activite_Societe',
                                    type: 'select',
                                    value: codeTypeActiviteSociete,
                                    url: '../api/societe/type-activite-societe',
                                    onChange:
                                        handleCodeTypeActiviteSocieteChange,
                                },
                                {
                                    id: 'commentaires',
                                    type: 'input',
                                    value: null,
                                    placeholder:
                                        'Exemple: Societe de service informatique',
                                },
                                {
                                    id: 'code_Groupe_appartenance',
                                    type: 'search',
                                    value: null,
                                    url: '../api/select/societe/groupe',
                                },
                                {
                                    id: 'date_arret_activite_Societe',
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
export default withAuthorization(SocietesPage, ['AD', 'PR'])
