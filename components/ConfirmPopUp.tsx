import React from 'react'
import style from '../styles/components.module.css'

interface ConfirmPopUpProps {
    message: string
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmPopUp: React.FC<ConfirmPopUpProps> = ({
    message,
    onConfirm,
    onCancel,
}) => {
    return (
        <div className={`${style.popUpBackground} ${style.z1}`}>
            <div className={style.errorPopUp}>
                <h2 className={style.NF}>Confirmation:</h2>
                <p className={style.CNF}>{message}</p>
                <div className={style.functionBlock}>
                    <button className={style.BTN_CNF} onClick={onConfirm}>
                        Confirmer
                    </button>
                    <button className={style.BTN_CNF} onClick={onCancel}>
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmPopUp
