import React from 'react'
import style from '../styles/components.module.css'

export default function NotFound() {
    return (
        <div className={style.page}>
            <h2 className={style.NF}>Not Found</h2>
            <p className={style.CNF}>Could not find requested resource</p>
            <a className={style.BTN_CNF} href='/'>
                Return To Calendar
            </a>
        </div>
    )
}
