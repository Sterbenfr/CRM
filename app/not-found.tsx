import React from 'react'
import style from '../styles/components.module.css'

export default function NotFound() {
    return (
        <div className={style.page}>
            <h2 className={style.NF}>Page non trouvé</h2>
            <a className={style.BTN_CNF} href='/'>
                Retour vers calendrier
            </a>
        </div>
    )
}
