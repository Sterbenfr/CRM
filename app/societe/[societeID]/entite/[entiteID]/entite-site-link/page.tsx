'use client'

import { useEffect, useState, useCallback } from 'react'
import List from '@/components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../../../styles/components.module.css'
import Image from 'next/image'

export interface ContactEntite {
    code_entite: number
    code_type_site: string
    code_site_suivi: number
    code_utilisateur_suivant: number
    raison_sociale?: string
    libelle?: string
    designation_longue?: string
    name?: string
}

function ContactEntitePage({
    params,
}: {
    params: { societeID: string; entiteID: string }
}) {
    const [contacts, setContacts] = useState<ContactEntite[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [codeTypeDeSite, setCodeTypeDeSite] = useState('AD')
    const [codeSiteSuivi, setCodeSiteSuivi] = useState('')
    const [codeUtilisateurSuivant, setCodeUtilisateurSuivant] = useState('')

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
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
                id: 'code_entite',
                type: 'input',
                value: params.entiteID,
                required: true,
                disabled: true,
            },
            {
                id: 'code_type_site',
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
                placeholder: 'Exemple: Entrepôt Principal',
                url: '../../../../../api/select/sites',
                onInputChange: handleCodeSiteSuiviChange,
            },
            {
                id: 'code_utilisateur_suivant',
                type: 'search',
                value: codeUtilisateurSuivant,
                required: true,
                placeholder: 'Exemple: Marie Martin',
                url: '../../../../../api/select/sites/utilisateurs',
                onInputChange: handleCodeUtilisateurSuivantChange,
            },
        ]
        return fields
    }, [codeTypeDeSite, codeSiteSuivi, codeUtilisateurSuivant, params.entiteID])

    useEffect(() => {
        const fetchContacts = async () => {
            const res = await fetch(
                `../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/entite-site-link?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            const { data, total }: { data: ContactEntite[]; total: number } =
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
                    <h1 className={style.lg1}>Lien Site-Entité</h1>
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
                        value1: contact.code_entite.toString(),
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
                        url: `../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/entite-site-link`,
                    }}
                    attribut={{
                        att1: 'Entité',
                        att2: 'Type du site',
                        att3: "Site suivant l'entité",
                        att4: 'Utilisateur suivant l’entité',
                    }}
                    searchItems={contacts.map(contact => ({
                        value1: contact.code_entite.toString(),
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
                            url={`../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/entite-site-link`}
                            fields={fields}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default withAuthorization(ContactEntitePage, ['AD', 'PR'])
