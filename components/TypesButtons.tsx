import React, { useEffect, useState } from 'react'
import style from '../styles/components.module.css'
import Link from 'next/link'

interface TypesButtonsProps {
    label: string
    url: string
}

const TypesButtons: React.FC<{ items: TypesButtonsProps[] }> = ({ items }) => {
    const [currentUrl, setCurrentUrl] = useState('')

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href)
        }
    }, [])
    return (
        <>
            <h1 className={style.md}>
                Ajouter / Supprimer le(s) type(s) suivant(s)
            </h1>
            <div className={style.typeButtons}>
                {items.map(item => (
                    <Link
                        key={item.label}
                        href={`${currentUrl}/${item.url}`}
                        className={style.BTN_Type}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </>
    )
}

export default TypesButtons
