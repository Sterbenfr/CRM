/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState, useCallback } from 'react'
import List from '../../../../components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../styles/components.module.css'
import Image from 'next/image'
export interface Reception {
    numero_reception: number
    code_Don: number
    numero_livraison: number
    date_reception: Date
    heure_reception: string
    nombre_palettes_recues: number
    nombre_palettes_consignees_recues: number
    nombre_palettes_consignees_rendues: number
    nombre_cartons_recus: number
    poids_recu_kg: number
    produits_sur_palettes: string
    commentaires: string
    pieces_associees: Blob
}

function ReceptionsPage({ params }: { params: { donsID: string } }) {
    const [Receptions, setReceptions] = useState<Reception[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [search, setSearch] = useState<Reception[]>([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const [numeroLivraison, setNumeroLivraison] = useState('')
    const [dateReception, setDateReception] = useState(new Date())
    const [heureReception, setHeureReception] = useState('')
    const [nombrePalettesRecues, setNombrePalettesRecues] = useState('')
    const [nombrePalettesConsigneesRecues, setNombrePalettesConsigneesRecues] = useState('')
    const [nombrePalettesConsigneesRendues, setNombrePalettesConsigneesRendues] = useState('')
    const [nombreCartonsRecus, setNombreCartonsRecus] = useState('')
    const [poidsRecuKg, setPoidsRecuKg] = useState('')
    const [produitsSurPalettes, setProduitsSurPalettes] = useState(false)
    const [commentaires, setCommentaires] = useState('')
    const [piecesAssociees, setPiecesAssociees] = useState('')

    const handleClose = () => {
        setIsPopUpOpen(false)
        setProduitsSurPalettes(false)
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
            maxlength?: number
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

    const handleNumeroLivraisonChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNumeroLivraison(event.target.value)
    }

    const handleDateReceptionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDateReception(new Date(event.target.value))
    }

    const handleHeureReceptionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setHeureReception(event.target.value)
    }

    const handleNombrePalettesRecuesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNombrePalettesRecues(event.target.value)
    }

    const handleNombrePalettesConsigneesRecuesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNombrePalettesConsigneesRecues(event.target.value)
    }

    const handleNombrePalettesConsigneesRenduesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNombrePalettesConsigneesRendues(event.target.value)
    }

    const handleNombreCartonsRecusChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNombreCartonsRecus(event.target.value)
    }

    const handlePoidsRecuKgChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPoidsRecuKg(event.target.value)
    }

    const handleCommentairesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCommentaires(event.target.value)
    }

    const handlePiecesAssocieesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPiecesAssociees(event.target.value)
    }

    const handleProduitsSurPalettes = () => {
        setProduitsSurPalettes(!produitsSurPalettes)
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
            disabled?: boolean
            maxLength?: number
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[] = [
            {
                id: 'code_Don',
                type: 'input',
                value: params.donsID,
                required: true,
                disabled: true,
            },
            {
                id: 'numero_livraison',
                type: 'search',
                value: numeroLivraison,
                placeholder: 'Exemple: Don de compétences techniques - Livraison 1',
                url: `../../api/select/dons/${params.donsID}/modalites-livraison`,
                required: true,
                onInputChange: handleNumeroLivraisonChange
            },
            {
                id: 'date_reception',
                type: 'date',
                value: !isNaN(dateReception.getTime())
                    ? dateReception.toISOString().split('T')[0]
                    : null,
                required: true,
                onInputChange: handleDateReceptionChange,
            },
            {
                id: 'heure_reception',
                type: 'input',
                value: heureReception,
                placeholder: 'Exemple: 14:00:00',
                maxLength: 8,
                required: true,
                onInputChange: handleHeureReceptionChange,
            },
            {
                id: 'nombre_palettes_recues',
                type: 'number',
                value: nombrePalettesRecues,
                placeholder: 'Exemple: 10',
                onInputChange: handleNombrePalettesRecuesChange,
            },
            {
                id: 'nombre_palettes_consignees_recues',
                type: 'number',
                value: nombrePalettesConsigneesRecues,
                placeholder: 'Exemple: 11',
                onInputChange: handleNombrePalettesConsigneesRecuesChange,
            },
            {
                id: 'nombre_palettes_consignees_rendues',
                type: 'number',
                value: nombrePalettesConsigneesRendues,
                placeholder: 'Exemple: 10',
                onInputChange: handleNombrePalettesConsigneesRenduesChange,
            },
            {
                id: 'nombre_cartons_recus',
                type: 'number',
                value: nombreCartonsRecus,
                placeholder: 'Exemple: 25',
                onInputChange: handleNombreCartonsRecusChange,
            },
            {
                id: 'poids_recu_kg',
                type: 'number',
                value: poidsRecuKg,
                placeholder: 'Exemple: 165',
                onInputChange: handlePoidsRecuKgChange,
            },
            {
                id: 'produits_sur_palettes',
                type: 'checkbox',
                value: produitsSurPalettes ? 'O' : 'N',
                onInputChange: handleProduitsSurPalettes,
            },
            {
                id: 'commentaires',
                type: 'input',
                value: commentaires,
                maxLength: 200,
                placeholder: 'Exemple: Réception de 10 palettes de vêtements',
                onInputChange: handleCommentairesChange,
            },
            {
                id: 'pieces_associees',
                type: 'file',
                value: piecesAssociees,
                onInputChange: handlePiecesAssocieesChange,
            },
        ]

        if (fields[4].value === '') {
            fields[4].value = null
        }

        if (fields[5].value === '') {
            fields[5].value = null
        }

        if (fields[6].value === '') {
            fields[6].value = null
        }

        if (fields[7].value === '') {
            fields[7].value = null
        }

        if (fields[8].value === '') {
            fields[8].value = null
        }

        return fields
    }, [
        params.donsID,
        numeroLivraison,
        dateReception,
        heureReception,
        nombrePalettesRecues,
        nombrePalettesConsigneesRecues,
        nombrePalettesConsigneesRendues,
        nombreCartonsRecus,
        poidsRecuKg,
        produitsSurPalettes,
        commentaires,
        piecesAssociees,
    ])

    useEffect(() => {
        const fetchDons = async () => {
            const res = await fetch(
                `http://localhost:3000/api/dons/${params.donsID}/reception?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Reception[]; total: number } =
                await res.json()
            setReceptions(data)
            setTotalItems(total)
            setFields(generateFields())
        }

        const fetchSearchDons = async () => {
            if (search.length === 0) {
                const res = await fetch(
                    `http://localhost:3000/api/dons/${params.donsID}/reception?limit=10000`,
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const { data }: { data: Reception[] } = await res.json()
                setSearch(data)
            }
        }

        fetchDons()
        fetchSearchDons()
        
    }, [page, itemsPerPage, params.donsID, generateFields, search])

    // add a function to handle page changes
    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    
    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage)
        setPage(1) // reset page to 1 when items per page changes
    }
    console.log(Receptions)
    return (
        <>
            <div className={style.page}>
                <div className={style.croixID}>
                    <h1 className={style.lg1}>Réception</h1>
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
                    items={Receptions.map(Reception => ({
                        value1: Reception.numero_reception.toString(),
                        value2: Reception.numero_livraison.toString(),
                        value3: Reception.date_reception
                            .toString()
                            .split('T')[0],
                        value4: (Reception.nombre_palettes_recues === null || '') ? '/' : Reception.nombre_palettes_recues.toString(),
                        value5: (Reception.commentaires === '' || null) ? '/' : Reception.commentaires,
                        value6: Reception.date_reception.toString().split('T')[0],
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `http://localhost:3000/api/dons/${params.donsID}/reception`,
                    }}
                    attribut={{
                        att1: 'Numéro de livraison',
                        att2: 'Date de réception',
                        att3: 'Nombre de palettes reçues',
                        att4: 'Commentaires',
                        att5: 'Date de réception',
                    }}
                    searchItems={search.map(Reception => ({
                        value1: Reception.numero_reception.toString(),
                        value2: Reception.numero_livraison.toString(),
                        value3: Reception.date_reception
                            .toString()
                            .split('T')[0],
                        value4: (Reception.nombre_palettes_recues === null || '') ? '/' : Reception.nombre_palettes_recues.toString(),
                        value5: (Reception.commentaires === '' || null) ? '/' : Reception.commentaires,
                        value6: Reception.date_reception.toString().split('T')[0],
                    }))}
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
                            url={`http://localhost:3000/api/dons/${params.donsID}/reception`}
                            fields={fields}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default withAuthorization(ReceptionsPage, ['AD', 'PR'])
