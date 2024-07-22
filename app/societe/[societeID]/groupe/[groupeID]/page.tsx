'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../styles/components.module.css'
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

interface GroupeID {
    code_groupe: number
    nom_du_Groupe: string
    Logo: Blob
    site_Web: string
    commentaires: string
    date_arret_activite_du_Groupe: Date
}

export default function GroupePage({
    params,
}: {
    params: { societeID: string; groupeID: string }
}) {
    const [Groupe, setGroupe] = useState<GroupeID[]>([])
    const [session, setSession] = useState<ExtendedSession | null>(null)

    useEffect(() => {
        const fetchGroupe = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)
            if (!params.groupeID) return

            const res = await fetch(
                `../../../../api/societe/${params.societeID}/groupe/${params.groupeID}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Groupe: GroupeID[] = await res.json()
            setGroupe(Groupe)
        }

        fetchGroupe()
    }, [params.groupeID, params.societeID])
    if (!Groupe || Groupe.length === 0)
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
                <h1 className={style.titre_global}>Groupes</h1>
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
                            <p className={style.titre}>Code du groupe :</p>
                            <p>
                                {Groupe[0].code_groupe == null
                                    ? '/'
                                    : Groupe[0].code_groupe}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Nom du groupe :</p>
                            <p>
                                {Groupe[0].nom_du_Groupe == null
                                    ? '/'
                                    : Groupe[0].nom_du_Groupe}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Site web :</p>
                            <p>
                                {Groupe[0].site_Web == null
                                    ? '/'
                                    : Groupe[0].site_Web}
                            </p>
                        </div>
                    </div>

                    <div className={style.col_2}>
                        <div className={style.info}>
                            <p className={style.titre}>Commentaires :</p>
                            <p>
                                {Groupe[0].commentaires == null
                                    ? '/'
                                    : Groupe[0].commentaires}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Date d&apos;arrêt d&apos;activité du groupe :
                            </p>
                            <p>
                                {Groupe[0].date_arret_activite_du_Groupe == null
                                    ? '/'
                                    : Groupe[0].date_arret_activite_du_Groupe
                                          .toString()
                                          .split('T')[0]}
                            </p>
                        </div>
                        <div className={style.info} id='hide1'>
                            <a
                                className={style.linkID}
                                href={`/societe/${params.societeID}/groupe/${params.groupeID}/groupe-site-link`}
                            >
                                <p className={style.titre}>
                                    {' '}
                                    Utilisateur(s) suivant le groupe{' '}
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
