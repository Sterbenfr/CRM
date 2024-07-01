import React, { useEffect, useState } from 'react'
import SelectComponent from './select-component'
import SearchComponent from './searchComponent'
import style from '../styles/components.module.css'

type Field = {
    id: string
    type:
        | 'input'
        | 'checkbox'
        | 'number'
        | 'date'
        | 'file'
        | 'select'
        | 'enum'
        | 'search'
        | 'password'
    value: string | boolean | null
    placeholder?: string
    url?: string
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
    onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface PopUpProps {
    onClose: () => void
    fields: Field[]
    url: string
}

const PopUp: React.FC<PopUpProps> = ({ onClose, fields, url }) => {
    const [inputs, setInputs] = useState<Field[]>(fields)

    useEffect(() => {
        setInputs(fields)
    }, [fields])

    const handleInputChange = (
        id: string,
        value: string | boolean,
        fonct?: React.ChangeEventHandler<HTMLInputElement>,
    ) => {
        if (fonct) {
            fonct
        }
        const updatedInputs = inputs.map(input =>
            input.id === id ? { ...input, value } : input,
        )
        setInputs(updatedInputs)
    }

    const handleSubmit = async () => {
        const endpoint = url

        const inputsData = inputs.reduce<{
            [key: string]: string | boolean | null
        }>((acc, input) => {
            acc[input.id] = input.value
            return acc
        }, {})

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputsData),
            })

            if (response.ok) {
                const jsonResponse = await response.json()
                console.log('Submission successful', jsonResponse)
                onClose()
            } else {
                console.error('Submission failed', await response.text())
            }
        } catch (error) {
            console.error('Network error:', error)
        }
        onClose()
    }

    return (
        <div className={'popup-container'}>
            <div className={style.page}>
                <h2 className={style.lg}>Ajouter une nouvelle entrée</h2>
                {inputs.map(input => {
                    switch (input.type) {
                        case 'select':
                            return (
                                <SelectComponent
                                    key={input.id}
                                    url={input.url as string}
                                    onChange={input.onChange}
                                />
                            )
                        case 'search':
                            return (
                                <SearchComponent
                                    key={input.id}
                                    url={input.url as string}
                                    onChange={e =>
                                        handleInputChange(
                                            input.id,
                                            e.target.value,
                                        )
                                    }
                                    onInputChange={input.onInputChange}
                                />
                            )
                        default:
                            return (
                                <input
                                    key={input.id}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    className={style.selectF}
                                    value={
                                        input.value === null
                                            ? ''
                                            : (input.value as string)
                                    }
                                    onChange={e =>
                                        handleInputChange(
                                            input.id,
                                            e.target.value,
                                            input.onInputChange,
                                        )
                                    }
                                />
                            )
                    }
                })}
                <div className={style.BTNdiv}>
                    <div className={style.BTNdiv}>
                        <button className={style.BTNsub} onClick={onClose}>
                            Exit
                        </button>

                        <button className={style.BTNsub} onClick={handleSubmit}>
                            Envoyer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUp

/*
<PopUp
    onClose={handleClose}
    fields={[
        { id: 1, type: 'input', value: ''},
        { id: 2, type: 'checkbox', value: false },
        // Add more fields as needed
    ]}
/>*/
