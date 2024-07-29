import React, { useEffect, useState } from 'react'
import style from '../styles/components.module.css'

interface SelectComponentProps {
    url: string
    createURL?: string
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
    createURL,
    required,
    placeholder,
    onChange,
    onInputChange,
}: SelectComponentProps) {
    const [options, setOptions] = useState<Option[]>([])
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        const fetchOptions = async () => {
            const response = await fetch(url)
            if (!response.ok) {
                console.error(
                    'Erreur lors de la récupération des données',
                    response,
                )
            }
            const data = await response.json()
            console.log(data)
            const formattedOptions = data.map(
                (item: { id: string; label: string }) => ({
                    value: item.id,
                    label: item.label,
                }),
            )
            setOptions(formattedOptions)
        }
        fetchOptions()
    }, [url])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        if (e.target.value === "Création d'un nouveau..." && createURL) {
            window.open(createURL, '_blank')
        }
        const matchingOption = options.find(
            option =>
                option.label.toLowerCase() === e.target.value.toLowerCase(),
        )
        if (matchingOption) {
            e.target.value = matchingOption.value
            if (onChange) {
                onChange(e)
                if (onInputChange) {
                    onInputChange(e)
                }
                e.target.value = matchingOption.label // Call the onChange prop with the id
            }
        }

        const selectedOptions: Option[] = []
        options.map(option => {
            if (
                option.label
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
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
                {createURL ? (
                    <option
                        className={style.selectF}
                        key={createURL}
                        value="Création d'un nouveau..."
                    >
                        Création d&apos;un nouveau...
                    </option>
                ) : (
                    ''
                )}
            </datalist>
        </>
    )
}
