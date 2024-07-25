'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../styles/components.module.css'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'
import fileUpload, { setFile } from '@/components/fileUploadModify'

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
    Logo: string
    site_Web: string
    commentaires: string
    date_arret_activite_du_Groupe: Date
}

export default function GroupePage({
    params,
}: {
    params: { societeID: string; groupeID: string }
}) {
    const [groupe, setGroupe] = useState<GroupeID[]>([])
    const [session, setSession] = useState<ExtendedSession | null>(null)
    const [modify, setModify] = useState<boolean>(false)
    const [modifiedGroupe, setModifiedGroupe] = useState<Partial<GroupeID>>({})

    useEffect(() => {
        const fetchSessionAndGroupe = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)

            if (params.groupeID) {
                const res = await fetch(
                    `../../../../api/societe/${params.societeID}/groupe/${params.groupeID}`,
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const GroupeData: GroupeID[] = await res.json()
                setGroupe(GroupeData)
            }
        }

        fetchSessionAndGroupe()
    }, [params.groupeID, params.societeID, modify])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target

        setModifiedGroupe(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const formatDate = (dateString: string | number | Date) => {
        return dateString
            ? new Date(dateString).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
    }

    const handleLogoChange: React.ChangeEventHandler<
        HTMLInputElement
    > = event => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0])
        }
    }

    const handleSubmit = async () => {
        const filePaths: string[] = await fileUpload(
            '../../../../api/upload/image',
        )

        const jsonPayload = {
            ...modifiedGroupe,
            Logo: filePaths[0],
        }

        // Convert non-file data to JSON
        const body = JSON.stringify(jsonPayload)

        try {
            const res = await fetch(
                `../../../../api/societe/${params.societeID}/groupe/${params.groupeID}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: body,
                },
            )

            if (!res.ok) {
                const errorDetail = await res.text()
                console.error('Failed to update data:', errorDetail)
                throw new Error('Failed to update data')
            }

            const updatedGroupe: GroupeID[] = await res.json()
            setGroupe(updatedGroupe)
            setModify(false)
        } catch (error) {
            console.error('Error submitting form:', error)
        }
        window.location.reload()
    }

    if (
        !Array.isArray(groupe) ||
        groupe.length === 0 ||
        typeof groupe[0]?.code_groupe === 'undefined'
    )
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
                        src='/IMG/return.svg'
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
                        <button
                            onClick={() => {
                                if (modify) {
                                    handleSubmit()
                                } else {
                                    setModify(true)
                                }
                            }}
                            className={style.btnModif}
                        >
                            {modify ? 'Envoyer' : 'Modifier'}
                        </button>
                        <button
                            className={style.btnModif}
                            onClick={() => {
                                if (!modify) {
                                    Print()
                                }
                            }}
                            hidden={modify}
                        >
                            Imprimer
                        </button>
                    </div>
                )}

            <div id='printablediv'>
                <div className={style.info_id}>
                    <div className={style.col_1}>
                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Code du groupe :</p>
                                <p>
                                    {groupe[0].code_groupe == null
                                        ? '/'
                                        : groupe[0].code_groupe}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Nom du groupe :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='input'
                                        name='nom_du_Groupe'
                                        value={modifiedGroupe.nom_du_Groupe}
                                        placeholder={
                                            groupe[0].nom_du_Groupe === null ||
                                            groupe[0].nom_du_Groupe === ''
                                                ? 'Exemple: Groupe Alpha'
                                                : 'Actuellement: ' +
                                                  groupe[0].nom_du_Groupe
                                        }
                                        maxLength={50}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {groupe[0].nom_du_Groupe == null
                                            ? '/'
                                            : groupe[0].nom_du_Groupe}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Site web :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='input'
                                        name='site_Web'
                                        value={modifiedGroupe.site_Web}
                                        placeholder={
                                            groupe[0].site_Web === null ||
                                            groupe[0].site_Web === ''
                                                ? 'Exemple: http://www.groupealpha.com'
                                                : 'Actuellement: ' +
                                                  groupe[0].site_Web
                                        }
                                        maxLength={255}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {groupe[0].site_Web == null
                                            ? '/'
                                            : groupe[0].site_Web}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Logo :</p>

                                {modify &&
                                session?.user.role === ('AD' || 'RC') ? (
                                    <input
                                        className={style.selectF}
                                        type='file'
                                        name='Logo_file'
                                        onChange={handleLogoChange}
                                    />
                                ) : groupe[0].Logo == null ? (
                                    <p>/</p>
                                ) : typeof groupe[0].Logo === 'string' ? (
                                    <a href={groupe[0].Logo} download='Logo'>
                                        Télécharger le logo
                                    </a>
                                ) : (
                                    <a href={groupe[0].Logo} download='Logo'>
                                        Télécharger le logo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={style.col_2}>
                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Commentaires :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='input'
                                        name='commentaires'
                                        value={modifiedGroupe.commentaires}
                                        placeholder={
                                            groupe[0].commentaires === null ||
                                            groupe[0].commentaires === ''
                                                ? 'Exemple: Groupe actif en dons alimentaires'
                                                : 'Actuellement: ' +
                                                  groupe[0].commentaires
                                        }
                                        maxLength={200}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {groupe[0].commentaires == null
                                            ? '/'
                                            : groupe[0].commentaires}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Date d&apos;arrêt d&apos;activité du groupe
                                    :
                                </p>
                                {modify &&
                                (session?.user.role === 'AD' ||
                                    session?.user.role === 'RC') ? (
                                    <input
                                        type='date'
                                        name='date_arret_activite_du_Groupe'
                                        value={formatDate(
                                            modifiedGroupe.date_arret_activite_du_Groupe ||
                                                groupe[0]
                                                    .date_arret_activite_du_Groupe,
                                        )}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {groupe[0]
                                            .date_arret_activite_du_Groupe ==
                                        null
                                            ? '/'
                                            : formatDate(
                                                  groupe[0]
                                                      .date_arret_activite_du_Groupe,
                                              )}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className={style.info} id='hide1'>
                            {!modify && (
                                <a
                                    className={style.linkID}
                                    href={`/societe/${params.societeID}/groupe/${params.groupeID}/groupe-site-link`}
                                >
                                    <p className={style.titre}>
                                        {' '}
                                        Utilisateur(s) suivant le groupe{' '}
                                    </p>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
