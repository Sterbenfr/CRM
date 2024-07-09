'use client'
import { useEffect, useState } from 'react'
import List from '../../../../../../components/list'
import { Pagination } from '@/components/pagination'
import withAuthorization from '@/components/withAuthorization'
import PopUp from '@/components/popUp'
import style from '../../../../../../styles/components.module.css'

export interface Contact {
    code_entite: number
    code_contact: number
    civilite: string
    nom: string
    prenom: string
    photo: Blob
    fonction: string
    service: string
    numero_fixe: string
    numero_portable: string
    adresse_mail: string
    commentaires: string
    date_arret_contact: Date
}

function ContactsPage({
    params,
}: {
    params: { societeID: string; entiteID: string }
}) {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [civilite, setCivilite] = useState('MAD')

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    const handleCivilite = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCivilite(event.target.value)
    }

    useEffect(() => {
        const fetchContacts = async () => {
            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}/contact?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Contact[]; total: number } =
                await res.json()
            setContacts(data)
            setTotalItems(total) // set the total items
        }

        fetchContacts()
    }, [params.societeID, params.entiteID, page, itemsPerPage])

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
                <h1 className={style.lg}>Contacts</h1>
                <List
                    items={contacts.map(contact => ({
                        value1: contact.code_contact.toString(),
                        value2: contact.nom,
                        value3: contact.numero_fixe,
                        value4: contact.numero_portable,
                        value5: contact.adresse_mail,
                        value6:
                            contact.date_arret_contact == null
                                ? ''
                                : contact.date_arret_contact
                                      .toString()
                                      .split('T')[0],
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}/contact`,
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
                            url={`http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}/contact`}
                            fields={[
                                {
                                    id: 'code_entite',
                                    type: 'input',
                                    value: params.entiteID,
                                    disabled: true,
                                    required: true,
                                },
                                {
                                    id: 'civilite',
                                    type: 'select',
                                    value: civilite,
                                    url: `../.././../../../../api/select/genre`,
                                    onChange: handleCivilite,
                                },
                                {
                                    id: 'nom',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: Dupont',
                                    maxLength: 20,
                                },
                                {
                                    id: 'prenom',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: Corrine',
                                    maxLength: 20,
                                },
                                {
                                    id: 'photo',
                                    type: 'file',
                                    value: null,
                                }, //type blob
                                {
                                    id: 'fonction',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: Assistante',
                                    maxLength: 30,
                                }, // a voir si select
                                {
                                    id: 'service',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: Ressources Humaines',
                                    maxLength: 30,
                                },
                                {
                                    id: 'numero_fixe',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: 0634167452',
                                },
                                {
                                    id: 'numero_portable',
                                    type: 'input',
                                    value: null,
                                    placeholder: 'Exemple: 0634164183',
                                },
                                {
                                    id: 'adresse_mail',
                                    type: 'input',
                                    value: null,
                                    placeholder:
                                        'Exemple: Corrine.dupont@gmail.com',
                                },
                                {
                                    id: 'commentaires',
                                    type: 'input',
                                    value: null,
                                    placeholder:
                                        'Exemple: Corrine Dupont habite dunkerque',
                                    maxLength: 200,
                                },
                                {
                                    id: 'date_arret_contact',
                                    type: 'date',
                                    value: '',
                                },
                            ]}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default withAuthorization(ContactsPage, ['AD', 'PR'])
