'use client'
import { useEffect, useState, useCallback } from 'react'
import List from '@/components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../styles/components.module.css'
import Image from 'next/image'

export interface Site_Rattachement {
    code_utilisateur: number
    code_site: number
    code_type_utilisateur: string
    date_fin_activite: Date
    name?: string
    designation_longue?: string
    libelle?: string
}

function SitesRattachementPage({ params }: { params: { siteID: string } }) {
    const [Sites_Rattachement, setSites_Rattachement] = useState<
        Site_Rattachement[]
    >([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const [codeUtilisateur, setCodeUtilisateur] = useState('')
    const [codeTypeUtilisateur, setCodeTypeUtilisateur] = useState('')
    const [dateFinActivite, setDateFinActivite] = useState<Date>()

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

    const handleCodeUtilisateurChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCodeUtilisateur(event.target.value)
    }

    const handleCodeTypeUtilisateurChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeTypeUtilisateur(event.target.value)
    }

    const handleDateFinActiviteChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDateFinActivite(new Date(event.target.value))
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
                id: 'code_utilisateur',
                type: 'search',
                value: codeUtilisateur,
                placeholder: 'Exemple: Marie Martin',
                required: true,
                url: '../../../../api/select/sites/utilisateurs',
                onInputChange: handleCodeUtilisateurChange,
            },
            {
                id: 'code_site',
                type: 'input',
                value: params.siteID,
                required: true,
                disabled: true,
            },
            {
                id: 'code_type_utilisateur',
                type: 'select',
                value: codeTypeUtilisateur,
                required: true,
                url: `../../../../api/sites/${params.siteID}/utilisateurs/type-utilisateurs`,
                onChange: handleCodeTypeUtilisateurChange,
            },
            {
                id: 'date_fin_activite',
                type: 'date',
                value:
                    dateFinActivite && !isNaN(dateFinActivite.getTime())
                        ? dateFinActivite.toISOString().split('T')[0]
                        : null,
                onInputChange: handleDateFinActiviteChange,
            },
        ]
        return fields
    }, [codeUtilisateur, codeTypeUtilisateur, dateFinActivite, params.siteID])

    useEffect(() => {
        const fetchSites_Rattachement = async () => {
            const res = await fetch(
                `../../../api/sites/${params.siteID}/user-site-link?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const {
                data,
                total,
            }: { data: Site_Rattachement[]; total: number } = await res.json()
            setSites_Rattachement(data)
            setTotalItems(total)
            setFields(generateFields())
        }

        fetchSites_Rattachement()
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
                    <h1 className={style.lg1}>Lien Site-Utilisateur</h1>
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
                    items={Sites_Rattachement.map(site => ({
                        value1: site.code_site.toString(),
                        value2: site.designation_longue
                            ? site.designation_longue
                            : '/',
                        value3: site.name ? site.name : '/',
                        value4: site.libelle ? site.libelle : '/',
                        value5: site.date_fin_activite
                            ? site.date_fin_activite.toString()
                            : '/',
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `../../../api/sites/${params.siteID}/user-site-link`,
                    }}
                    attribut={{
                        att1: 'Site',
                        att2: 'Utilisateurs du site',
                        att3: 'Type de l’utilisateur',
                        att4: "Fin d’activité de l'utilisateur",
                    }}
                    searchItems={Sites_Rattachement.map(site => ({
                        value1: site.code_site.toString(),
                        value2: site.designation_longue
                            ? site.designation_longue
                            : '',
                        value3: site.name ? site.name : '',
                        value4: site.libelle ? site.libelle : '',
                        value5: site.date_fin_activite
                            ? site.date_fin_activite.toString()
                            : '',
                    }))}
                />
                <Pagination
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    currentPage={page}
                />
                {isPopUpOpen && (
                    <div className={style.PopUpType}>
                        <PopUp
                            onClose={handleClose}
                            url={`../../../api/sites/${params.siteID}/user-site-link`}
                            fields={fields}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default withAuthorization(SitesRattachementPage, ['AD', 'SU'])
