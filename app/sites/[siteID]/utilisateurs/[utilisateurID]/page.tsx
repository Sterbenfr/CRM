'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../styles/components.module.css'
import Image from 'next/image'
import SelectComponent from '@/components/select-component'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'
import withAuthorization from '@/components/withAuthorization'

interface ExtendedSession extends Session {
    user: {
        name?: string | null
        email?: string | null
        image?: string | null
        role?: string // Add the role property
        id?: string
    }
}

interface UtilisateurID {
    code_utilisateur: number
    civilite: string
    nom: string
    prenom: string
    tel_perso: string
    mail: string
    commentaires: string
    code_type_utilisateur: string
    libelle_type_utilisateur: string
}

function UtilisateurPage({
    params,
}: {
    params: { siteID: string; utilisateurID: string }
}) {
    const [utilisateur, setUtilisateur] = useState<UtilisateurID[]>([])
    const [modify, setModify] = useState<boolean>(false)
    const [session, setSession] = useState<ExtendedSession | null>(null)
    const [modifiedUtilisateur, setModifiedUtilisateur] = useState<
        Partial<UtilisateurID>
    >({})

    useEffect(() => {
        const fetchSessionAndUtilisateur = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)

            if (params.utilisateurID) {
                const res = await fetch(
                    `../../../../api/sites/${params.siteID}/utilisateurs/${params.utilisateurID}`,
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const utilisateurData: UtilisateurID[] = await res.json()
                setUtilisateur(utilisateurData)
            }
        }

        fetchSessionAndUtilisateur()
    }, [params.utilisateurID, params.siteID, modify])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target

        setModifiedUtilisateur(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleTypeUtilisateurChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (!utilisateur || utilisateur.length === 0 || !session) return
        let value = event.target.value

        if (utilisateur[0].code_type_utilisateur !== '' && value === '') {
            value = utilisateur[0].code_type_utilisateur
        }
        setModifiedUtilisateur({
            ...modifiedUtilisateur,
            code_type_utilisateur: value,
        })
    }

    const handleCiviliteChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (!utilisateur || utilisateur.length === 0 || !session) return

        setModifiedUtilisateur({
            ...modifiedUtilisateur,
            civilite: event.target.value,
        })
    }

    const handleSubmit = async () => {
        const jsonPayload = {
            ...modifiedUtilisateur,
        }

        // Convert non-file data to JSON
        const body = JSON.stringify(jsonPayload)

        try {
            const res = await fetch(
                `../../../../api/sites/${params.siteID}/utilisateurs/${params.utilisateurID}`,
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

            const updatedUtilisateur: UtilisateurID[] = await res.json()
            setUtilisateur(updatedUtilisateur)
            setModify(false)
        } catch (error) {
            console.error('Error submitting form:', error)
        }
        window.location.reload()
    }

    if (
        !Array.isArray(utilisateur) ||
        utilisateur.length === 0 ||
        typeof utilisateur[0]?.code_utilisateur === 'undefined'
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

        applyPrintStyles()
        window.print()
        document.body.innerHTML = originalContents
        window.location.reload()
    }
    return (
        <div className={style.idPage}>
            <div className={style.croixID}>
                <h1 className={style.titre_global}>Utilisateurs</h1>
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
                session.user.role === ('AD' || 'SU') && (
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
                                <p className={style.titre}>
                                    Code de l&apos;utilisateur :
                                </p>
                                <p>
                                    {utilisateur[0].code_utilisateur == null
                                        ? '/'
                                        : utilisateur[0].code_utilisateur}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Civilite :</p>
                                {modify &&
                                (session?.user.role === 'AD' ||
                                    session?.user.role === 'SU') ? (
                                    <SelectComponent
                                        url='../../../../api/select/genre'
                                        onChange={e => handleCiviliteChange(e)}
                                    />
                                ) : (
                                    <p>
                                        {utilisateur[0].civilite == (null || '')
                                            ? '/'
                                            : utilisateur[0].civilite === 'M.'
                                              ? 'Monsieur'
                                              : utilisateur[0].civilite ===
                                                  'Mme'
                                                ? 'Madame'
                                                : 'Non renseigné'}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Nom :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'SU') ? (
                                    <input
                                        className={style.selectF}
                                        type='input'
                                        name='nom'
                                        value={modifiedUtilisateur.nom}
                                        placeholder={
                                            utilisateur[0].nom === null ||
                                            utilisateur[0].nom === ''
                                                ? 'Exemple: Dupont'
                                                : 'Actuellement: ' +
                                                  utilisateur[0].nom
                                        }
                                        maxLength={20}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {utilisateur[0].nom == (null || '')
                                            ? '/'
                                            : utilisateur[0].nom}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Prénom :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'SU') ? (
                                    <input
                                        className={style.selectF}
                                        type='input'
                                        name='prenom'
                                        value={modifiedUtilisateur.prenom}
                                        placeholder={
                                            utilisateur[0].prenom === null ||
                                            utilisateur[0].prenom === ''
                                                ? 'Exemple: Jean'
                                                : 'Actuellement: ' +
                                                  utilisateur[0].prenom
                                        }
                                        maxLength={20}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {utilisateur[0].prenom == (null || '')
                                            ? '/'
                                            : utilisateur[0].prenom}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={style.col_2}>
                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Type d&apos;utilisateur :
                                </p>
                                {modify &&
                                (session?.user.role === 'AD' ||
                                    session?.user.role === 'SU') ? (
                                    <SelectComponent
                                        url='../../../../api/select/utilisateurs'
                                        onChange={e =>
                                            handleTypeUtilisateurChange(e)
                                        }
                                    />
                                ) : (
                                    <p>
                                        {utilisateur[0]
                                            .libelle_type_utilisateur == null
                                            ? '/'
                                            : utilisateur[0]
                                                  .libelle_type_utilisateur}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Téléphone personel :
                                </p>
                                {modify &&
                                session?.user.role === ('AD' || 'SU') ? (
                                    <input
                                        className={style.selectF}
                                        type='number'
                                        name='tel_perso'
                                        value={modifiedUtilisateur.tel_perso}
                                        placeholder={
                                            utilisateur[0].tel_perso === null ||
                                            utilisateur[0].tel_perso === ''
                                                ? 'Exemple: 0658905910'
                                                : 'Actuellement: ' +
                                                  utilisateur[0].tel_perso
                                        }
                                        onInput={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => {
                                            if (e.target.value.length > 12) {
                                                e.target.value =
                                                    e.target.value.slice(0, 12)
                                            }
                                        }}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {utilisateur[0].tel_perso ==
                                        (null || '')
                                            ? '/'
                                            : utilisateur[0].tel_perso}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Mail :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'SU') ? (
                                    <input
                                        className={style.selectF}
                                        type='mail'
                                        name='mail'
                                        value={modifiedUtilisateur.mail}
                                        placeholder={
                                            utilisateur[0].mail === null ||
                                            utilisateur[0].mail === ''
                                                ? 'Exemple: Jean.dupont@gmail.com'
                                                : 'Actuellement: ' +
                                                  utilisateur[0].mail
                                        }
                                        maxLength={50}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {utilisateur[0].mail == (null || '')
                                            ? '/'
                                            : utilisateur[0].mail}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Commentaires :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'SU') ? (
                                    <input
                                        className={style.selectF}
                                        type='input'
                                        name='commentaires'
                                        value={modifiedUtilisateur.commentaires}
                                        placeholder={
                                            utilisateur[0].commentaires ===
                                                null ||
                                            utilisateur[0].commentaires === ''
                                                ? 'Exemple: Manutentionnaire de Dunkerque'
                                                : 'Actuellement: ' +
                                                  utilisateur[0].commentaires
                                        }
                                        maxLength={200}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {utilisateur[0].commentaires ==
                                        (null || '')
                                            ? '/'
                                            : utilisateur[0].commentaires}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuthorization(UtilisateurPage, ['AD', 'SU'])
