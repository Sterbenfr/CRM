/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
import List from '../../components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import { useCallback } from 'react'
import withAuthorization from '@/components/withAuthorization'
import style from '../../styles/components.module.css'

export interface Don {
    code_Don: number
    code_Entite_donatrice: number
    date_proposition_don: Date
    code_contact_Entite_donatrice: number
    code_type_don: string
    code_type_competences: string
    code_type_produits: string
    code_mode_conservation_produits: string
    date_debut_mise_disposition: Date
    date_fin_mise_disposition: Date
    commentaires: string
    pieces_associees: Blob
    code_Utilisateur_saisie_don: number
    statut_acceptation_don: string
    date_acceptation_refus_don: Date
    type_date_acceptation_refus: string
    code_Utilisateur_accepte_refuse_don: number
    code_site_beneficiaire_don: number
    indicateur_remerciement: string
    date_remerciement: Date
}

function DonsPage() {
    const [EntiteDonatrice, setEntiteDonatrice] = useState('2')
    const [datePropositionDon, setDatePropositionDon] = useState(new Date())
    const [selectedTypeMarchandise, setSelectedTypeMarchandise] =
        useState('ALI')
    const [lastSelectedTypeDon, setLastSelectedTypeDon] = useState('')
    const [selectedTypeDon, setSelectedTypeDon] = useState(
        lastSelectedTypeDon !== '' ? lastSelectedTypeDon : 'FIN',
    )
    const [commentaires, setCommentaires] = useState('')
    const [checkboxChecked, setCheckboxChecked] = useState(false) //remerciement
    const [dateRemerciement, setDateRemerciement] = useState(new Date())

    const [Dons, setDons] = useState<Don[]>([]) // list of dons
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)
    const [fields, setFields] = useState<
        {
            id: string
            type: FieldType
            value: string | null
            placeholder?: string
            url?: string
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[]
    >([])

    const handleClose = () => {
        setIsPopUpOpen(false)
        setCheckboxChecked(false)
    }
    const handleEntiteDonatrice = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setEntiteDonatrice(event.target.value)
        console.log('italie')
    }

    const handleDatePropositionDon = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        console.log('date')
        setDatePropositionDon(new Date(event.target.value))
    }

    const handleDateRemerciement = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        console.log('date')
        setDateRemerciement(new Date(event.target.value))
    }

    const handleTypeDonChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedTypeDon(event.target.value)
    }

    const handleMarchandiseChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedTypeMarchandise(event.target.value)
    }

    const handleCommentairesChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        console.log('mais')
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
        | 'enum'

    const generateFields = useCallback(
        (
            selectedTypeDon: string,
            selectedTypeMarchandise: string,
            commentaires: string,
        ) => {
            const fields: {
                id: string
                type: FieldType
                value: string | null
                placeholder?: string
                url?: string
                onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
                onInputChange?: (
                    event: React.ChangeEvent<HTMLInputElement>,
                ) => void
            }[] = [
                {
                    id: 'code_Entite_donatrice',
                    type: 'search',
                    value: EntiteDonatrice,
                    url: '../api/select/societe/entite',
                    onInputChange: handleEntiteDonatrice,
                },
                {
                    id: 'date_proposition_don',
                    type: 'date',
                    value: datePropositionDon.toISOString().split('T')[0],
                    onInputChange: handleDatePropositionDon,
                },
                {
                    id: 'code_contact_Entite_donatrice',
                    type: 'select',
                    value: null,
                    url: `../api/select/societe/entite/${EntiteDonatrice}/contact`,
                },
                {
                    id: 'code_type_don',
                    type: 'select',
                    value: selectedTypeDon, // Use the state as the value
                    url: '../api/dons/type-don',
                    onChange: handleTypeDonChange, // Handle changes with the new function
                },
                {
                    id: 'date_debut_mise_disposition',
                    type: 'date',
                    value: null,
                },
                {
                    id: 'date_fin_mise_disposition',
                    type: 'date',
                    value: null,
                }, //depend de si date_debut_mise_disposition (pas avant stp)
                {
                    id: 'commentaires',
                    type: 'input',
                    value: commentaires,
                    placeholder: 'Don de ',
                    onInputChange: handleCommentairesChange,
                }, //exemple: Dons de chocolat
                { id: 'pieces_associees', type: 'file', value: null }, //type blob ?
                {
                    id: 'code_Utilisateur_saisie_don',
                    type: 'number',
                    value: null,
                }, // default : login
                {
                    id: 'statut_acceptation_don',
                    type: 'select',
                    value: 'B',
                    url: '../api/select/dons',
                },
                {
                    id: 'date_acceptation_refus_don',
                    type: 'date',
                    value: null,
                }, //que si status different de attente
                {
                    id: 'code_Utilisateur_accepte_refuse_don',
                    type: 'number',
                    value: null,
                }, // a voir si select
                {
                    id: 'code_site_beneficiaire_don',
                    type: 'number',
                    value: null,
                }, //y'en a trop
                {
                    id: 'indicateur_remerciement',
                    type: 'checkbox',
                    value: checkboxChecked ? 'O' : 'N',
                    onChange: () => setCheckboxChecked(!checkboxChecked),
                },
                {
                    id: 'date_remerciement',
                    type: 'date',
                    value: dateRemerciement.toISOString().split('T')[0],
                    onInputChange: handleDateRemerciement,
                },
            ]

            if (selectedTypeDon === 'SIP') {
                setLastSelectedTypeDon(selectedTypeDon)
                fields.push({
                    id: 'code_type_competences',
                    type: 'select',
                    value: '',
                    url: '../api/dons/type-competences',
                })
            }

            if (selectedTypeDon === 'MAR') {
                setLastSelectedTypeDon(selectedTypeDon)
                fields.push({
                    id: 'code_type_produits',
                    type: 'select',
                    value: '',
                    url: '../api/dons/type-produits',
                    onChange: handleMarchandiseChange,
                })
            }

            if (
                selectedTypeDon === 'MAR' &&
                selectedTypeMarchandise === 'ALI'
            ) {
                fields.push({
                    id: 'code_mode_conservation_produits',
                    type: 'select', //que si code_type_produits = alimentaire
                    value: null,
                    url: '../api/dons/type-mode-conservations-produits',
                })
            }
            if (EntiteDonatrice !== undefined && fields[2] !== undefined) {
                fields[2].url = `../api/select/societe/entite/${parseInt(
                    EntiteDonatrice,
                )}/contact`
                console.log(fields[2].url)
            }
            console.log(EntiteDonatrice)
            return fields
        },
        [
            checkboxChecked,
            EntiteDonatrice,
            commentaires,
            selectedTypeDon,
            selectedTypeMarchandise,
        ],
    )

    useEffect(() => {
        const fetchDons = async () => {
            const res = await fetch(
                `http://localhost:3000/api/dons?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Don[]; total: number } =
                await res.json()
            setDons(data)
            setTotalItems(total) // set the total items
            setFields(
                generateFields(
                    selectedTypeDon,
                    selectedTypeMarchandise,
                    commentaires,
                ),
            )
        }

        fetchDons()
    }, [
        page,
        itemsPerPage,
        selectedTypeDon,
        selectedTypeMarchandise,
        generateFields,
    ])

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleItemsPerPageChange = (newItemsPerPage: number): void => {
        setItemsPerPage(newItemsPerPage)
        setPage(1)
    }

    return (
        <>
            <div className={style.page}>
                <List
                    items={Dons.map(Don => ({
                        value1: Don.code_Don.toString(),
                        value2: Don.code_Entite_donatrice
                            ? Don.code_Entite_donatrice.toString()
                            : '',
                        value3: Don.date_proposition_don
                            .toString()
                            .split('T')[0],
                        value4: Don.commentaires ? Don.commentaires : '',
                        value5: Don.statut_acceptation_don
                            ? Don.statut_acceptation_don
                            : '',
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: 'http://localhost:3000/api/dons',
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
                            url='http://localhost:3000/api/dons'
                            fields={fields} // Use the fields state here
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default withAuthorization(DonsPage, ['AD', 'PR'])
