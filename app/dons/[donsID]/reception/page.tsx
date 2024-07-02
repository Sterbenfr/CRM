'use client'
import { useEffect, useState } from 'react'
import List from '../../../../components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../styles/components.module.css'

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

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }
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
            setTotalItems(total) // set the total items
        }
        fetchDons()
    }, [page, itemsPerPage, params.donsID])

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
                <h1 className={style.lg}>Réception</h1>
                <List
                    items={Receptions.map(Reception => ({
                        value1: Reception.code_Don.toString(),
                        value2: Reception.numero_livraison.toString(),
                        value3: Reception.date_reception
                            .toString()
                            .split('T')[0],
                        value4: Reception.nombre_palettes_recues.toString(),
                        value5: Reception.poids_recu_kg.toString(),
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `http://localhost:3000/api/dons/${params.donsID}/reception`,
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
                            url={`http://localhost:3000/api/dons/${params.donsID}/reception`}
                            fields={[
                                {
                                    id: 'numero_reception',
                                    type: 'number',
                                    value: null,
                                },
                                {
                                    id: 'numero_livraison',
                                    type: 'number',
                                    value: null,
                                },
                                {
                                    id: 'date_reception',
                                    type: 'date',
                                    value: null,
                                },
                                {
                                    id: 'heure_reception',
                                    type: 'date',
                                    value: null,
                                },
                                {
                                    id: 'nombre_palettes_recues',
                                    type: 'number',
                                    value: null,
                                }, //remplissage auto
                                {
                                    id: 'nombre_palettes_consignees_recues',
                                    type: 'number',
                                    value: null,
                                },
                                {
                                    id: 'nombre_palettes_consignees_rendues',
                                    type: 'number',
                                    value: null,
                                },
                                {
                                    id: 'nombre_cartons_recus',
                                    type: 'number',
                                    value: null,
                                },
                                {
                                    id: 'poids_recu_kg',
                                    type: 'number',
                                    value: null,
                                },
                                {
                                    id: 'produits_sur_palettes',
                                    type: 'number',
                                    value: null,
                                },
                                {
                                    id: 'commentaires',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'pieces_associees',
                                    type: 'file',
                                    value: null,
                                },
                            ]}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default withAuthorization(ReceptionsPage, ['AD', 'PR'])
