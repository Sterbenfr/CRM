import styles from '../styles/Footer.module.css'

export default function Footer() {
    return (
        <div className={styles.foot}>
            <footer className={styles.footer}>
                <p>--- FAIT PAR ---</p>
                <ul>
                    <li>
                        Aurelien Schmieder{' '}
                        <a
                            href='https://github.com/Aurelienschmi'
                            target='_blank'
                        >
                            <div className={styles.pop}>
                                <img src='/IMG/github.svg' alt='GitHub' />
                            </div>
                        </a>
                        <a
                            href='https://www.linkedin.com/in/aurelien-schmieder-0017391ab/'
                            target='_blank'
                        >
                            <div className={styles.pop}>
                                <img src='/IMG/linkedin.svg' alt='LinkedIn' />
                            </div>
                        </a>
                    </li>
                    <li>
                        Alexis Hazebrouck{' '}
                        <a
                            href='https://github.com/Alexis-aka-Yazm'
                            target='_blank'
                        >
                            <div className={styles.pop}>
                                <img src='/IMG/github.svg' alt='GitHub' />
                            </div>
                        </a>
                        <a
                            href='https://www.linkedin.com/in/alexis-hazebrouck-3b7a7a296'
                            target='_blank'
                        >
                            <div className={styles.pop}>
                                <img src='/IMG/linkedin.svg' alt='LinkedIn' />
                            </div>
                        </a>
                    </li>
                    <li>
                        Hugo Matyla{' '}
                        <a href='https://github.com/Fenerz07' target='_blank'>
                            <div className={styles.pop}>
                                <img src='/IMG/github.svg' alt='GitHub' />
                            </div>
                        </a>
                        <a
                            href='https://www.linkedin.com/in/hugo-matyla/'
                            target='_blank'
                        >
                            <div className={styles.pop}>
                                <img src='/IMG/linkedin.svg' alt='LinkedIn' />
                            </div>
                        </a>
                    </li>
                    <li>
                        Mathis Dacacio{' '}
                        <a
                            href='https://github.com/MathisDacacio'
                            target='_blank'
                        >
                            <div className={styles.pop}>
                                <img src='/IMG/github.svg' alt='GitHub' />
                            </div>
                        </a>
                        <a
                            href='https://www.linkedin.com/in/mathis-dacacio-298a25293/'
                            target='_blank'
                        >
                            <div className={styles.pop}>
                                <img src='/IMG/linkedin.svg' alt='LinkedIn' />
                            </div>
                        </a>
                    </li>
                    <li>
                        Maxime Labbe{' '}
                        <a
                            href='https://github.com/Maxime-Labbe'
                            target='_blank'
                        >
                            <div className={styles.pop}>
                                <img src='/IMG/github.svg' alt='GitHub' />
                            </div>
                        </a>
                        <a
                            href='https://www.linkedin.com/in/maxime-labbe-626012293/'
                            target='_blank'
                        >
                            <div className={styles.pop}>
                                <img src='/IMG/linkedin.svg' alt='LinkedIn' />
                            </div>
                        </a>
                    </li>
                    <li>
                        Pierre Caudreliez{' '}
                        <a href='https://github.com/Sterbenfr' target='_blank'>
                            <div className={styles.pop}>
                                <img src='/IMG/github.svg' alt='GitHub' />
                            </div>
                        </a>
                        <a
                            href='https://www.linkedin.com/in/pierre-caudreliez/'
                            target='_blank'
                        >
                            <div className={styles.pop}>
                                <img src='/IMG/linkedin.svg' alt='LinkedIn' />
                            </div>
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
    )
}
