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
        role?: string 
        id?: string
    }
}

interface InterlocuteurID {
    code_interlocuteur: number
    code_site: number
    civilite: string
    nom: string
    prenom: string
    tel_perso: string
    mail: string
    commentaires: string
    code_type_interlocuteur: string
    libelle_type_utilisateur: string
}

function InterlocuteurPage({
    params,
}: {
    params: { siteID: string; interlocuteursID: string }
}) {
    const [interlocuteur, setInterlocuteur] = useState<InterlocuteurID[]>([])
    const [modify, setModify] = useState<boolean>(false)
    const [session, setSession] = useState<ExtendedSession | null>(null)
    const [modifiedInterlocuteur, setModifiedInterlocuteur] = useState<
        Partial<InterlocuteurID>
    >({})
    let [canSubmit] = useState<boolean>(true)

    useEffect(() => {
        const fetchSessionAndInterlocuteur = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)

            if (params.interlocuteursID) {
                const res = await fetch(
                    `../../../../api/sites/${params.siteID}/interlocuteurs/${params.interlocuteursID}`,
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const interlocuteurData: InterlocuteurID[] = await res.json()
                setInterlocuteur(interlocuteurData)
            }
        }

        fetchSessionAndInterlocuteur()
    }, [params.interlocuteursID, params.siteID, modify])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target

        setModifiedInterlocuteur(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleTypeInterlocuteurChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (!interlocuteur || interlocuteur.length === 0 || !session) return
        let value = event.target.value

        if (interlocuteur[0].code_type_interlocuteur !== '' && value === '') {
            value = interlocuteur[0].code_type_interlocuteur
        }
        setModifiedInterlocuteur({
            ...modifiedInterlocuteur,
            code_type_interlocuteur: value,
        })
    }

    const handleCiviliteChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (!interlocuteur || interlocuteur.length === 0 || !session) return

        setModifiedInterlocuteur({
            ...modifiedInterlocuteur,
            civilite: event.target.value,
        })
    }

    if (
        !Array.isArray(interlocuteur) ||
        interlocuteur.length === 0 ||
        typeof interlocuteur[0]?.code_interlocuteur === 'undefined'
    )
        return (
            <div className={style.page}>
                <h2 className={style.load}>Chargement...</h2>
            </div>
        )

    const requiredValue = () => {
        const keysToCheck = [
            'civilite',
            'nom',
            'prenom',
            'code_type_interlocuteur',
            'tel_perso',
            'mail',
        ]

        keysToCheck.forEach(key => {
            if (
                modifiedInterlocuteur[key as keyof InterlocuteurID] === null ||
                modifiedInterlocuteur[key as keyof InterlocuteurID] === ''
            ) {
                const input = document.querySelector(`input[name=${key}]`)
                if (input) {
                    input.classList.add(style.isReq)
                }
                setModifiedInterlocuteur(prevState => ({
                    ...prevState,
                    [key]: interlocuteur[0][key as keyof InterlocuteurID],
                }))
            }
        })
    }

    const handleSubmit = async () => {
        requiredValue()

        if (
            !modifiedInterlocuteur.nom ||
            modifiedInterlocuteur.nom.trim() === '' ||
            !modifiedInterlocuteur.prenom ||
            modifiedInterlocuteur.prenom.trim() === '' ||
            !(modifiedInterlocuteur.tel_perso || modifiedInterlocuteur.mail)
        ) {
            canSubmit = false
        } else {
            canSubmit = true
        }

        if (canSubmit) {
            const jsonPayload = {
                ...modifiedInterlocuteur,
            }

            const body = JSON.stringify(jsonPayload)

            try {
                const res = await fetch(
                    `../../../../api/sites/${params.siteID}/interlocuteurs/${params.interlocuteursID}`,
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

                const updatedInterlocuteur: InterlocuteurID[] = await res.json()
                setInterlocuteur(updatedInterlocuteur)
                setModify(false)
            } catch (error) {
                console.error('Error submitting form:', error)
            }
            window.location.reload()
        }
    }

    const initialValue = () => {
        const keysToCheck = [
            'nom',
            'prenom',
            'tel_perso',
            'mail',
            'commentaires',
        ]

        keysToCheck.forEach(key => {
            if (
                interlocuteur[0][key as keyof InterlocuteurID] !== null &&
                interlocuteur[0][key as keyof InterlocuteurID] !== ''
            ) {
                setModifiedInterlocuteur(prevState => ({
                    ...prevState,
                    [key]: interlocuteur[0][key as keyof InterlocuteurID],
                }))
            }
        })
    }

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
                <h1 className={style.titre_global}>Interlocuteur</h1>
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
                                    initialValue()
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
                                    Code de l&apos;interlocuteur :
                                </p>
                                <p>
                                    {interlocuteur[0].code_interlocuteur == null
                                        ? '/'
                                        : interlocuteur[0].code_interlocuteur}
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
                                        {interlocuteur[0].civilite ==
                                        (null || '')
                                            ? '/'
                                            : interlocuteur[0].civilite === 'M.'
                                              ? 'Monsieur'
                                              : interlocuteur[0].civilite ===
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
                                        value={modifiedInterlocuteur.nom ?? ''}
                                        placeholder={
                                            interlocuteur[0].nom === null ||
                                            interlocuteur[0].nom === ''
                                                ? 'Exemple: Dupont'
                                                : 'Actuellement: ' +
                                                  interlocuteur[0].nom
                                        }
                                        maxLength={20}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {interlocuteur[0].nom == (null || '')
                                            ? '/'
                                            : interlocuteur[0].nom}
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
                                        value={
                                            modifiedInterlocuteur.prenom ?? ''
                                        }
                                        placeholder={
                                            interlocuteur[0].prenom === null ||
                                            interlocuteur[0].prenom === ''
                                                ? 'Exemple: Jean'
                                                : 'Actuellement: ' +
                                                  interlocuteur[0].prenom
                                        }
                                        maxLength={20}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {interlocuteur[0].prenom == (null || '')
                                            ? '/'
                                            : interlocuteur[0].prenom}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Type d&apos;interlocuteur :
                                </p>
                                {modify &&
                                (session?.user.role === 'AD' ||
                                    session?.user.role === 'SU') ? (
                                    <SelectComponent
                                        url='../../../../api/select/utilisateurs'
                                        onChange={e =>
                                            handleTypeInterlocuteurChange(e)
                                        }
                                    />
                                ) : (
                                    <p>
                                        {interlocuteur[0]
                                            .libelle_type_utilisateur == null
                                            ? '/'
                                            : interlocuteur[0]
                                                  .libelle_type_utilisateur}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={style.col_2}>
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
                                        value={
                                            modifiedInterlocuteur.tel_perso ??
                                            ''
                                        }
                                        placeholder={
                                            interlocuteur[0].tel_perso ===
                                                null ||
                                            interlocuteur[0].tel_perso === ''
                                                ? 'Exemple: 0658905910'
                                                : 'Actuellement: ' +
                                                  interlocuteur[0].tel_perso
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
                                        {interlocuteur[0].tel_perso ==
                                        (null || '')
                                            ? '/'
                                            : interlocuteur[0].tel_perso}
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
                                        value={modifiedInterlocuteur.mail ?? ''}
                                        placeholder={
                                            interlocuteur[0].mail === null ||
                                            interlocuteur[0].mail === ''
                                                ? 'Exemple: Jean.dupont@gmail.com'
                                                : 'Actuellement: ' +
                                                  interlocuteur[0].mail
                                        }
                                        maxLength={50}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {interlocuteur[0].mail == (null || '')
                                            ? '/'
                                            : interlocuteur[0].mail}
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
                                        value={
                                            modifiedInterlocuteur.commentaires
                                        }
                                        placeholder={
                                            interlocuteur[0].commentaires ===
                                                null ||
                                            interlocuteur[0].commentaires === ''
                                                ? 'Exemple: Manutentionnaire de Dunkerque'
                                                : 'Actuellement: ' +
                                                  interlocuteur[0].commentaires
                                        }
                                        maxLength={200}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {interlocuteur[0].commentaires ==
                                        (null || '')
                                            ? '/'
                                            : interlocuteur[0].commentaires}
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

export default withAuthorization(InterlocuteurPage, ['AD', 'SU'])
