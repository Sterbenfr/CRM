'use client'
import { useEffect, useState, useCallback } from 'react'
import List from '@/components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../styles/components.module.css'
import TypesButtons from '@/components/TypesButtons'
import Image from 'next/image'

export interface Interlocuteurs {
    code_interlocuteur: number
    civilite: string
    nom: string
    prenom: string
    tel_perso: string
    mail: string
    commentaires: string
    code_type_utilisateur: number
}

function InterlocuteursPage({ params }: { params: { siteID: string } }) {
    const [Interlocuteurs, setInterlocuteurs] = useState<Interlocuteurs[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [search, setSearch] = useState<Interlocuteurs[]>([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const [civilite, setCivilite] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [telPerso, setTelPerso] = useState('')
    const [mail, setMail] = useState('')
    const [commentaires, setCommentaires] = useState('')
    const [codeTypeUtilisateur, setCodeTypeUtilisateur] = useState('')

    const [fields, setFields] = useState<
        {
            id: string
            type: FieldType
            value: string | null
            placeholder?: string
            url?: string
            createURL?: string
            required?: boolean
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[]
    >([])

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    const handleCiviliteChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCivilite(event.target.value)
    }

    const handleCodeTypeUtilisateurChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeTypeUtilisateur(event.target.value)
    }

    const handleNomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNom(event.target.value)
    }

    const handlePrenomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrenom(event.target.value)
    }

    const handleTelPersoChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setTelPerso(event.target.value)
    }

    const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMail(event.target.value)
    }

    const handleCommentairesChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCommentaires(event.target.value)
    }

    type FieldType =
        | 'number'
        | 'search'
        | 'date'
        | 'select'
        | 'input'
        | 'file'
        | 'checkbox'

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
                id: 'code_site',
                type: 'input',
                value: params.siteID,
                disabled: true,
                required: true,
            },
            {
                id: 'civilite',
                type: 'select',
                value: civilite,
                url: `../../../../../api/select/genre`,
                required: true,
                onChange: handleCiviliteChange,
            },
            {
                id: 'nom',
                type: 'input',
                value: nom,
                maxLength: 20,
                required: true,
                placeholder: 'Exemple: Dupont',
                onInputChange: handleNomChange,
            },
            {
                id: 'prenom',
                type: 'input',
                maxLength: 20,
                value: prenom,
                required: true,
                placeholder: 'Exemple: Jean',
                onInputChange: handlePrenomChange,
            },

            {
                id: 'code_type_utilisateur',
                type: 'select',
                required: true,
                value: codeTypeUtilisateur,
                url: `../../../../../api/select/utilisateurs`,
                onChange: handleCodeTypeUtilisateurChange,
            },
            {
                id: 'tel_perso',
                type: 'number',
                value: telPerso,
                maxLength: 12,
                placeholder: 'Exemple: 0601020304',
                required: true,
                onInputChange: handleTelPersoChange,
            }, // soit le tel soit le mail pas rien
            {
                id: 'mail',
                type: 'input',
                value: mail,
                maxLength: 50,
                placeholder: 'Exemple: Jean.dupont@gmail.com',
                required: true,
                onInputChange: handleMailChange,
            },
            {
                id: 'commentaires',
                type: 'input',
                maxLength: 200,
                value: commentaires,
                placeholder: 'Exemple: Manutentionnaire de Dunkerque',
                onInputChange: handleCommentairesChange,
            },
        ]

        if (fields[6].value !== '') {
            fields[7].required = false
        } else if (fields[7].value !== '') {
            fields[6].required = false
        }

        return fields
    }, [
        civilite,
        nom,
        prenom,
        telPerso,
        mail,
        commentaires,
        codeTypeUtilisateur,
        params.siteID,
    ])

    useEffect(() => {
        const fetchInterlocuteurs = async () => {
            const res = await fetch(
                `../../../api/sites/${params.siteID}/interlocuteurs?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Interlocuteurs[]; total: number } =
                await res.json()
            setInterlocuteurs(data)
            setTotalItems(total) // set the total items
            setFields(generateFields())
        }

        const fetchSearchInterlocuteurs = async () => {
            if (search.length === 0) {
                const res = await fetch(
                    `../../../api/sites/${params.siteID}/interlocuteurs`,
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const { data }: { data: Interlocuteurs[] } = await res.json()
                setSearch(data)
            }
        }

        fetchInterlocuteurs()
        fetchSearchInterlocuteurs()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, itemsPerPage, params.siteID, generateFields])

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
                    <h1 className={style.lg1}>Interlocuteurs</h1>
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
                    items={Interlocuteurs.map(user => ({
                        value1: user.code_interlocuteur.toString(),
                        value2:
                            user.civilite == 'M.'
                                ? 'Monsieur'
                                : user.civilite == 'Mme'
                                  ? 'Madame'
                                  : 'Non renseigné',
                        value3: user.nom,
                        value4: user.prenom,
                        value5: user.tel_perso == '' ? '/' : user.tel_perso,
                        value6: user.mail == '' ? '/' : user.mail,
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `../../../api/sites/${params.siteID}/interlocuteurs`,
                    }}
                    attribut={{
                        att1: 'Civilité',
                        att2: 'Nom',
                        att3: 'Prénom',
                        att4: 'Téléphone',
                        att5: 'Mail',
                    }}
                    searchItems={search.map(user => ({
                        value1: user.code_interlocuteur.toString(),
                        value2:
                            user.civilite === 'M.'
                                ? 'Monsieur'
                                : user.civilite === 'Mme'
                                  ? 'Madame'
                                  : 'Non renseigné',
                        value3: user.nom,
                        value4: user.prenom,
                        value5: user.tel_perso == '' ? '/' : user.tel_perso,
                        value6: user.mail == '' ? '/' : user.mail,
                    }))}
                    pageInfos={{
                        page,
                        itemsPerPage,
                        totalItems,
                        setTotal: setTotalItems,
                    }}
                    dataExcel={Interlocuteurs}
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
                            url={`../../../api/sites/${params.siteID}/interlocuteurs`}
                            fields={fields}
                        />
                    </div>
                )}
                <TypesButtons
                    items={[
                        {
                            label: `Types d'interlocuteurs`,
                            url: 'type-interlocuteur',

                        },
                    ]}
                />
            </div>
        </>
    )
}
export default withAuthorization(InterlocuteursPage, ['AD', 'SU'])
