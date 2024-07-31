import React, { useEffect, useState } from 'react'
import style from '../styles/components.module.css'

interface SelectComponentProps {
    url: string
    createURL?: string
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
    required?: boolean
}

interface Option {
    value: string
    label: string
    params1: string
    params2: string
    params3: string
}

export default function SelectComponent({
    url,
    createURL,
    onChange,
    required,
}: SelectComponentProps) {
    const [options, setOptions] = useState<Option[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'Créer une nouvelle option' && createURL) {
            window.open(createURL, '_blank')
        }
        if (onChange) {
            onChange(e)
        }
    }

    useEffect(() => {
        const fetchOptions = async () => {
            if (url !== '') {
                const response = await fetch(url)
                if (!response.ok) {
                    console.error(
                        'Erreur lors de la récupération des données',
                        response,
                    )
                }
                const data = await response.json()
                const formattedOptions = data.map(
                    (item: {
                        id: string
                        label: string
                        params1: string
                        params2: string
                        params3: string
                    }) => ({
                        value: item.id,
                        label: item.label,
                        params1: item.params1,
                        params2: item.params2,
                        params3: item.params3,
                    }),
                )
                setOptions(formattedOptions)
                if (formattedOptions.length > 0 && onChange) {
                    const event = new Event('change', { bubbles: true })
                    Object.defineProperty(event, 'target', {
                        writable: false,
                        value: '',
                    })
                    onChange(
                        event as unknown as React.ChangeEvent<HTMLSelectElement>,
                    )
                }
            }
        }
        fetchOptions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    return (
        <select
            className={style.selectF}
            onChange={handleChange}
            required={required}
        >
            <option value=''>Sélectionner une option... </option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                    {option.params1 !== undefined && <> - {option.params1}</>}
                    {option.params2 !== undefined && <> - {option.params2}</>}
                    {option.params3 !== undefined && <> - {option.params3}</>}
                </option>
            ))}
            {createURL ? <option>Créer une nouvelle option</option> : ''}
        </select>
    )
}
