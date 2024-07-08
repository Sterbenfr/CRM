import style from '../styles/components.module.css'

export interface LineProps {
    deleteFunction?: (param: string) => void
    param1?: string
    param2?: string
    param3?: string
    param4?: string
    param5?: string
    param6?: string
    paramColor?: string
}

const Line: React.FC<LineProps> = ({
    deleteFunction,
    param1,
    param2,
    param3,
    param4,
    param5,
    param6,
    paramColor,
}) => {
    // Click handler function
    const handleClick = (key: string) => {
        if (window.location.href.endsWith('/cerfa')) {
            return
        }

        // Navigate to the current URL + /key
        window.location.href = `${window.location.href}/${key}`
    }

    const handleCheckbox = () => {
        if (deleteFunction) {
            deleteFunction(param1 || '')
        }
    }

    return (
        <div className={style.body}>
            <div className={style.line}>
                <div className={style.check_box}>
                    <input
                        className={style.check}
                        type='checkbox'
                        onClick={handleCheckbox}
                    ></input>
                </div>
                <div
                    key={param1}
                    onClick={() => handleClick(param1 || '')}
                    style={{ cursor: 'pointer' }}
                    className={style.lineContainer}
                >
                    <div className={style.lineContainer}>
                        <div className={style.Ztext}>{param2}</div>

                        <div className={style.Ztext}>{param3}</div>

                        <div className={style.Ztext}>{param4}</div>

                        <div
                            className={` ${
                                paramColor === 'R'
                                    ? style.red
                                    : paramColor === 'A'
                                      ? style.orange
                                      : paramColor
                                        ? style.green
                                        : ''
                            } " " ${style.Ztext}`}
                        >
                            {param5}
                        </div>

                        <div className={style.Ztext}>{param6}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Line
