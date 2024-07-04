'use client'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import List from '../../../components/list'

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
            const res = await fetch(
                'http://localhost:3000/api/sites/type-site-types',
            )

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
                }}
            />
            {isPopUpOpen && (
                <PopUp
                    onClose={handleClose}
                    url='http://localhost:3000/api/sites/type-site-types'
                    fields={[
                        {
                            id: 'code_type_site',
                            type: 'input',
                            value: null,
                            required: true,
                        },
                        {
                            id: 'libelle',
                            type: 'input',
                            value: null,
                            required: true,
                        },
                    ]}
                />
            )}
        </>
    )
}

export default withAuthorization(SiteTypesPage, ['AD', 'PR'])
