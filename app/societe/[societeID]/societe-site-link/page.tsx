'use client'

import { useEffect, useState } from 'react'
import List from '@/components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../styles/components.module.css'

export interface ContactSociete {
    code_Societe: number
    code_type_de_Site: string
    code_site_suivi: number
    code_utilisateur_suivant: number
}

function ContactSocietePage({ params }: { params: { societeID: string } }) {
    const [contacts, setContacts] = useState<ContactSociete[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchContacts = async () => {
            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}/societe-site-link?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            const { data, total }: { data: ContactSociete[]; total: number } =
                await res.json()
            setContacts(data)
            setTotalItems(total)
        }

        fetchContacts()
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
                    items={contacts.map(contact => ({
                        value1: contact.code_Societe.toString(),
                        value2: contact.code_Societe.toString(),
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
                        url: `http://localhost:3000/api/societe/${params.societeID}/societe-site-link`,
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
                            url={`http://localhost:3000/api/societe/${params.societeID}/societe-site-link`}
                            fields={[
                                {
                                    id: 'code_Societe',
                                    type: 'search',
                                    value: null,
                                    url: '../../../../../api/select/societe/entite',
                                },
                                {
                                    id: 'code_type_de_site',
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

export default withAuthorization(ContactSocietePage, ['AD', 'PR'])
