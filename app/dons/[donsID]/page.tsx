'use client'
import { useEffect, useState } from 'react'
import style from '../../../styles/components.module.css'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'
import SearchComponent from '@/components/searchComponent'
import SelectComponent from '@/components/select-component'
import Image from 'next/image'

interface ExtendedSession extends Session {
    user: {
        name?: string | null
        email?: string | null
        image?: string | null
        role?: string // Add the role property
        id?: string
    }
}

interface DonID {
    code_Don: number
    raison_sociale: string
    date_proposition_don: Date
    contact_entite_donatrice: string
    TD_libelle: string
    TC_libelle: string
    TP_libelle: string
    MCP_libelle: string
    date_debut_mise_disposition: Date
    date_fin_mise_disposition: Date
    commentaires: string
    pieces_associees: string
    Utilisateur_saisie_don: string
    statut_acceptation_don: string
    date_acceptation_refus_don: Date
    type_date_acceptation_refus: string
    Utilisateur_accepte_refuse_don: string
    indicateur_remerciement: string
    date_remerciement: Date
    nom_destinataire_cerfa: string
    adresse_destinataire_cerfa: string
    adresse_mail_destinataire_cerfa: string
    telephone_destinataire_cerfa: string
    valeur_cerfa: number
    cerfa_fait: string
    date_cerfa: Date
    cerfa: string
    code_site_beneficiaire_don: string
    designation_longue: string
}

