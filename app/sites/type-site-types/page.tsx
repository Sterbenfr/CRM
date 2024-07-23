'use client'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import List from '../../../components/list'
import style from '../../../styles/components.module.css'
import Image from 'next/image'

export interface siteType {
    id: string
    label: string
}

function SiteTypesPage() {
    const [SiteTypes, setSiteTypes] = useState<siteType[]>([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }
    useEffect(() => {
        const fetchSiteTypes = async () => {
            const res = await fetch('../../api/sites/type-site-types')

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const siteTypes: siteType[] = await res.json()
            setSiteTypes(siteTypes)
        }

        fetchSiteTypes()
    }, [])

    return (
        <>
            <div className={style.page}>
                <div className={style.croixID}>
                    <h1 className={style.lg1}>Types de sites</h1>
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
                    items={SiteTypes.map(sitetype => ({
                        value1: sitetype.id.toString(),
                        value2: sitetype.id.toString(),
                        value3: sitetype.label,
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: '../../api/sites/type-site-types',
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
                            url='../../api/sites/type-site-types'
                            fields={[
                                {
                                    id: 'code_type_site',
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

export default withAuthorization(SiteTypesPage, ['AD', 'PR'])
