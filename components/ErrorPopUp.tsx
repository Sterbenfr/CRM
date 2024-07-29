import style from '../styles/components.module.css'

interface ErrorPopUpProps {
    err: string
}

const ErrorPopUp: React.FC<ErrorPopUpProps> = ({ err }) => {
    return (
        <div className={`${style.popUpBackground} ${style.z2}`}>
            <div className={style.errorPopUp}>
                <h2 className={style.NF}>Erreur avec la base de données</h2>
                <p className={style.CNF}>{err}</p>
                <a className={style.BTN_CNF} href={window.location.href}>
                    Retour à la page
                </a>
            </div>
        </div>
    )
}

export default ErrorPopUp
