'use client'

import { useEffect, useState, useCallback } from 'react'
import List from '@/components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../../../styles/components.module.css'
import Image from 'next/image'

export interface SuiviGroupes {
    code_groupe: number
    code_type_de_Site: string
    code_site_suivi: number
    code_utilisateur_suivant: number
    nom_du_groupe?: string
    libelle?: string
    designation_longue?: string
    name?: string
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

    const [codeGroupe, setCodeGroupe] = useState('')
    const [codeTypeDeSite, setCodeTypeDeSite] = useState('AD')
    const [codeSiteSuivi, setCodeSiteSuivi] = useState('')
    const [codeUtilisateurSuivant, setCodeUtilisateurSuivant] = useState('')

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

    const handleCodeGroupeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCodeGroupe(event.target.value)
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
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[] = [
            {
                id: 'code_groupe',
                type: 'search',
                value: codeGroupe,
                placeholder: 'Exemple: Groupe Alpha',
                required: true,
                url: '../../../../../api/select/societe/groupe',
                onInputChange: handleCodeGroupeChange,
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
                placeholder: 'Exemple: Marie Martin',
                url: '../../../../../api/select/sites/utilisateurs',
                onInputChange: handleCodeUtilisateurSuivantChange,
            },
        ]

        return fields
    }, [codeGroupe, codeTypeDeSite, codeSiteSuivi, codeUtilisateurSuivant])

    useEffect(() => {
        const fetchSuiviGroupe = async () => {
            const res = await fetch(
                `../../../../../api/societe/${params.societeID}/groupe/${params.groupeID}/groupe-site-link?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: SuiviGroupes[]; total: number } =
                await res.json()
            setSuiviGroupe(data)
            setTotalItems(total)
            setFields(generateFields())
        }

        fetchSuiviGroupe()
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
                    <h1 className={style.lg1}>Lien Site-Groupe</h1>
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
                    items={SuiviGroupe.map(contact => ({
                        value1: contact.code_groupe.toString(),
                        value2: contact.nom_du_groupe
                            ? contact.nom_du_groupe
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
                        url: `../../../../../api/societe/${params.societeID}/groupe/${params.groupeID}/groupe-site-link`,
                    }}
                    attribut={{
                        att1: 'Groupe',
                        att2: 'Type du site',
                        att3: 'Site suivant le groupe',
                        att4: 'Utilisateur suivant le groupe',
                    }}
                    searchItems={SuiviGroupe.map(contact => ({
                        value1: contact.code_groupe.toString(),
                        value2: contact.code_groupe.toString(),
                        value3: contact.code_type_de_Site,
                        value4: contact.code_site_suivi.toString(),
                        value5: contact.code_utilisateur_suivant.toString(),
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
                            url={`../../../../../api/societe/${params.societeID}/groupe/${params.groupeID}/groupe-site-link`}
                            fields={fields}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default withAuthorization(SuiviGroupePage, ['AD', 'PR'])
