import React from 'react'
import style from '../styles/components.module.css'

export default function NotFound() {
    return (
        <div className={style.page}>
            <h2 className={style.NF}>Page non trouvée</h2>
            <p className={style.CNF}>
                Impossible de trouver la ressource demandée
            </p>
            <a className={style.BTN_CNF} href='/'>
                Retour vers calendrier
            </a>
        </div>
    )
}
