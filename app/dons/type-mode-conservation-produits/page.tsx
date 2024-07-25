'use client'
import List from '../../../components/list'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../styles/components.module.css'
import Image from 'next/image'

export interface Mode_Conservation_Produits {
    id: string
    label: string
}

function Mode_Conservations_ProduitsPage() {
    const [Mode_Conservations_Produits, setMode_Conservations_Produits] =
        useState<Mode_Conservation_Produits[]>([])
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchMode_Conservations_Produits = async () => {
            const res = await fetch(
                '../../api/dons/type-mode-conservations-produits',
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Mode_Conservations_Produits: Mode_Conservation_Produits[] =
                await res.json()
            setMode_Conservations_Produits(Mode_Conservations_Produits)
        }

        fetchMode_Conservations_Produits()
    }, [])

    return (
        <>
            <div className={style.page}>
                <div className={style.croixID}>
                    <h1 className={style.lg1}>
                        Types de conservation des produits
                    </h1>
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
                    items={Mode_Conservations_Produits.map(
                        modeConservationProduit => ({
                            value1: modeConservationProduit.id.toString(),
                            value2: modeConservationProduit.id.toString(),
                            value3: modeConservationProduit.label,
                        }),
                    )}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: '../../api/dons/type-mode-conservations-produits',
                    }}
                    attribut={{
                        att1: 'Code',
                        att2: 'Libellé',
                    }}
                />
                {isPopUpOpen && (
                    <div className={style.PopUpType}>
                        <PopUp
                            onClose={handleClose}
                            url='../../api/dons/type-mode-conservations-produits'
                            fields={[
                                {
                                    id: 'code_mode_conservation_produits',
                                    type: 'input',
                                    value: null,
                                    required: true,
                                    maxLength: 4,
                                },
                                {
                                    id: 'libelle',
                                    type: 'input',
                                    value: null,
                                    required: true,
                                    maxLength: 50,
                                },
                            ]}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default withAuthorization(Mode_Conservations_ProduitsPage, ['AD', 'SU'])
