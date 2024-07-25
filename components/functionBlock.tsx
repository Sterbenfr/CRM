import style from '../styles/components.module.css'

interface FunctionBlockProps {
    fonc1?: React.MouseEventHandler<HTMLButtonElement>
    fonc2?: React.MouseEventHandler<HTMLButtonElement>
    fonc3?: React.FormEventHandler<HTMLInputElement>
    fonc4?: React.MouseEventHandler<HTMLButtonElement>
}

const FunctionBlock: React.FC<FunctionBlockProps> = ({
    fonc1,
    fonc2,
    fonc3,
    fonc4,
}) => {
    return (
        <div className={style.page1}>
            <div className={style.functionBlock}>
                <button className={style.btnFunctionBlockADD} onClick={fonc1}>
                    Ajouter
                </button>
                <button className={style.btnFunctionBlockDEL} onClick={fonc2}>
                    Supprimer
                </button>
                <button className={style.btnFunctionBlockADD} onClick={fonc4}>
                    Exporter
                </button>
            </div>
            <input
                placeholder='Rechercher... (3 caractères minimum)'
                className={style.searchLine}
                type='text'
                onInput={fonc3}
            />
        </div>
    )
}

export default FunctionBlock
