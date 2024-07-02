'use client'
import { useEffect, useState } from 'react'
import List from '@/components/list'
import { Pagination } from '../../components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../styles/components.module.css'

export interface Sites {
    code_site: number
    designation_longue: string
    designation_courte: string
    adresse: string
    code_type_site: string
    date_ouverture: Date
    date_fermeture: Date
    numero_telephone: string
    adresse_mail: string
    commentaire: string
}

function SitesPage() {
    const [Sites, setSites] = useState<Sites[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchSites = async () => {
            const res = await fetch(
                `http://localhost:3000/api/sites?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Sites[]; total: number } =
                await res.json()
            setSites(data)
            setTotalItems(total) // set the total items
        }

        fetchSites()
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
                <h1 className={style.lg}>Sites</h1>
                <List
                    items={Sites.map(Sites => ({
                        value1: Sites.code_site.toString(),
                        value2: Sites.designation_longue.toString(),
                        value3: Sites.adresse.toString(),
                        value4: Sites.date_ouverture.toString().split('T')[0],
                        value5: Sites.numero_telephone.toString(),
                        value6: Sites.adresse_mail.toString(),
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: 'http://localhost:3000/api/sites',
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
                            url='http://localhost:3000/api/sites'
                            fields={[
                                {
                                    id: 'designation_longue',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'designation_courte',
                                    type: 'input',
                                    value: null,
                                },
                                { id: 'adresse', type: 'input', value: null },
                                {
                                    id: 'code_type_site',
                                    type: 'select',
                                    value: null,
                                    url: '../api/sites/type-site-types',
                                },
                                {
                                    id: 'date_ouverture',
                                    type: 'date',
                                    value: null,
                                },
                                {
                                    id: 'date_fermeture',
                                    type: 'date',
                                    value: null,
                                },
                                {
                                    id: 'numero_telephone',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'adresse_mail',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'commentaires',
                                    type: 'input',
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

export default withAuthorization(SitesPage, ['AD', 'PR'])
