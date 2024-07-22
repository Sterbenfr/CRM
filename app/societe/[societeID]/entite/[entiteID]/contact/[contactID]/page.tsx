'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../../../styles/components.module.css'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'

interface ExtendedSession extends Session {
    user: {
        name?: string | null
        email?: string | null
        image?: string | null
        role?: string // Add the role property
        id?: string
    }
}
interface ContactID {
    code_contact: number
    raison_sociale: string
    civilite: string
    nom: string
    prenom: string
    photo: Blob
    fonction: string
    service: string
    numero_fixe: string
    numero_portable: string
    adresse_mail: string
    commentaires: string
    date_arret_contact: Date
}

export default function ContactPage({
    params,
}: {
    params: { societeID: string; entiteID: string; contactID: string }
}) {
    const [contact, setContact] = useState<ContactID[]>([])
    const [session, setSession] = useState<ExtendedSession | null>(null)

    useEffect(() => {
        const fetchContact = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)
            if (!params.contactID) return

            const res = await fetch(
                `../../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/contact/${params.contactID}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const contact: ContactID[] = await res.json()
            setContact(contact)
        }

        fetchContact()
    }, [params.contactID, params.societeID, params.entiteID])
    if (!contact || contact.length === 0)
        return (
            <div className={style.page}>
                <h2 className={style.load}>Chargement...</h2>
            </div>
        )

    const Print = () => {
        const printContents = document.getElementById('printablediv')!.innerHTML
        const originalContents = document.body.innerHTML

        const applyPrintStyles = () => {
            document.body.innerHTML = printContents
            document.body.style.margin = '0'
            document.body.style.padding = '0'

            const allElements = document.body.getElementsByTagName('*')
            for (let i = 0; i < allElements.length; i++) {
                const element = allElements[i] as HTMLElement
                element.style.margin = '10px'
                element.style.fontSize = '12px'
                element.style.padding = '0'
                element.style.fontFamily = 'Arial'
                element.style.lineHeight = '1'
                element.style.letterSpacing = '0'
                element.style.wordSpacing = '0'
                element.style.borderLeft = 'none'
            }
        }

        const hideElements = () => {
            const element = document.getElementById('hide1')
            if (element) {
                element.style.display = 'none'
            }
            const element2 = document.getElementById('hide2')
            if (element2) {
                element2.style.display = 'none'
            }
            const element3 = document.getElementById('hide3')
            if (element3) {
                element3.style.display = 'none'
            }
        }
        applyPrintStyles()
        hideElements()
        window.print()
        document.body.innerHTML = originalContents
        window.location.reload()
    }

    return (
        <div className={style.idPage}>
            <div className={style.croixID}>
                <h1 className={style.titre_global}>Détails du contact</h1>
                <a href='javascript:history.go(-1)' className={style.btnC}>
                    <Image
                        className={style.CRid}
                        src='/IMG/Return.png'
                        height={30}
                        width={30}
                        alt='Fermer la fenêtre'
                    />
                </a>
            </div>
            {session &&
                session.user &&
                session.user.role === ('AD' || 'RR' || 'PR' || 'RC') && (
                    <div>
                        <button className={style.btnModif} onClick={Print}>
                            Imprimer
                        </button>
                    </div>
                )}

            <div id='printablediv'>
                <div className={style.info_id}>
                    <div className={style.col_1}>
                        <div className={style.info}>
                            <p className={style.titre}>Code du contact :</p>
                            <p>
                                {contact[0].code_contact == null
                                    ? '/'
                                    : contact[0].code_contact}
                            </p>
                        </div>
                        <div className={style.info}>
                            <p className={style.titre}>
                                Nom de l&apos;entité :
                            </p>
                            <p>
                                {contact[0].raison_sociale == null
                                    ? '/'
                                    : contact[0].raison_sociale}
                            </p>
                        </div>
                        <div className={style.info}>
                            <p className={style.titre}>Civilité du contact :</p>
                            <p>
                                {contact[0].civilite == null
                                    ? '/'
                                    : contact[0].civilite}
                            </p>
                        </div>
                        <div className={style.info}>
                            <p className={style.titre}>Nom du contact :</p>
                            <p>
                                {contact[0].nom == null ? '/' : contact[0].nom}
                            </p>
                        </div>
                        <div className={style.info}>
                            <p className={style.titre}>Prénom du contact :</p>
                            <p>
                                {contact[0].prenom == null
                                    ? '/'
                                    : contact[0].prenom}
                            </p>
                        </div>
                        <div className={style.info}>
                            <p className={style.titre}>Fonction du contact :</p>
                            <p>
                                {contact[0].fonction == (null || '')
                                    ? '/'
                                    : contact[0].fonction}
                            </p>
                        </div>
                    </div>
                    <div className={style.col_2}>
                        <div className={style.info}>
                            <p className={style.titre}>Service du contact :</p>
                            <p>
                                {contact[0].service == (null || '')
                                    ? '/'
                                    : contact[0].service}
                            </p>
                        </div>
                        <div className={style.info}>
                            <p className={style.titre}>
                                Téléphone fixe du contact :
                            </p>
                            <p>
                                {contact[0].numero_fixe == (null || '')
                                    ? '/'
                                    : contact[0].numero_fixe}
                            </p>
                        </div>
                        <div className={style.info}>
                            <p className={style.titre}>
                                Téléphone portable du contact :
                            </p>
                            <p>
                                {contact[0].numero_portable == null
                                    ? '/'
                                    : contact[0].numero_portable}
                            </p>
                        </div>
                        <div className={style.info}>
                            <p className={style.titre}>
                                Adresse mail du contact :
                            </p>
                            <p>
                                {contact[0].adresse_mail == (null || '')
                                    ? '/'
                                    : contact[0].adresse_mail}
                            </p>
                        </div>
                        <div className={style.info}>
                            <p className={style.titre}>Commentaires</p>
                            <p>
                                {contact[0].commentaires == (null || '')
                                    ? '/'
                                    : contact[0].commentaires}
                            </p>
                        </div>
                        <div className={style.info}>
                            <p className={style.titre}>
                                Date d&apos;arrêt de liaison avec le contact :
                            </p>
                            <p>
                                {contact[0].date_arret_contact == null
                                    ? '/'
                                    : contact[0].date_arret_contact
                                          .toString()
                                          .split('T')[0]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
