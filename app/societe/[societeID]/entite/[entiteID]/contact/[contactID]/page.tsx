'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../../../styles/components.module.css'

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

    useEffect(() => {
        const fetchContact = async () => {
            if (!params.contactID) return

            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}/contact/${params.contactID}`,
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

    return (
        <div className={style.idPage}>
            <div>
                <h1 className={style.titre_global}>Détails du contact</h1>
            </div>
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
                        <p className={style.titre}>Nom de l&apos;entité :</p>
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
                        <p>{contact[0].nom == null ? '/' : contact[0].nom}</p>
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
                            {contact[0].fonction == null
                                ? '/'
                                : contact[0].fonction}
                        </p>
                    </div>
                </div>
                <div className={style.col_2}>
                    <div className={style.info}>
                        <p className={style.titre}>Service du contact :</p>
                        <p>
                            {contact[0].service == null
                                ? '/'
                                : contact[0].service}
                        </p>
                    </div>
                    <div className={style.info}>
                        <p className={style.titre}>Numéro fixe du contact :</p>
                        <p>
                            {contact[0].numero_fixe == null
                                ? '/'
                                : contact[0].numero_fixe}
                        </p>
                    </div>
                    <div className={style.info}>
                        <p className={style.titre}>
                            Numéro portable du contact :
                        </p>
                        <p>
                            {contact[0].numero_portable == null
                                ? '/'
                                : contact[0].numero_portable}
                        </p>
                    </div>
                    <div className={style.info}>
                        <p className={style.titre}>Adresse mail du contact :</p>
                        <p>
                            {contact[0].adresse_mail == null
                                ? '/'
                                : contact[0].adresse_mail}
                        </p>
                    </div>
                    <div className={style.info}>
                        <p className={style.titre}>Commentaires</p>
                        <p>
                            {contact[0].commentaires == null
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
    )
}
