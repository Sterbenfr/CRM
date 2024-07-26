import React from 'react'
import style from '../styles/components.module.css'

export default function NotAccess() {
    return (
        <div className={style.page}>
            <h2 className={style.NF}>Accès refusé a cette page</h2>
            <p className={style.CNF}>
                Vous n&apos;avez pas la permission pour voir cette page
            </p>
            <a className={style.BTN_CNF} href='/'>
                Retour vers calendrier
            </a>
        </div>
    )
}
