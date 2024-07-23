'use client'
import { useEffect, useState } from 'react'
import style from '../../../styles/components.module.css'
import Image from 'next/image'
import SelectComponent from '@/components/select-component'
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
interface SiteID {
    code_site: number
    designation_longue: string
    designation_courte: string
    adresse: string
    code_type_site: string
    date_ouverture: Date
    date_fermeture: Date
    numero_telephone: string
    adresse_mail: string
    commentaires: string
}

export default function SitePage({ params }: { params: { siteID: string } }) {
    const [site, setSite] = useState<SiteID[]>([])
    const [session, setSession] = useState<ExtendedSession | null>(null)
    const [modify, setModify] = useState<boolean>(false)
    const [modifiedSite, setModifiedSite] = useState<Partial<SiteID>>({})

    useEffect(() => {
        const fetchSessionAndSite = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)
            if (params.siteID) {
                const res = await fetch(`../../api/sites/${params.siteID}`)

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const siteData: SiteID[] = await res.json()
                setSite(siteData)
            }
        }

        fetchSessionAndSite()
    }, [params.siteID, modify])

    const handleTypeSiteChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (!site || site.length === 0 || !session) return
        let value = event.target.value

        if (site[0].code_type_site !== '' && value === '') {
            value = site[0].code_type_site
        }

        setModifiedSite({
            ...modifiedSite,
            code_type_site: value,
        })
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target

        setModifiedSite(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleDateFermetureChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        if (!site || site.length === 0 || !session) return
        const { name, value } = e.target

        const dateOuverture = new Date(site[0].date_ouverture)
        const dateFermeture = new Date(value)

        let finalValue = value
        if (dateFermeture < dateOuverture) {
            finalValue = formatDate(dateOuverture)
        }

        setModifiedSite(prevState => ({
            ...prevState,
            [name]: finalValue,
        }))
    }

    const formatDate = (dateString: string | number | Date) => {
        return dateString
            ? new Date(dateString).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
    }

    const handleSubmit = async () => {
        const jsonPayload = {
            ...modifiedSite,
        }

        // Convert non-file data to JSON
        const body = JSON.stringify(jsonPayload)

        try {
            const res = await fetch(`../../api/sites/${params.siteID}`, {
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

            const updatedSite: SiteID[] = await res.json()
            setSite(updatedSite)
            setModify(false)
        } catch (error) {
            console.error('Error submitting form:', error)
        }
        window.location.reload()
    }

    if (
        !Array.isArray(site) ||
        site.length === 0 ||
        typeof site[0]?.code_site === 'undefined'
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
                <h1 className={style.titre_global}>Détails des sites :</h1>
                <a href='/sites' className={style.btnC}>
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
                                <p className={style.titre}>Code du site :</p>
                                <p>
                                    {site[0].code_site == null
                                        ? '/'
                                        : site[0].code_site}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Désignation longue :
                                </p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='input'
                                        name='designation_longue'
                                        value={modifiedSite.designation_longue}
                                        placeholder={
                                            site[0].designation_longue ===
                                                null ||
                                            site[0].designation_longue === ''
                                                ? 'Exemple: Siège social de la société'
                                                : 'Actuellement: ' +
                                                  site[0].designation_longue
                                        }
                                        maxLength={40}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {site[0].designation_longue ==
                                        (null || '')
                                            ? '/'
                                            : site[0].designation_longue}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Désignation courte :
                                </p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='input'
                                        name='designation_courte'
                                        value={modifiedSite.designation_courte}
                                        placeholder={
                                            site[0].designation_courte ===
                                                null ||
                                            site[0].designation_courte === ''
                                                ? 'Exemple: Siège'
                                                : 'Actuellement: ' +
                                                  site[0].designation_courte
                                        }
                                        maxLength={15}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {site[0].designation_courte ==
                                        (null || '')
                                            ? '/'
                                            : site[0].designation_courte}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Adresse :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='input'
                                        name='adresse'
                                        value={modifiedSite.adresse}
                                        placeholder={
                                            site[0].adresse === null ||
                                            site[0].adresse === ''
                                                ? 'Exemple: 6 rue de la paix, 75000 Paris'
                                                : 'Actuellement: ' +
                                                  site[0].adresse
                                        }
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {site[0].adresse == (null || '')
                                            ? '/'
                                            : site[0].adresse}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Date d&apos;ouverture :
                                </p>
                                <p>
                                    {site[0].date_ouverture == null
                                        ? '/'
                                        : formatDate(site[0].date_ouverture)}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Date de fermeture :
                                </p>
                                {modify &&
                                (session?.user.role === 'AD' ||
                                    session?.user.role === 'RC') ? (
                                    <input
                                        type='date'
                                        name='date_fermeture'
                                        value={formatDate(
                                            modifiedSite.date_fermeture ||
                                                site[0].date_fermeture,
                                        )}
                                        onChange={e =>
                                            handleDateFermetureChange(e)
                                        }
                                    />
                                ) : (
                                    <p>
                                        {site[0].date_fermeture == null
                                            ? '/'
                                            : formatDate(
                                                  site[0].date_fermeture,
                                              )}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={style.col_2}>
                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Type de site :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <SelectComponent
                                        url='../../api/sites/type-site-types'
                                        onChange={e => handleTypeSiteChange(e)}
                                    />
                                ) : (
                                    <p>
                                        {site[0].code_type_site === null || ''
                                            ? '/'
                                            : site[0].code_type_site}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Numero de téléphone :
                                </p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='number'
                                        name='numero_telephone'
                                        value={modifiedSite.numero_telephone}
                                        placeholder={
                                            site[0].numero_telephone === null ||
                                            site[0].numero_telephone === ''
                                                ? 'Exemple: 0658905910'
                                                : 'Actuellement: ' +
                                                  site[0].numero_telephone
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
                                        {site[0].numero_telephone ==
                                        (null || '')
                                            ? '/'
                                            : site[0].numero_telephone}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Adresse mail :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='mail'
                                        name='adresse_mail'
                                        value={modifiedSite.adresse_mail}
                                        placeholder={
                                            site[0].adresse_mail === null ||
                                            site[0].adresse_mail === ''
                                                ? 'Exemple: Siege.social@gmail.com'
                                                : 'Actuellement: ' +
                                                  site[0].adresse_mail
                                        }
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {site[0].adresse_mail == (null || '')
                                            ? '/'
                                            : site[0].adresse_mail}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Commentaires :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='input'
                                        name='commentaires'
                                        value={modifiedSite.commentaires}
                                        placeholder={
                                            site[0].commentaires === null ||
                                            site[0].commentaires === ''
                                                ? 'Exemple: Siège social de la société'
                                                : 'Actuellement: ' +
                                                  site[0].commentaires
                                        }
                                        maxLength={200}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {site[0].commentaires == (null || '')
                                            ? '/'
                                            : site[0].commentaires}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className={style.info} id='hide1'>
                            {!modify && (
                                <a
                                    className={style.linkID}
                                    href={`/sites/${params.siteID}/utilisateurs`}
                                >
                                    <p className={style.titre}>
                                        {' '}
                                        Utilisateurs du site{' '}
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
