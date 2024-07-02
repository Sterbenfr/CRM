'use client'

import { useEffect, useState } from 'react'
import List from '@/components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../../../styles/components.module.css'

export interface SuiviGroupes {
    code_Groupe: number
    code_type_de_Site: string
    code_site_suivi: number
    code_utilisateur_suivant: number
}

function SuiviGroupePage({
    params,
}: {
    params: { societeID: string; groupeID: string }
}) {
    const [SuiviGroupe, setSuiviGroupe] = useState<SuiviGroupes[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchSuiviGroupe = async () => {
            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}/groupe/${params.groupeID}/groupe-site-link?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: SuiviGroupes[]; total: number } =
                await res.json()
            setSuiviGroupe(data)
            setTotalItems(total)
        }

        fetchSuiviGroupe()
    }, [page, itemsPerPage, params])

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage)
        setPage(1)
    }

    return (
        <>
            <div className={style.page}>
                <List
                    items={SuiviGroupe.map(contact => ({
                        value1: contact.code_Groupe.toString(),
                        value2: contact.code_Groupe.toString(),
                        value3: contact.code_type_de_Site,
                        value4: contact.code_site_suivi.toString(),
                        value5: contact.code_utilisateur_suivant.toString(),
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `http://localhost:3000/api/societe/${params.societeID}/groupe/${params.groupeID}/groupe-site-link`,
                    }}
                />
                <Pagination
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    currentPage={page}
                />
                {''}
                {isPopUpOpen && (
                    <div className={style.PopUp}>
                        <PopUp
                            onClose={handleClose}
                            url={`http://localhost:3000/api/societe/${params.societeID}/entite/${params.groupeID}/groupe-site-link`}
                            fields={[
                                {
                                    id: 'code_Groupe',
                                    type: 'search',
                                    value: null,
                                    url: '../../../../../api/select/societe/groupe',
                                },
                                {
                                    id: 'code_type_de_Site',
                                    type: 'select',
                                    value: null,
                                    url: '../../../../../api/sites/type-site-types',
                                },
                                {
                                    id: 'code_site_suivi',
                                    type: 'search',
                                    value: null,
                                    url: '../../../../../api/select/sites',
                                },
                                {
                                    id: 'code_utilisateur_suivant',
                                    type: 'search',
                                    value: null,
                                    url: '../../../../../api/select/sites/utilisateurs',
                                },
                            ]}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default withAuthorization(SuiviGroupePage, ['AD', 'PR'])
