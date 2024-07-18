'use client'

import { useEffect, useState, useCallback } from 'react'
import List from '@/components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../styles/components.module.css'
import Image from 'next/image'

export interface ContactSociete {
    code_Societe: number
    code_type_de_Site: string
    code_site_suivi: number
    code_utilisateur_suivant: number
    raison_sociale?: string
    libelle?: string
    designation_longue?: string
    name?: string
}

function ContactSocietePage({ params }: { params: { societeID: string } }) {
    const [contacts, setContacts] = useState<ContactSociete[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [codeTypeDeSite, setCodeTypeDeSite] = useState('')
    const [codeSiteSuivi, setCodeSiteSuivi] = useState('')
    const [codeUtilisateurSuivant, setCodeUtilisateurSuivant] = useState('')

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

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

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    const handleCodeTypeDeSiteChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeTypeDeSite(event.target.value)
    }

    const handleCodeSiteSuiviChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCodeSiteSuivi(event.target.value)
    }

    const handleCodeUtilisateurSuivantChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCodeUtilisateurSuivant(event.target.value)
    }

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
                id: 'code_Societe',
                type: 'input',
                value: params.societeID,
                required: true,
                disabled: true,
            },
            {
                id: 'code_type_de_Site',
                type: 'select',
                value: codeTypeDeSite,
                required: true,
                url: '../../../../../api/sites/type-site-types',
                onChange: handleCodeTypeDeSiteChange,
            },
            {
                id: 'code_site_suivi',
                type: 'search',
                value: codeSiteSuivi,
                required: true,
                url: '../../../../../api/select/sites',
                placeholder: 'Exemple: Entrepôt Principal',
                onInputChange: handleCodeSiteSuiviChange,
            },
            {
                id: 'code_utilisateur_suivant',
                type: 'search',
                value: codeUtilisateurSuivant,
                required: true,
                url: '../../../../../api/select/sites/utilisateurs',
                placeholder: 'Exemple: Jean Dupont',
                onInputChange: handleCodeUtilisateurSuivantChange,
            },
        ]

        return fields
    }, [
        codeTypeDeSite,
        codeSiteSuivi,
        codeUtilisateurSuivant,
        params.societeID,
    ])

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
            setFields(generateFields())
        }

        fetchContacts()
    }, [page, itemsPerPage, params, generateFields])

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
                <div className={style.croixID}>
                    <h1 className={style.lg1}>Lien Site-Entreprise</h1>
                    <a href='javascript:history.go(-1)' className={style.btnC}>
                        <Image
                            className={style.CR}
                            src='/IMG/Return.png'
                            height={30}
                            width={30}
                            alt='Fermer la fenêtre'
                        />
                    </a>
                </div>

                <List
                    items={contacts.map(contact => ({
                        value1: contact.code_Societe.toString(),
                        value2: contact.raison_sociale
                            ? contact.raison_sociale
                            : '/',
                        value3: contact.libelle ? contact.libelle : '/',
                        value4: contact.designation_longue
                            ? contact.designation_longue
                            : '/',
                        value5: contact.name ? contact.name : '/',
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `http://localhost:3000/api/societe/${params.societeID}/societe-site-link`,
                    }}
                    attribut={{
                        att1: 'Entreprise',
                        att2: 'Type de site',
                        att3: "Site suivant l'entreprise",
                        att4: "Utilisateur suivant l'entreprise",
                    }}
                    searchItems={contacts.map(contact => ({
                        value1: contact.code_Societe.toString(),
                        value2: contact.raison_sociale
                            ? contact.raison_sociale
                            : '',
                        value3: contact.libelle ? contact.libelle : '',
                        value4: contact.designation_longue
                            ? contact.designation_longue
                            : '',
                        value5: contact.name ? contact.name : '',
                    }))}
                    pageInfos={{
                        page,
                        itemsPerPage,
                        totalItems,
                        setTotal: setTotalItems,
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
                    <div className={style.PopUpType}>
                        <PopUp
                            onClose={handleClose}
                            url={`http://localhost:3000/api/societe/${params.societeID}/societe-site-link`}
                            fields={fields}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default withAuthorization(ContactSocietePage, ['AD', 'PR'])
