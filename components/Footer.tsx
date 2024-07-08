import styles from '../styles/Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>--- Made by students from ENIGMA ---</p>
            <ul>
                <li>
                    Aurelien Schmieder{' '}
                    <a href='https://github.com/Aurelienschmi' target='_blank'>
                        <img src='/IMG/github.svg' alt='GitHub' />
                    </a>
                    <a
                        href='https://www.linkedin.com/in/aurelien-schmieder-0017391ab/'
                        target='_blank'
                    >
                        <img src='/IMG/linkedin.svg' alt='LinkedIn' />
                    </a>
                </li>
                <li>
                    Alexis Hazebrouck{' '}
                    <a
                        href='https://github.com/Alexis-aka-Yazm'
                        target='_blank'
                    >
                        <img src='/IMG/github.svg' alt='GitHub' />
                    </a>
                    <a
                        href='https://www.linkedin.com/in/alexis-hazebrouck-3b7a7a296'
                        target='_blank'
                    >
                        <img src='/IMG/linkedin.svg' alt='LinkedIn' />
                    </a>
                </li>
                <li>
                    Hugo Matyla{' '}
                    <a href='https://github.com/Fenerz07' target='_blank'>
                        <img src='/IMG/github.svg' alt='GitHub' />
                    </a>
                    <a
                        href='https://www.linkedin.com/in/hugo-matyla/'
                        target='_blank'
                    >
                        <img src='/IMG/linkedin.svg' alt='LinkedIn' />
                    </a>
                </li>
                <li>
                    Mathys Dacacio{' '}
                    <a href='https://github.com/MathisDacacio' target='_blank'>
                        <img src='/IMG/github.svg' alt='GitHub' />
                    </a>
                    <a
                        href='https://www.linkedin.com/in/mathis-dacacio-298a25293/'
                        target='_blank'
                    >
                        <img src='/IMG/linkedin.svg' alt='LinkedIn' />
                    </a>
                </li>
                <li>
                    Maxime Labbe{' '}
                    <a href='https://github.com/Maxime-Labbe' target='_blank'>
                        <img src='/IMG/github.svg' alt='GitHub' />
                    </a>
                    <a
                        href='https://www.linkedin.com/in/maxime-labbe-626012293/'
                        target='_blank'
                    >
                        <img src='/IMG/linkedin.svg' alt='LinkedIn' />
                    </a>
                </li>
                <li>
                    Pierre Caudreliez{' '}
                    <a href='https://github.com/Sterbenfr' target='_blank'>
                        <img src='/IMG/github.svg' alt='GitHub' />
                    </a>
                    <a
                        href='https://www.linkedin.com/in/pierre-caudreliez/'
                        target='_blank'
                    >
                        <img src='/IMG/linkedin.svg' alt='LinkedIn' />
                    </a>
                </li>
            </ul>
        </footer>
    )
}
