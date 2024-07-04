import React, { useState } from 'react'
import Line from './line'
import FunctionBlock from './functionBlock'
import style from '../styles/components.module.css'

interface ListProps {
    value1?: string
    value2?: string
    value3?: string
    value4?: string
    value5?: string
    value6?: string
    value7?: string
}

interface FunctionProps {
    fonc1?: React.MouseEventHandler<HTMLButtonElement>
    url?: string
}

const List: React.FC<{ items: ListProps[]; functions: FunctionProps }> = ({
    items,
    functions,
}) => {
    const [lineCheckbox, setLineCheckbox] = useState<number[]>([])
    const handleLineCheckboxChange = (param: string) => {
        const value = parseInt(param)
        if (!lineCheckbox.includes(value)) {
            setLineCheckbox([...lineCheckbox, value])
        } else {
            setLineCheckbox(lineCheckbox.filter(item => item !== value))
        }
    }
    const deleteFunction = () => {
        lineCheckbox.map(async item => {
            await fetch(`${functions.url}/${item}`, {
                method: 'DELETE',
            })
        })
    }
    return (
        <>
            <FunctionBlock fonc1={functions.fonc1} fonc2={deleteFunction} />
            <div className={style.list_line}>
                {items.map(item => (
                    // Wrap Line component with a div and add onClick event
                    <div key={item.value1}>
                        <Line
                            deleteFunction={handleLineCheckboxChange}
                            param1={item.value1 == null ? '' : item.value1}
                            param2={item.value2 == null ? '' : item.value2}
                            param3={item.value3 == null ? '' : item.value3}
                            param4={item.value4 == null ? '' : item.value4}
                            param5={item.value5 == null ? '' : item.value5}
                            param6={item.value6 == null ? '' : item.value6}
                            paramColor={item.value7 == null ? '' : item.value7}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default List
