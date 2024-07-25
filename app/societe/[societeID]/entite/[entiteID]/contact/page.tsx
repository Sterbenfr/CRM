'use client'
import { useEffect, useState, useCallback } from 'react'
import List from '../../../../../../components/list'
import { Pagination } from '@/components/pagination'
import withAuthorization from '@/components/withAuthorization'
import PopUp from '@/components/popUp'
import style from '../../../../../../styles/components.module.css'
import Image from 'next/image'

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
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [search, setSearch] = useState<Contact[]>([])

    const [civilite, setCivilite] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [fonction, setFonction] = useState('')
    const [service, setService] = useState('')
    const [numeroFixe, setNumeroFixe] = useState('')
    const [numeroPortable, setNumeroPortable] = useState('')
    const [adresseMail, setAdresseMail] = useState('')
    const [commentaires, setCommentaires] = useState('')
    const [dateArretContact, setDateArretContact] = useState<Date>()

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    const handleCivilite = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCivilite(event.target.value)
    }

    const handleNom = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNom(event.target.value)
    }

    const handlePrenom = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrenom(event.target.value)
    }

    const handleFonction = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFonction(event.target.value)
    }

    const handleService = (event: React.ChangeEvent<HTMLInputElement>) => {
        setService(event.target.value)
    }

    const handleNumeroFixe = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumeroFixe(event.target.value)
    }

    const handleNumeroPortable = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNumeroPortable(event.target.value)
    }

    const handleAdresseMail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdresseMail(event.target.value)
    }

    const handleCommentaires = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentaires(event.target.value)
    }

    const handleDateArretContact = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDateArretContact(new Date(event.target.value))
    }

    const [fields, setFields] = useState<
        {
            id: string
            type: FieldType
            value: string | null
            placeholder?: string
            url?: string
            createURL?: string
            required?: boolean
            maxLength?: number
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[]
    >([])

    type FieldType =
        | 'number'
        | 'search'
        | 'date'
        | 'select'
        | 'input'
        | 'file'
        | 'checkbox'
        | 'enum'

    const generateFields = useCallback(() => {
        const fields: {
            id: string
            type: FieldType
            value: string | null
            placeholder?: string
            url?: string
            createURL?: string
            required?: boolean
            maxLength?: number
            disabled?: boolean
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[] = [
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
                required: true,
                onChange: handleCivilite,
            },
            {
                id: 'nom',
                type: 'input',
                value: nom,
                placeholder: 'Exemple: Dupont',
                maxLength: 20,
                required: true,
                onInputChange: handleNom,
            },
            {
                id: 'prenom',
                type: 'input',
                value: prenom,
                placeholder: 'Exemple: Corrine',
                maxLength: 20,
                required: true,
                onInputChange: handlePrenom,
            },
            {
                id: 'numero_portable',
                type: 'number',
                value: numeroPortable,
                placeholder: 'Exemple: 0634164183',
                maxLength: 12,
                required: true,
                onInputChange: handleNumeroPortable,
            },
            {
                id: 'adresse_mail',
                type: 'input',
                value: adresseMail,
                placeholder: 'Exemple: Corrine.dupont@gmail.com',
                maxLength: 200,
                required: true,
                onInputChange: handleAdresseMail,
            },
            {
                id: 'photo',
                type: 'file',
                value: null,
            }, //type blob
            {
                id: 'fonction',
                type: 'input',
                value: fonction,
                placeholder: 'Exemple: Assistante',
                maxLength: 30,
                onInputChange: handleFonction,
            }, // a voir si select
            {
                id: 'service',
                type: 'input',
                value: service,
                placeholder: 'Exemple: Ressources Humaines',
                maxLength: 30,
                onInputChange: handleService,
            },
            {
                id: 'numero_fixe',
                type: 'number',
                value: numeroFixe,
                placeholder: 'Exemple: 0634167452',
                maxLength: 12,
                onInputChange: handleNumeroFixe,
            },
            {
                id: 'commentaires',
                type: 'input',
                value: commentaires,
                placeholder: 'Exemple: Corrine Dupont habite dunkerque',
                maxLength: 200,
                onInputChange: handleCommentaires,
            },
            {
                id: 'date_arret_contact',
                type: 'date',
                value:
                    dateArretContact && !isNaN(dateArretContact.getTime())
                        ? dateArretContact.toISOString().split('T')[0]
                        : null,
                onInputChange: handleDateArretContact,
            },
        ]

        if (fields[4].value !== '') {
            fields[5].required = false
        } else if (fields[5].value !== '') {
            fields[4].required = false
        }

        return fields
    }, [
        params.entiteID,
        civilite,
        nom,
        prenom,
        fonction,
        service,
        numeroFixe,
        numeroPortable,
        adresseMail,
        commentaires,
        dateArretContact,
    ])

    useEffect(() => {
        const fetchContacts = async () => {
            const res = await fetch(
                `../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/contact?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Contact[]; total: number } =
                await res.json()
            setContacts(data)
            setTotalItems(total) // set the total items
            setFields(generateFields())
        }

        const fetchSearchContacts = async () => {
            if (search.length === 0) {
                const res = await fetch(
                    `../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/contact`,
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const { data }: { data: Contact[] } = await res.json()
                setSearch(data)
            }
        }

        fetchContacts()
        fetchSearchContacts()
    }, [
        params.societeID,
        params.entiteID,
        page,
        itemsPerPage,
        search,
        generateFields,
    ])

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
                <div className={style.croixID}>
                    <h1 className={style.lg1}>Contacts</h1>
                    <a href='javascript:history.go(-1)' className={style.btnC}>
                        <Image
                            className={style.CR}
                            src='/IMG/return.svg'
                            height={30}
                            width={30}
                            alt='Fermer la fenêtre'
                        />
                    </a>
                </div>

                <List
                    items={contacts.map(contact => ({
                        value1: contact.code_contact.toString(),
                        value2: contact.nom,
                        value3: contact.prenom,
                        value4: contact.fonction == '' ? '/' : contact.fonction,
                        value5:
                            contact.numero_portable == ''
                                ? '/'
                                : contact.numero_portable,
                        value6:
                            contact.adresse_mail == ''
                                ? '/'
                                : contact.adresse_mail,
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/contact`,
                    }}
                    attribut={{
                        att1: 'Nom',
                        att2: 'Prénom',
                        att3: 'Fonction',
                        att4: 'Numéro de portable',
                        att5: 'Adresse mail',
                    }}
                    searchItems={search.map(contact => ({
                        value1: contact.code_contact.toString(),
                        value2: contact.nom,
                        value3: contact.prenom,
                        value4: contact.fonction == '' ? '/' : contact.fonction,
                        value5:
                            contact.numero_portable == ''
                                ? '/'
                                : contact.numero_portable,
                        value6:
                            contact.adresse_mail == ''
                                ? '/'
                                : contact.adresse_mail,
                    }))}
                    pageInfos={{
                        page,
                        itemsPerPage,
                        totalItems,
                        setTotal: setTotalItems,
                    }}
                    dataExcel={contacts}
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
                            url={`../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/contact`}
                            fields={fields}
                            fileUrl2='../../../../../api/upload/image'
                            fileIndex2={6}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default withAuthorization(ContactsPage, ['AD', 'SU', 'AP'])
