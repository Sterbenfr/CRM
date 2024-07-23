'use client'
import { useEffect, useState } from 'react'
import style from '../../../styles/components.module.css'
import Image from 'next/image'
import SelectComponent from '@/components/select-component'
import SearchComponent from '@/components/searchComponent'
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

interface SocieteID {
    code_Societe: number
    raison_sociale: string
    nom_commercial: string
    Logo: Blob
    site_Web: string
    Siren: string
    code_type_activite_Societe: string
    commentaires: string
    code_Groupe_appartenance: string
    date_arret_activite_Societe: Date
}

export default function SocietePage({
    params,
}: {
    params: { societeID: string }
}) {
    const [societe, setSociete] = useState<SocieteID[]>([])
    const [session, setSession] = useState<ExtendedSession | null>(null)
    const [modify, setModify] = useState<boolean>(false)
    const [modifiedSociete, setModifiedSociete] = useState<Partial<SocieteID>>(
        {},
    )

    useEffect(() => {
        const fetchSessionAndSociete = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)

            if (params.societeID) {
                const res = await fetch(`../../api/societe/${params.societeID}`)

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const SocieteData: SocieteID[] = await res.json()
                setSociete(SocieteData)
            }
        }

        fetchSessionAndSociete()
    }, [params.societeID, modify])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target

        setModifiedSociete(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleActiviteChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (!societe || societe.length === 0 || !session) return
        let value = event.target.value

        if (societe[0].code_type_activite_Societe !== '' && value === '') {
            value = societe[0].code_type_activite_Societe
        }
        setModifiedSociete({
            ...modifiedSociete,
            code_type_activite_Societe: value,
        })
    }

    const handleAppartenanceChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (!societe || societe.length === 0 || !session) return
        let value = event.target.value

        if (societe[0].code_Groupe_appartenance !== '' && value === '') {
            value = societe[0].code_Groupe_appartenance
        }
        setModifiedSociete({
            ...modifiedSociete,
            code_Groupe_appartenance: value,
        })
    }

    const formatDate = (dateString: string | number | Date) => {
        return dateString
            ? new Date(dateString).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
    }

    const handleSubmit = async () => {
        const jsonPayload = {
            ...modifiedSociete,
        }

        // Convert non-file data to JSON
        const body = JSON.stringify(jsonPayload)

        try {
            const res = await fetch(`../../api/societe/${params.societeID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            })

            if (!res.ok) {
                const errorDetail = await res.text()
                console.error('Failed to update data:', errorDetail)
                throw new Error('Failed to update data')
            }

            const updatedSociete: SocieteID[] = await res.json()
            setSociete(updatedSociete)
            setModify(false)
        } catch (error) {
            console.error('Error submitting form:', error)
        }
        window.location.reload()
    }

    if (
        !Array.isArray(societe) ||
        societe.length === 0 ||
        typeof societe[0]?.code_Societe === 'undefined'
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
                <h1 className={style.titre_global}>
                    Détails de l&apos;entreprise
                </h1>
                <a href='javascript:history.go(-1)' className={style.btnC}>
                    <Image
                        className={style.CR}
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
                                <p className={style.titre}>
                                    Code de l&apos;entreprise :
                                </p>
                                <p>
                                    {societe[0].code_Societe == null
                                        ? '/'
                                        : societe[0].code_Societe}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Raison sociale :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='input'
                                        name='raison_sociale'
                                        value={modifiedSociete.raison_sociale}
                                        placeholder={
                                            societe[0].raison_sociale ===
                                                null ||
                                            societe[0].raison_sociale === ''
                                                ? 'Exemple: Alpha Corporation'
                                                : 'Actuellement: ' +
                                                  societe[0].raison_sociale
                                        }
                                        maxLength={30}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {societe[0].raison_sociale ==
                                        (null || '')
                                            ? '/'
                                            : societe[0].raison_sociale}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Nom commercial :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='input'
                                        name='nom_commercial'
                                        value={modifiedSociete.nom_commercial}
                                        placeholder={
                                            societe[0].nom_commercial ===
                                                null ||
                                            societe[0].nom_commercial === ''
                                                ? 'Exemple: Alpha Corp'
                                                : 'Actuellement: ' +
                                                  societe[0].nom_commercial
                                        }
                                        maxLength={30}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {societe[0].nom_commercial ==
                                        (null || '')
                                            ? '/'
                                            : societe[0].nom_commercial}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Code de l&apos;entreprise
                                    d&apos;appartenance :
                                </p>
                                {modify &&
                                (session?.user.role === 'AD' ||
                                    session?.user.role === 'RR') ? (
                                    <SearchComponent
                                        url='../../api/select/societe/groupe'
                                        onChange={e =>
                                            handleAppartenanceChange(e)
                                        }
                                        placeholder='Exemple: Groupe Alpha'
                                    />
                                ) : (
                                    <p>
                                        {societe[0].code_Groupe_appartenance ==
                                        null
                                            ? '/'
                                            : societe[0]
                                                  .code_Groupe_appartenance}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Siren :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='number'
                                        name='Siren'
                                        value={modifiedSociete.Siren}
                                        placeholder={
                                            societe[0].Siren === null ||
                                            societe[0].Siren === ''
                                                ? 'Exemple: 453684259'
                                                : 'Actuellement: ' +
                                                  societe[0].Siren
                                        }
                                        onInput={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => {
                                            if (e.target.value.length > 9) {
                                                e.target.value =
                                                    e.target.value.slice(0, 9)
                                            }
                                        }}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {societe[0].Siren == (null || '')
                                            ? '/'
                                            : societe[0].Siren}
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
                                        value={modifiedSociete.site_Web}
                                        placeholder={
                                            societe[0].site_Web === null ||
                                            societe[0].site_Web === ''
                                                ? 'Exemple: http://www.alpha.com/'
                                                : 'Actuellement: ' +
                                                  societe[0].site_Web
                                        }
                                        maxLength={255}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {societe[0].site_Web == (null || '')
                                            ? '/'
                                            : societe[0].site_Web}
                                    </p>
                                )}
                            </div>
                        </div>
                        
                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Type d&apos;activite de l&apos;entreprise :
                                </p>
                                {modify &&
                                (session?.user.role === 'AD' ||
                                    session?.user.role === 'RR') ? (
                                    <SelectComponent
                                        url='../../api/societe/type-activite-societe'
                                        onChange={e => handleActiviteChange(e)}
                                    />
                                ) : (
                                    <p>
                                        {societe[0]
                                            .code_type_activite_Societe ==
                                        (null || '')
                                            ? '/'
                                            : societe[0]
                                                  .code_type_activite_Societe}
                                    </p>
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
                                        value={modifiedSociete.commentaires}
                                        placeholder={
                                            societe[0].commentaires === null ||
                                            societe[0].commentaires === ''
                                                ? 'Exemple: Societe de service informatique'
                                                : 'Actuellement: ' +
                                                  societe[0].commentaires
                                        }
                                        maxLength={200}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {societe[0].commentaires == (null || '')
                                            ? '/'
                                            : societe[0].commentaires}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Date d&apos;arrêt d&apos;activité :
                                </p>
                                {modify &&
                                (session?.user.role === 'AD' ||
                                    session?.user.role === 'RC') ? (
                                    <input
                                        type='date'
                                        name='date_arret_activite_Societe'
                                        value={formatDate(
                                            modifiedSociete.date_arret_activite_Societe ||
                                                societe[0]
                                                    .date_arret_activite_Societe,
                                        )}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {societe[0]
                                            .date_arret_activite_Societe == null
                                            ? '/'
                                            : formatDate(
                                                  societe[0]
                                                      .date_arret_activite_Societe,
                                              )}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info} id='hide1'>
                                {!modify && (
                                    <a
                                        className={style.linkID}
                                        href={`/societe/${params.societeID}/entite`}
                                    >
                                        <p className={style.titre}>
                                            {' '}
                                            Entité(s) appartenant à
                                            l&apos;entreprise{' '}
                                        </p>
                                    </a>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info} id='hide2'>
                                {!modify && (
                                    <a
                                        className={style.linkID}
                                        href={`/societe/${params.societeID}/groupe`}
                                    >
                                        <p className={style.titre}>
                                            {' '}
                                            Groupe d&apos;appartenance de
                                            l&apos;entreprise{' '}
                                        </p>
                                    </a>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info} id='hide3'>
                                {!modify && (
                                    <a
                                        className={style.linkID}
                                        href={`/societe/${params.societeID}/societe-site-link`}
                                    >
                                        <p className={style.titre}>
                                            {' '}
                                            Utilisateur(s) suivant
                                            l&apos;entreprise{' '}
                                        </p>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
