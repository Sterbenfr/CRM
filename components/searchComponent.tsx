import React, { useEffect, useState } from 'react'
import style from '../styles/components.module.css'

interface SelectComponentProps {
    url: string
    required?: boolean
    placeholder?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onInputChange?: React.ChangeEventHandler<HTMLInputElement>
}

interface Option {
    value: string
    label: string
}

export default function SearchComponent({
    url,
    required,
    placeholder,
    onChange,
    onInputChange,
}: SelectComponentProps) {
    const [options, setOptions] = useState<Option[]>([])
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
    const [inputValue, setInputValue] = useState('')

    const fetchOptions = async () => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            const formattedOptions = data.map(
                (item: { id: string; label: string }) => ({
                    value: item.id,
                    label: item.label,
                }),
            )
            setOptions(formattedOptions)
        } catch (error) {
            console.error('Erreur lors de la récupération des données', error)
        }
    }

    useEffect(() => {
        fetchOptions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        const matchingOption = options.find(
            option =>
                option.label.toLowerCase() === e.target.value.toLowerCase(),
        )
        if (matchingOption) {
            e.target.value = matchingOption.value
            if (onChange) {
                onChange(e)
                if (onInputChange) {
                    onInputChange(e);
                }
                e.target.value = matchingOption.label // Call the onChange prop with the id
            }
        }

        const selectedOptions: Option[] = []
        options.map(option => {
            if (
                option.label
                    .toLowerCase()
                    .startsWith(e.target.value.toLowerCase())
            ) {
                selectedOptions.push(option)
            }
        })
        setSelectedOptions(selectedOptions)
    }

    return (
        <>
            <input
                key='search'
                type='input'
                placeholder={placeholder}
                required={required}
                value={inputValue}
                onChange={handleInputChange}
                list={url}
                className={style.selectF}
            />
            <datalist id={url}>
                {selectedOptions
                    .filter((option, index) => index < 5)
                    .map(option => (
                        <option
                            className={style.selectF}
                            key={option.value}
                            value={option.label}
                        >
                            {option.label}
                        </option>
                    ))}
            </datalist>
        </>
    )
}