export default function DonPage({ params }: { params: { donsID: string } }) {
    const [don, setDon] = useState<DonID[] | null>()
    const [modify, setModify] = useState<boolean>(false)
    const [session, setSession] = useState<ExtendedSession | null>(null)
    const [modifiedDon, setModifiedDon] = useState<Partial<DonID>>({})

    useEffect(() => {
        const fetchSessionAndDon = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)

            if (params.donsID) {
                const res = await fetch(`../../api/dons/${params.donsID}`)

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }
                const donData: DonID[] = await res.json()
                setDon(donData)
            }
        }

        fetchSessionAndDon()
    }, [params.donsID, modify])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target

        setModifiedDon(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleRemerciementChange = () => {
        if (!don || don.length === 0 || !session) return

        const currentStatus =
            modifiedDon.indicateur_remerciement ||
            don[0].indicateur_remerciement

        const newStatus = currentStatus === 'O' ? 'N' : 'O'

        setModifiedDon({
            ...modifiedDon,
            indicateur_remerciement: newStatus,
            date_remerciement: new Date(),
        })
    }

    const handleSiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModifiedDon({
            ...modifiedDon,
            code_site_beneficiaire_don: event.target.value,
        })
    }

    const handleStatutAcceptationDonChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (!don || don.length === 0 || !session) return
        let value = event.target.value

        if (don[0].statut_acceptation_don === 'R' && value === 'A') {
            value = 'R'
        } else if (don[0].statut_acceptation_don === 'V' && value === 'A') {
            value = 'V'
        } else {
            value = event.target.value
        }
        setModifiedDon({
            ...modifiedDon,
            statut_acceptation_don: value,
            date_acceptation_refus_don: new Date(),
            Utilisateur_accepte_refuse_don: session.user.id,
        })
    }

    const handleCerfaChange = () => {
        if (!don || don.length === 0 || !session) return

        const currentStatus = modifiedDon.cerfa_fait || don[0].cerfa_fait

        // Toggle between 'V' and 'F'
        const newStatus = currentStatus === 'O' ? 'N' : 'O'

        // Update modifiedDon with the new status
        setModifiedDon({
            ...modifiedDon,
            cerfa_fait: newStatus,
            date_cerfa: new Date(),
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFileChange: React.ChangeEventHandler<
        HTMLInputElement
    > = event => {
        if (event.target.files && event.target.files.length > 0) {
            setModifiedDon({
                ...modifiedDon,
                cerfa: '', // TODO : Add the file to the modifiedDon object
            })
        }
    }

    const handleSubmit = async () => {
        // Format date values
        const formatDate = (date: Date | undefined) => {
            if (!date) return null
            const d = new Date(date)
            const year = d.getFullYear()
            const month = `0${d.getMonth() + 1}`.slice(-2)
            const day = `0${d.getDate()}`.slice(-2)
            const hours = `0${d.getHours()}`.slice(-2)
            const minutes = `0${d.getMinutes()}`.slice(-2)
            const seconds = `0${d.getSeconds()}`.slice(-2)
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        }

        const jsonPayload = {
            ...modifiedDon,
            date_remerciement: formatDate(modifiedDon.date_remerciement),
            date_cerfa: formatDate(modifiedDon.date_cerfa),
            date_acceptation_refus_don: formatDate(
                modifiedDon.date_acceptation_refus_don,
            ),
        }

        // Remove the file from the JSON payload
        delete jsonPayload.cerfa

        // Convert non-file data to JSON
        const body = JSON.stringify(jsonPayload)

        try {
            const res = await fetch(`../../api/dons/${params.donsID}`, {
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

            const updatedDon: DonID[] = await res.json()
            setDon(updatedDon)
            setModify(false)
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    }

    if (
        !Array.isArray(don) ||
        don.length === 0 ||
        typeof don[0]?.code_Don === 'undefined'
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
            document.body.style.fontSize = '12px'
            document.body.style.padding = '0'
            document.body.style.fontFamily = 'Arial'
            document.body.style.lineHeight = '1'
            document.body.style.letterSpacing = '0'
            document.body.style.wordSpacing = '0'

            const allElements = document.body.getElementsByTagName('*')
            for (let i = 0; i < allElements.length; i++) {
                const element = allElements[i] as HTMLElement
                element.style.margin = '7px'
                element.style.lineHeight = '1'
                element.style.letterSpacing = '0'
                element.style.wordSpacing = '0'
            }
        }

        const hideElements = () => {
            const element = document.getElementById('livraison')
            if (element) {
                element.style.display = 'none'
            }
            const element2 = document.getElementById('reception')
            if (element2) {
                element2.style.display = 'none'
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
                <h1 className={style.titre_global}>Détails du don :</h1>
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
                        <button className={style.btnModif} onClick={Print}>
                            Imprimer
                        </button>
                    </div>
                )}

            <div id='printablediv'>
                <div className={style.info_id}>
                    <div className={style.col_1}>
                        <div className={style.info}>
                            <p className={style.titre}>Code du don :</p>
                            <p>
                                {don[0].code_Don == null
                                    ? '/'
                                    : don[0].code_Don}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Raison sociale :</p>
                            <p>
                                {don[0].raison_sociale == null
                                    ? '/'
                                    : don[0].raison_sociale}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Date de proposition du don :
                            </p>
                            <p>
                                {don[0].date_proposition_don == null
                                    ? '/'
                                    : don[0].date_proposition_don
                                          .toString()
                                          .split('T')[0]}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Contact de l&apos;entité donatrice :
                            </p>
                            <p>
                                {don[0].contact_entite_donatrice == null
                                    ? '/'
                                    : don[0].contact_entite_donatrice}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Type de don :</p>
                            <p>
                                {don[0].TD_libelle == null
                                    ? '/'
                                    : don[0].TD_libelle}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Type de compétence :</p>
                            <p>
                                {don[0].TC_libelle == null
                                    ? '/'
                                    : don[0].TC_libelle}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Type de produit :</p>
                            <p>
                                {don[0].TP_libelle == null
                                    ? '/'
                                    : don[0].TP_libelle}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Mode de consomation :</p>
                            <p>
                                {don[0].MCP_libelle == null
                                    ? '/'
                                    : don[0].MCP_libelle}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Date du début de mise a disposition :
                            </p>
                            <p>
                                {don[0].date_debut_mise_disposition == null
                                    ? '/'
                                    : don[0].date_debut_mise_disposition
                                          .toString()
                                          .split('T')[0]}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Date de la fin de mise a disposition :
                            </p>
                            <p>
                                {don[0].date_fin_mise_disposition == null
                                    ? ''
                                    : don[0].date_fin_mise_disposition
                                          .toString()
                                          .split('T')[0]}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Commentaires :</p>
                            <p>
                                {don[0].commentaires == (null || '')
                                    ? '/'
                                    : don[0].commentaires}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Utilisateur saisie de don :
                            </p>
                            <p>
                                {don[0].Utilisateur_saisie_don == null
                                    ? '/'
                                    : don[0].Utilisateur_saisie_don}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Statut d&apos;acceptation du don :
                            </p>
                            {modify &&
                            (session?.user.role === 'AD' ||
                                session?.user.role === 'RR') ? (
                                <SelectComponent
                                    url='../../api/select/dons'
                                    onChange={e =>
                                        handleStatutAcceptationDonChange(e)
                                    }
                                />
                            ) : (
                                <p>
                                    {don[0].statut_acceptation_don == null
                                        ? '/'
                                        : don[0].statut_acceptation_don}
                                </p>
                            )}
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Date d&apos;acceptation / refus :
                            </p>
                            {modify && session?.user.role === ('AD' || 'RR') ? (
                                <input
                                    type='date'
                                    name='date_acceptation_refus_don'
                                    value={
                                        modifiedDon.date_acceptation_refus_don
                                            ? new Date(
                                                  modifiedDon.date_acceptation_refus_don,
                                              )
                                                  .toISOString()
                                                  .split('T')[0]
                                            : new Date(
                                                  don[0].date_acceptation_refus_don,
                                              )
                                                  .toISOString()
                                                  .split('T')[0]
                                    }
                                    onChange={handleInputChange}
                                    disabled
                                />
                            ) : (
                                <p>
                                    {don[0].date_acceptation_refus_don == null
                                        ? '/'
                                        : new Date(
                                              don[0].date_acceptation_refus_don,
                                          )
                                              .toISOString()
                                              .split('T')[0]}
                                </p>
                            )}
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                L&apos;utilisateur qui accepte ou refuse le don
                                :
                            </p>
                            {modify && session?.user.role === ('AD' || 'RR') ? (
                                <input
                                    type='text'
                                    name='Utilisateur_accepte_refuse_don'
                                    value={String(
                                        modifiedDon.Utilisateur_accepte_refuse_don
                                            ? session.user.name
                                            : don[0]
                                                  .Utilisateur_accepte_refuse_don ??
                                                  '',
                                    )}
                                    onChange={handleInputChange}
                                    disabled={true}
                                />
                            ) : (
                                <p>
                                    {don[0].Utilisateur_accepte_refuse_don ==
                                    null
                                        ? '/'
                                        : don[0].Utilisateur_accepte_refuse_don}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className={style.col_2}>
                        <div className={style.info}>
                            <p className={style.titre}>Site de réception :</p>
                            {modify &&
                            (session?.user.role === 'AD' ||
                                session?.user.role === 'RR') ? (
                                <SearchComponent
                                    url='../../api/select/sites'
                                    onChange={e => handleSiteChange(e)}
                                    onInputChange={e => handleSiteChange(e)}
                                    placeholder={
                                        don[0].designation_longue == null ||
                                        don[0].designation_longue === ''
                                            ? 'Exemple: Entrepot Principal'
                                            : 'Actuellement: ' +
                                              don[0].designation_longue
                                    }
                                />
                            ) : (
                                <p>
                                    {don[0].designation_longue == null
                                        ? '/'
                                        : don[0].designation_longue}
                                </p>
                            )}
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Indicateur de remerciement :
                            </p>
                            {modify && session?.user.role === ('AD' || 'PR') ? (
                                <input
                                    type='checkbox'
                                    name='indicateur_remerciement'
                                    value={
                                        modifiedDon.indicateur_remerciement ||
                                        don[0].indicateur_remerciement
                                    }
                                    checked={
                                        modifiedDon.indicateur_remerciement
                                            ? modifiedDon.indicateur_remerciement ===
                                              'O'
                                            : don[0].indicateur_remerciement ===
                                              'O'
                                    }
                                    onChange={handleRemerciementChange}
                                />
                            ) : (
                                <p>
                                    {don[0].indicateur_remerciement == null
                                        ? '/'
                                        : don[0].indicateur_remerciement}
                                </p>
                            )}
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Date du remerciement :
                            </p>
                            {modify && session?.user.role === ('AD' || 'PR') ? (
                                <input
                                    type='date'
                                    name='date_remerciement'
                                    value={
                                        modifiedDon.date_remerciement
                                            ? new Date(
                                                  modifiedDon.date_remerciement,
                                              )
                                                  .toISOString()
                                                  .split('T')[0]
                                            : don[0].date_remerciement
                                              ? new Date(
                                                    don[0].date_remerciement,
                                                )
                                                    .toISOString()
                                                    .split('T')[0]
                                              : new Date()
                                                    .toISOString()
                                                    .split('T')[0] // Use today's date if don[0].date_remerciement is not set
                                    }
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>
                                    {don[0].date_remerciement == null
                                        ? '/'
                                        : new Date(don[0].date_remerciement)
                                              .toISOString()
                                              .split('T')[0]}
                                </p>
                            )}
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Nom du destinataire du cerfa :
                            </p>
                            {modify && session?.user.role === ('AD' || 'PR') ? (
                                <input
                                    type='input'
                                    name='nom_destinataire_cerfa'
                                    value={modifiedDon.nom_destinataire_cerfa}
                                    placeholder={
                                        don[0].nom_destinataire_cerfa == null ||
                                        don[0].nom_destinataire_cerfa === ''
                                            ? 'Exemple: Durand'
                                            : 'Actuellement: ' +
                                              don[0].nom_destinataire_cerfa
                                    }
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>
                                    {don[0].nom_destinataire_cerfa ==
                                    (null || '')
                                        ? '/'
                                        : don[0].nom_destinataire_cerfa}
                                </p>
                            )}
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Adresse du destinataire du cerfa :
                            </p>
                            {modify && session?.user.role === ('AD' || 'PR') ? (
                                <input
                                    type='input'
                                    name='adresse_destinataire_cerfa'
                                    value={
                                        modifiedDon.adresse_destinataire_cerfa
                                    }
                                    placeholder={
                                        don[0].adresse_destinataire_cerfa ==
                                            null ||
                                        don[0].adresse_destinataire_cerfa === ''
                                            ? 'Exemple: 12 rue de la paix, 75000 Paris'
                                            : 'Actuellement: ' +
                                              don[0].adresse_destinataire_cerfa
                                    }
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>
                                    {don[0].adresse_destinataire_cerfa ==
                                    (null || '')
                                        ? '/'
                                        : don[0].adresse_destinataire_cerfa}
                                </p>
                            )}
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Adresse mail du destinataire du cerfa :
                            </p>
                            {modify && session?.user.role === ('AD' || 'PR') ? (
                                <input
                                    type='input'
                                    name='adresse_mail_destinataire_cerfa'
                                    value={
                                        modifiedDon.adresse_mail_destinataire_cerfa
                                    }
                                    placeholder={
                                        don[0]
                                            .adresse_mail_destinataire_cerfa ==
                                            null ||
                                        don[0]
                                            .adresse_mail_destinataire_cerfa ===
                                            ''
                                            ? 'Exemple: Paul.durand@gmail.com'
                                            : 'Actuellement: ' +
                                              don[0]
                                                  .adresse_mail_destinataire_cerfa
                                    }
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>
                                    {don[0].adresse_mail_destinataire_cerfa ==
                                        null || ''
                                        ? '/'
                                        : don[0]
                                              .adresse_mail_destinataire_cerfa}
                                </p>
                            )}
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>
                                Téléphone du destinataire du cerfa :
                            </p>
                            {modify && session?.user.role === ('AD' || 'PR') ? (
                                <input
                                    type='number'
                                    name='telephone_destinataire_cerfa'
                                    value={
                                        modifiedDon.telephone_destinataire_cerfa
                                    }
                                    placeholder={
                                        don[0].telephone_destinataire_cerfa ==
                                            null ||
                                        don[0].telephone_destinataire_cerfa ===
                                            ''
                                            ? 'Exemple: 0650634818'
                                            : 'Actuellement: ' +
                                              don[0]
                                                  .telephone_destinataire_cerfa
                                    }
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>
                                    {don[0].telephone_destinataire_cerfa ==
                                    (null || '')
                                        ? '/'
                                        : don[0].telephone_destinataire_cerfa}
                                </p>
                            )}
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Valeur du cerfa :</p>
                            {modify && session?.user.role === ('AD' || 'PR') ? (
                                <input
                                    type='number'
                                    name='valeur_cerfa'
                                    value={modifiedDon.valeur_cerfa}
                                    placeholder={
                                        don[0].valeur_cerfa == null ||
                                        don[0].valeur_cerfa === 0
                                            ? 'Exemple: 5500'
                                            : 'Actuellement: ' +
                                              don[0].valeur_cerfa
                                    }
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>
                                    {don[0].valeur_cerfa == null
                                        ? '/'
                                        : don[0].valeur_cerfa}
                                </p>
                            )}
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Cerfa fait :</p>
                            <p>
                                {modify &&
                                session?.user.role === ('AD' || 'RC') ? (
                                    <input
                                        type='checkbox'
                                        name='cerfa_fait'
                                        value={
                                            modifiedDon.cerfa_fait ||
                                            don[0].cerfa_fait
                                        }
                                        checked={
                                            modifiedDon.cerfa_fait
                                                ? modifiedDon.cerfa_fait === 'O'
                                                : don[0].cerfa_fait === 'O'
                                        }
                                        onChange={handleCerfaChange}
                                    />
                                ) : (
                                    <p>
                                        {don[0].cerfa_fait == null
                                            ? '/'
                                            : don[0].cerfa_fait}
                                    </p>
                                )}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Date du cerfa :</p>
                            <p>
                                {modify &&
                                session?.user.role === ('AD' || 'RC') ? (
                                    <input
                                        type='date'
                                        name='date_cerfa'
                                        value={
                                            modifiedDon.date_cerfa
                                                ? new Date(
                                                      modifiedDon.date_cerfa,
                                                  )
                                                      .toISOString()
                                                      .split('T')[0]
                                                : don[0].date_cerfa
                                                  ? new Date(don[0].date_cerfa)
                                                        .toISOString()
                                                        .split('T')[0]
                                                  : new Date()
                                                        .toISOString()
                                                        .split('T')[0]
                                        }
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {don[0].date_cerfa == null
                                            ? '/'
                                            : new Date(don[0].date_cerfa)
                                                  .toISOString()
                                                  .split('T')[0]}
                                    </p>
                                )}
                            </p>
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Cerfa :</p>
                            {modify && session?.user.role === ('AD' || 'RC') ? (
                                <input
                                    type='file'
                                    name='cerfa_file'
                                    onChange={handleFileChange}
                                />
                            ) : don[0].cerfa == null ? (
                                <p>/</p>
                            ) : typeof don[0].cerfa === 'string' ? (
                                <a href={don[0].cerfa} download='cerfa'>
                                    Download Cerfa
                                </a>
                            ) : (
                                <a href={don[0].cerfa} download='cerfa'>
                                    Download Cerfa
                                </a>
                            )}
                        </div>

                        <div className={style.info}>
                            <p className={style.titre}>Pièce associée :</p>
                            <p>
                                {don[0].pieces_associees == null ? (
                                    '/'
                                ) : (
                                    <a
                                        href={don[0].pieces_associees}
                                        download={
                                            'pièce_associée_' +
                                            don[0].commentaires
                                        }
                                    >
                                        {' '}
                                        Télécharger la pièce associée
                                    </a>
                                )}
                            </p>
                        </div>
                        <div className={style.info} id='livraison'>
                            {!modify && (
                                <a
                                    className={style.linkID}
                                    href={`/dons/${params.donsID}/modalites-livraison`}
                                >
                                    <p className={style.titre}>
                                        Modalités de la livraison
                                    </p>
                                </a>
                            )}
                        </div>
                        <div className={style.info} id='reception'>
                            {!modify && (
                                <a
                                    className={style.linkID}
                                    href={`/dons/${params.donsID}/reception`}
                                >
                                    <p className={style.titre}>
                                        Réception de la livraison
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
