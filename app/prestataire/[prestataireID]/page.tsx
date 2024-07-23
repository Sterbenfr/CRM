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
        role?: string
        id?: string
    }
}

interface PrestataireID {
    code_Prestataire: number
    TP_libelle: string
    raison_sociale: string
    nom_commercial: string
    Siren: string
    Siret: string
    telephone: string
    mail: string
    adresse: string
    civilite_contact_prestataire: string
    nom_contact_prestataire: string
    prenom_contact_prestataire: string
    telephone_contact_prestataire: string
    mail_contact_prestataire: string
    commentaires: string
    date_arret_activite_du_prestataire: Date
}

export default function PrestatairePage({
    params,
}: {
    params: { prestataireID: string }
}) {
    const [prestataire, setPrestataire] = useState<PrestataireID[] | null>()
    const [session, setSession] = useState<ExtendedSession | null>(null)
    const [modify, setModify] = useState<boolean>(false)
    const [modifiedPrestataire, setModifiedPrestataire] = useState<
        Partial<PrestataireID>
    >({})

    useEffect(() => {
        const fetchSessionAndPrestataire = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)

            if (params.prestataireID) {
                const res = await fetch(
                    `../../api/prestataire/${params.prestataireID}`,
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const prestataireData: PrestataireID[] = await res.json()
                setPrestataire(prestataireData)
            }
        }

        fetchSessionAndPrestataire()
    }, [params.prestataireID, modify])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target

        setModifiedPrestataire(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleTypePrestataireChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (!prestataire || prestataire.length === 0 || !session) return
        let value = event.target.value

        if (prestataire[0].TP_libelle !== '' && value === '') {
            value = prestataire[0].TP_libelle
        }
        setModifiedPrestataire({
            ...modifiedPrestataire,
            TP_libelle: value,
        })
    }

    const handleCiviliteChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (!prestataire || prestataire.length === 0 || !session) return

        setModifiedPrestataire({
            ...modifiedPrestataire,
            civilite_contact_prestataire: event.target.value,
        })
    }

    const formatDate = (dateString: string | number | Date) => {
        return dateString
            ? new Date(dateString).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
    }

    const handleSubmit = async () => {
        const jsonPayload = {
            ...modifiedPrestataire,
        }

        // Convert non-file data to JSON
        const body = JSON.stringify(jsonPayload)

        try {
            const res = await fetch(
                `../../api/prestataire/${params.prestataireID}`,
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

            const updatedPrestataire: PrestataireID[] = await res.json()
            setPrestataire(updatedPrestataire)
            setModify(false)
        } catch (error) {
            console.error('Error submitting form:', error)
        }
        window.location.reload()
    }

    if (
        !Array.isArray(prestataire) ||
        prestataire.length === 0 ||
        typeof prestataire[0]?.code_Prestataire === 'undefined'
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
                <h1 className={style.titre_global}>Détails du prestataire</h1>
                <a href='/prestataire' className={style.btnC}>
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
                                    Code du prestataire :
                                </p>
                                <p>
                                    {prestataire[0].code_Prestataire == null
                                        ? '/'
                                        : prestataire[0].code_Prestataire}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Type du prestataire :
                                </p>
                                {modify &&
                                (session?.user.role === 'AD' ||
                                    session?.user.role === 'RR') ? (
                                    <SelectComponent
                                        url='../../api/prestataire/type-prestataires'
                                        onChange={e =>
                                            handleTypePrestataireChange(e)
                                        }
                                    />
                                ) : (
                                    <p>
                                        {prestataire[0].TP_libelle === null ||
                                        ''
                                            ? '/'
                                            : prestataire[0].TP_libelle}
                                    </p>
                                )}
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
                                        value={
                                            modifiedPrestataire.raison_sociale
                                        }
                                        placeholder={
                                            prestataire[0].raison_sociale ===
                                                null ||
                                            prestataire[0].raison_sociale === ''
                                                ? 'Exemple: Entreprise Alpha'
                                                : 'Actuellement: ' +
                                                  prestataire[0].raison_sociale
                                        }
                                        maxLength={30}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {prestataire[0].raison_sociale ===
                                        (null || '')
                                            ? '/'
                                            : prestataire[0].raison_sociale}
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
                                        value={
                                            modifiedPrestataire.nom_commercial
                                        }
                                        placeholder={
                                            prestataire[0].nom_commercial ==
                                                null ||
                                            prestataire[0].nom_commercial === ''
                                                ? 'Exemple: Alpha Corp'
                                                : 'Actuellement: ' +
                                                  prestataire[0].nom_commercial
                                        }
                                        maxLength={30}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {prestataire[0].nom_commercial ===
                                        (null || '')
                                            ? '/'
                                            : prestataire[0].nom_commercial}
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
                                        value={modifiedPrestataire.Siren}
                                        placeholder={
                                            prestataire[0].Siren == null ||
                                            prestataire[0].Siren == ''
                                                ? 'Exemple: 453684259'
                                                : 'Actuellement: ' +
                                                  prestataire[0].Siren
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
                                        {prestataire[0].Siren === (null || '')
                                            ? '/'
                                            : prestataire[0].Siren}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Siret :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='number'
                                        name='Siret'
                                        value={modifiedPrestataire.Siret}
                                        placeholder={
                                            prestataire[0].Siret == null ||
                                            prestataire[0].Siret == ''
                                                ? 'Exemple: 15269783246918'
                                                : 'Actuellement: ' +
                                                  prestataire[0].Siret
                                        }
                                        onInput={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => {
                                            if (e.target.value.length > 14) {
                                                e.target.value =
                                                    e.target.value.slice(0, 14)
                                            }
                                        }}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {prestataire[0].Siret == (null || '')
                                            ? '/'
                                            : prestataire[0].Siret}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Téléphone :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='number'
                                        name='telephone'
                                        value={modifiedPrestataire.telephone}
                                        placeholder={
                                            prestataire[0].telephone == null ||
                                            prestataire[0].telephone === ''
                                                ? 'Exemple: 0658905910'
                                                : 'Actuellement: ' +
                                                  prestataire[0].telephone
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
                                        {prestataire[0].telephone ==
                                        (null || '')
                                            ? '/'
                                            : prestataire[0].telephone}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Mail :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='mail'
                                        name='mail'
                                        value={modifiedPrestataire.mail}
                                        placeholder={
                                            prestataire[0].mail === null ||
                                            prestataire[0].mail === ''
                                                ? 'Exemple: Prestataire.prestataire@gmail.com'
                                                : 'Actuellement: ' +
                                                  prestataire[0].mail
                                        }
                                        maxLength={255}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {prestataire[0].mail == (null || '')
                                            ? '/'
                                            : prestataire[0].mail}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={style.col_2}>
                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Adresse :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='input'
                                        name='adresse'
                                        value={modifiedPrestataire.adresse}
                                        placeholder={
                                            prestataire[0].adresse == null ||
                                            prestataire[0].adresse === ''
                                                ? 'Exemple: 12 rue de la paix, 75000 Paris'
                                                : 'Actuellement: ' +
                                                  prestataire[0].adresse
                                        }
                                        maxLength={255}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {prestataire[0].adresse == (null || '')
                                            ? '/'
                                            : prestataire[0].adresse}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Civilité du contact :
                                </p>
                                {modify &&
                                (session?.user.role === 'AD' ||
                                    session?.user.role === 'RR') ? (
                                    <SelectComponent
                                        url='../../api/select/genre'
                                        onChange={e => handleCiviliteChange(e)}
                                    />
                                ) : (
                                    <p>
                                        {prestataire[0]
                                            .civilite_contact_prestataire ==
                                        (null || '')
                                            ? '/'
                                            : prestataire[0]
                                                    .civilite_contact_prestataire ===
                                                'M.'
                                              ? 'Monsieur'
                                              : prestataire[0]
                                                      .civilite_contact_prestataire ===
                                                  'Mme'
                                                ? 'Madame'
                                                : 'Non renseigné'}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Nom du contact :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='input'
                                        name='nom_contact_prestataire'
                                        value={
                                            modifiedPrestataire.nom_contact_prestataire
                                        }
                                        placeholder={
                                            prestataire[0]
                                                .nom_contact_prestataire ==
                                                null ||
                                            prestataire[0]
                                                .nom_contact_prestataire === ''
                                                ? 'Exemple: Delacroix'
                                                : 'Actuellement: ' +
                                                  prestataire[0]
                                                      .nom_contact_prestataire
                                        }
                                        maxLength={20}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {prestataire[0]
                                            .nom_contact_prestataire ==
                                        (null || '')
                                            ? '/'
                                            : prestataire[0]
                                                  .nom_contact_prestataire}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Prénom du contact :
                                </p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='input'
                                        name='prenom_contact_prestataire'
                                        value={
                                            modifiedPrestataire.prenom_contact_prestataire
                                        }
                                        placeholder={
                                            prestataire[0]
                                                .prenom_contact_prestataire ==
                                                null ||
                                            prestataire[0]
                                                .prenom_contact_prestataire ===
                                                ''
                                                ? 'Exemple: David'
                                                : 'Actuellement: ' +
                                                  prestataire[0]
                                                      .prenom_contact_prestataire
                                        }
                                        maxLength={20}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {prestataire[0]
                                            .prenom_contact_prestataire ==
                                        (null || '')
                                            ? '/'
                                            : prestataire[0]
                                                  .prenom_contact_prestataire}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Téléphone du contact :
                                </p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='number'
                                        name='telephone_contact_prestataire'
                                        value={
                                            modifiedPrestataire.telephone_contact_prestataire
                                        }
                                        placeholder={
                                            prestataire[0]
                                                .telephone_contact_prestataire ==
                                                null ||
                                            prestataire[0]
                                                .telephone_contact_prestataire ===
                                                ''
                                                ? 'Exemple: 0658905910'
                                                : 'Actuellement: ' +
                                                  prestataire[0]
                                                      .telephone_contact_prestataire
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
                                        {prestataire[0]
                                            .telephone_contact_prestataire ==
                                        (null || '')
                                            ? '/'
                                            : prestataire[0]
                                                  .telephone_contact_prestataire}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Mail du contact :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        type='mail'
                                        name='mail_contact_prestataire'
                                        value={
                                            modifiedPrestataire.mail_contact_prestataire
                                        }
                                        placeholder={
                                            prestataire[0]
                                                .mail_contact_prestataire ==
                                                null ||
                                            prestataire[0]
                                                .mail_contact_prestataire === ''
                                                ? 'Exemple: Paul.durand@gmail.com'
                                                : 'Actuellement: ' +
                                                  prestataire[0]
                                                      .mail_contact_prestataire
                                        }
                                        maxLength={255}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {prestataire[0]
                                            .mail_contact_prestataire ==
                                        (null || '')
                                            ? '/'
                                            : prestataire[0]
                                                  .mail_contact_prestataire}
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
                                        value={modifiedPrestataire.commentaires}
                                        placeholder={
                                            prestataire[0].commentaires ==
                                                null ||
                                            prestataire[0].commentaires === ''
                                                ? 'Exemple: Prestataire très sérieux'
                                                : 'Actuellement: ' +
                                                  prestataire[0].commentaires
                                        }
                                        maxLength={200}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {prestataire[0].commentaires ==
                                        (null || '')
                                            ? '/'
                                            : prestataire[0].commentaires}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Date d&apos;arrêt de l&apos;activité :
                                </p>
                                {modify &&
                                (session?.user.role === 'AD' ||
                                    session?.user.role === 'RC') ? (
                                    <input
                                        type='date'
                                        name='date_arret_activite_du_prestataire'
                                        value={formatDate(
                                            modifiedPrestataire.date_arret_activite_du_prestataire ||
                                                prestataire[0]
                                                    .date_arret_activite_du_prestataire,
                                        )}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {prestataire[0]
                                            .date_arret_activite_du_prestataire ==
                                        null
                                            ? '/'
                                            : formatDate(
                                                  prestataire[0]
                                                      .date_arret_activite_du_prestataire,
                                              )}
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
