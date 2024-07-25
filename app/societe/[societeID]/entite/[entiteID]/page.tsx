'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../styles/components.module.css'
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
interface EntiteID {
    code_entite: number
    raison_sociale: string
    nom_commercial: string
    logo: Blob
    siret: string
    code_ape: string
    code_rna: string
    code_cee: string
    nom_societe: string
    adresse: string
    telephone: string
    mail: string
    site_internet: string
    commentaires: string
    TE_libelle: string
    TD_libelle: string
    TP_libelle: string
    TC_libelle: string
    commentaires_logistique: string
    presence_quai: string
    pieces_associees: Blob
    cerfa: string
    FC_libelle: string
    date_arret_activite: Date
}

export default function EntitePage({
    params,
}: {
    params: { societeID: string; entiteID: string }
}) {
    const [entite, setEntite] = useState<EntiteID[]>([])
    const [session, setSession] = useState<ExtendedSession | null>(null)
    const [modify, setModify] = useState<boolean>(false)
    const [modifiedEntite, setModifiedEntite] = useState<Partial<EntiteID>>({})

    useEffect(() => {
        const fetchSessionAndEntite = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)
            if (params.entiteID) {
                const res = await fetch(
                    `../../../../api/societe/${params.societeID}/entite/${params.entiteID}`,
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const entite: EntiteID[] = await res.json()
                setEntite(entite)
            }
        }

        fetchSessionAndEntite()
    }, [params.entiteID, params.societeID, modify])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target

        setModifiedEntite(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleTypeEntiteChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (!entite || entite.length === 0 || !session) return
        let value = event.target.value

        if (entite[0].TE_libelle !== '' && value === '') {
            value = entite[0].TE_libelle
        }
        setModifiedEntite({
            ...modifiedEntite,
            TE_libelle: value,
        })
    }

    const handleCompetencesChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (!entite || entite.length === 0 || !session) return
        let value = event.target.value

        if (entite[0].TC_libelle !== '' && value === '') {
            value = entite[0].TC_libelle
        }
        setModifiedEntite({
            ...modifiedEntite,
            TC_libelle: value,
        })
    }

    const handleProduitChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (!entite || entite.length === 0 || !session) return
        let value = event.target.value

        if (entite[0].TP_libelle !== '' && value === '') {
            value = entite[0].TP_libelle
        }
        setModifiedEntite({
            ...modifiedEntite,
            TP_libelle: value,
        })
    }

    const handleFrequencesChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (!entite || entite.length === 0 || !session) return
        let value = event.target.value

        if (entite[0].FC_libelle !== '' && value === '') {
            value = entite[0].FC_libelle
        }
        setModifiedEntite({
            ...modifiedEntite,
            FC_libelle: value,
        })
    }

    const handleCerfaChange = () => {
        if (!entite || entite.length === 0 || !session) return

        const currentStatus = modifiedEntite.cerfa || entite[0].cerfa

        const newStatus = currentStatus === 'O' ? 'N' : 'O'

        setModifiedEntite({
            ...modifiedEntite,
            cerfa: newStatus,
        })
    }

    const handlePresenceChange = () => {
        if (!entite || entite.length === 0 || !session) return

        const currentStatus =
            modifiedEntite.presence_quai || entite[0].presence_quai

        const newStatus = currentStatus === 'O' ? 'N' : 'O'

        setModifiedEntite({
            ...modifiedEntite,
            presence_quai: newStatus,
        })
    }

    const formatDate = (dateString: string | number | Date) => {
        return dateString
            ? new Date(dateString).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
    }

    const handleSubmit = async () => {
        const jsonPayload = {
            ...modifiedEntite,
        }

        // Convert non-file data to JSON
        const body = JSON.stringify(jsonPayload)

        try {
            const res = await fetch(
                `../../../../api/societe/${params.societeID}/entite/${params.entiteID}`,
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

            const updatedEntite: EntiteID[] = await res.json()
            setEntite(updatedEntite)
            setModify(false)
        } catch (error) {
            console.error('Error submitting form:', error)
        }
        window.location.reload()
    }

    if (
        !Array.isArray(entite) ||
        entite.length === 0 ||
        typeof entite[0]?.code_entite === 'undefined'
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
                <h1 className={style.titre_global}>Details de l&apos;entité</h1>
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
                                <p className={style.titre}>
                                    Code de l&apos;entité :
                                </p>
                                <p>
                                    {entite[0].code_entite == null
                                        ? '/'
                                        : entite[0].code_entite}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Entreprise appartenance :
                                </p>
                                <p>
                                    {entite[0].nom_societe == (null || '')
                                        ? '/'
                                        : entite[0].nom_societe}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Raison sociale :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        className={style.selectF}
                                        type='input'
                                        name='raison_sociale'
                                        value={modifiedEntite.raison_sociale}
                                        placeholder={
                                            entite[0].raison_sociale === null ||
                                            entite[0].raison_sociale === ''
                                                ? 'Exemple: Entrepôt Alpha'
                                                : 'Actuellement: ' +
                                                  entite[0].raison_sociale
                                        }
                                        maxLength={30}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {entite[0].raison_sociale ==
                                        (null || '')
                                            ? '/'
                                            : entite[0].raison_sociale}
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
                                        className={style.selectF}
                                        type='input'
                                        name='nom_commercial'
                                        value={modifiedEntite.nom_commercial}
                                        placeholder={
                                            entite[0].nom_commercial === null ||
                                            entite[0].nom_commercial === ''
                                                ? 'Exemple: Alpha Corp'
                                                : 'Actuellement: ' +
                                                  entite[0].nom_commercial
                                        }
                                        maxLength={30}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {entite[0].nom_commercial ==
                                        (null || '')
                                            ? '/'
                                            : entite[0].nom_commercial}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Logo :</p>

                                <p>
                                    {entite[0].cerfa == (null || '')
                                        ? '/'
                                        : entite[0].cerfa}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Siret :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        className={style.selectF}
                                        type='number'
                                        name='siret'
                                        value={modifiedEntite.siret}
                                        placeholder={
                                            entite[0].siret === null ||
                                            entite[0].siret === ''
                                                ? 'Exemple: 15269783246918'
                                                : 'Actuellement: ' +
                                                  entite[0].siret
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
                                        {entite[0].siret == null
                                            ? '/'
                                            : entite[0].siret}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Code APE :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        className={style.selectF}
                                        type='input'
                                        name='code_ape'
                                        value={modifiedEntite.code_ape}
                                        placeholder={
                                            entite[0].code_ape === null ||
                                            entite[0].code_ape === ''
                                                ? 'Exemple: 1234A'
                                                : 'Actuellement: ' +
                                                  entite[0].code_ape
                                        }
                                        maxLength={5}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {entite[0].code_ape == null
                                            ? '/'
                                            : entite[0].code_ape}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Code RNA :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        className={style.selectF}
                                        type='input'
                                        name='code_rna'
                                        value={modifiedEntite.code_rna}
                                        placeholder={
                                            entite[0].code_rna === null ||
                                            entite[0].code_rna === ''
                                                ? 'Exemple: W123456789'
                                                : 'Actuellement: ' +
                                                  entite[0].code_rna
                                        }
                                        maxLength={10}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {entite[0].code_rna == null
                                            ? '/'
                                            : entite[0].code_rna}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Code CE :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        className={style.selectF}
                                        type='number'
                                        name='code_cee'
                                        value={modifiedEntite.code_cee}
                                        placeholder={
                                            entite[0].code_cee === null ||
                                            entite[0].code_cee === ''
                                                ? 'Exemple: 123456789'
                                                : 'Actuellement: ' +
                                                  entite[0].code_cee
                                        }
                                        onInput={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => {
                                            if (e.target.value.length > 13) {
                                                e.target.value =
                                                    e.target.value.slice(0, 13)
                                            }
                                        }}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {entite[0].code_cee === (null || '')
                                            ? '/'
                                            : entite[0].code_cee}
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
                                        className={style.selectF}
                                        type='input'
                                        name='adresse'
                                        value={modifiedEntite.adresse}
                                        placeholder={
                                            entite[0].adresse === null ||
                                            entite[0].adresse === ''
                                                ? 'Exemple: 12 rue de la paix, 75000 Paris'
                                                : 'Actuellement: ' +
                                                  entite[0].adresse
                                        }
                                        maxLength={255}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {entite[0].adresse == (null || '')
                                            ? '/'
                                            : entite[0].adresse}
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
                                        className={style.selectF}
                                        type='number'
                                        name='telephone'
                                        value={modifiedEntite.telephone}
                                        placeholder={
                                            entite[0].telephone === null ||
                                            entite[0].telephone === ''
                                                ? 'Exemple: 0123456789'
                                                : 'Actuellement: ' +
                                                  entite[0].telephone
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
                                        {entite[0].telephone == (null || '')
                                            ? '/'
                                            : entite[0].telephone}
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
                                        className={style.selectF}
                                        type='mail'
                                        name='mail'
                                        value={modifiedEntite.mail}
                                        placeholder={
                                            entite[0].mail === null ||
                                            entite[0].mail === ''
                                                ? 'Exemple: Alpha.corp@gmail.com'
                                                : 'Actuellement: ' +
                                                  entite[0].mail
                                        }
                                        maxLength={50}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {entite[0].mail == (null || '')
                                            ? '/'
                                            : entite[0].mail}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Site internet :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        className={style.selectF}
                                        type='input'
                                        name='site_internet'
                                        value={modifiedEntite.site_internet}
                                        placeholder={
                                            entite[0].site_internet === null ||
                                            entite[0].site_internet === ''
                                                ? 'Exemple: http://www.alpha.com/'
                                                : 'Actuellement: ' +
                                                  entite[0].site_internet
                                        }
                                        maxLength={255}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {entite[0].site_internet == (null || '')
                                            ? '/'
                                            : entite[0].site_internet}
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
                                        className={style.selectF}
                                        type='input'
                                        name='commentaires'
                                        value={modifiedEntite.commentaires}
                                        placeholder={
                                            entite[0].commentaires === null ||
                                            entite[0].commentaires === ''
                                                ? 'Exemple: Entrepôt de stockage'
                                                : 'Actuellement: ' +
                                                  entite[0].commentaires
                                        }
                                        maxLength={200}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {entite[0].commentaires == (null || '')
                                            ? '/'
                                            : entite[0].commentaires}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={style.col_2}>
                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Type d&apos;entité :
                                </p>
                                {modify &&
                                (session?.user.role === 'AD' ||
                                    session?.user.role === 'RR') ? (
                                    <SelectComponent
                                        url={`../../../api/societe/${params.societeID}/entite/type-entites`}
                                        onChange={e =>
                                            handleTypeEntiteChange(e)
                                        }
                                    />
                                ) : (
                                    <p>
                                        {entite[0].TE_libelle == (null || '')
                                            ? '/'
                                            : entite[0].TE_libelle}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Type de Don :</p>
                                <p>
                                    {entite[0].TD_libelle == null
                                        ? '/'
                                        : entite[0].TD_libelle}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Type de Produit :</p>
                                {modify &&
                                (session?.user.role === 'AD' ||
                                    session?.user.role === 'RR') &&
                                entite[0].TD_libelle === 'Marchandises' ? (
                                    <SelectComponent
                                        url={`../../../api/dons/type-produits`}
                                        onChange={e => handleProduitChange(e)}
                                    />
                                ) : (
                                    <p>
                                        {entite[0].TP_libelle == null
                                            ? '/'
                                            : entite[0].TP_libelle}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Type de Compétence(s) :
                                </p>
                                {modify &&
                                (session?.user.role === 'AD' ||
                                    session?.user.role === 'RR') &&
                                entite[0].TD_libelle === 'Competences' ? (
                                    <SelectComponent
                                        url={`../../../api/dons/type-competences`}
                                        onChange={e =>
                                            handleCompetencesChange(e)
                                        }
                                    />
                                ) : (
                                    <p>
                                        {entite[0].TC_libelle == null
                                            ? '/'
                                            : entite[0].TC_libelle}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Présence en quai :
                                </p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        className={style.checkboxF}
                                        type='checkbox'
                                        name='presence_quai'
                                        value={
                                            modifiedEntite.presence_quai ||
                                            entite[0].presence_quai
                                        }
                                        checked={
                                            modifiedEntite.presence_quai
                                                ? modifiedEntite.presence_quai ===
                                                  'O'
                                                : entite[0].presence_quai ===
                                                  'O'
                                        }
                                        onChange={handlePresenceChange}
                                    />
                                ) : (
                                    <p>
                                        {entite[0].presence_quai == (null || '')
                                            ? '/'
                                            : entite[0].presence_quai}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Commentaires logistique :
                                </p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        className={style.selectF}
                                        type='input'
                                        name='commentaires_logistique'
                                        value={
                                            modifiedEntite.commentaires_logistique
                                        }
                                        placeholder={
                                            entite[0]
                                                .commentaires_logistique ===
                                                null ||
                                            entite[0]
                                                .commentaires_logistique === ''
                                                ? 'Exemple: Societe de service informatique'
                                                : 'Actuellement: ' +
                                                  entite[0]
                                                      .commentaires_logistique
                                        }
                                        maxLength={200}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {entite[0].commentaires_logistique ==
                                        (null || '')
                                            ? '/'
                                            : entite[0].commentaires_logistique}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Pieces associees :
                                </p>

                                <p>
                                    {entite[0].cerfa == (null || '')
                                        ? '/'
                                        : entite[0].cerfa}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Cerfa :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'PR') ? (
                                    <input
                                        className={style.checkboxF}
                                        type='checkbox'
                                        name='cerfa'
                                        value={
                                            modifiedEntite.cerfa ||
                                            entite[0].cerfa
                                        }
                                        checked={
                                            modifiedEntite.cerfa
                                                ? modifiedEntite.cerfa === 'O'
                                                : entite[0].cerfa === 'O'
                                        }
                                        onChange={handleCerfaChange}
                                    />
                                ) : (
                                    <p>
                                        {entite[0].cerfa == (null || '')
                                            ? '/'
                                            : entite[0].cerfa}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Fréquence du Cerfa :
                                </p>
                                {modify &&
                                (session?.user.role === 'AD' ||
                                    session?.user.role === 'RR') ? (
                                    <SelectComponent
                                        url={`../../../api/societe/${params.societeID}/entite/type-frequences-cerfa`}
                                        onChange={e =>
                                            handleFrequencesChange(e)
                                        }
                                    />
                                ) : (
                                    <p>
                                        {entite[0].FC_libelle == null
                                            ? '/'
                                            : entite[0].FC_libelle}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Date d&apos;arret d&apos;activite :
                                </p>
                                {modify &&
                                (session?.user.role === 'AD' ||
                                    session?.user.role === 'RC') ? (
                                    <input
                                        className={style.selectF}
                                        type='date'
                                        name='date_arret_activite'
                                        value={formatDate(
                                            modifiedEntite.date_arret_activite ||
                                                entite[0].date_arret_activite,
                                        )}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {entite[0].date_arret_activite == null
                                            ? '/'
                                            : formatDate(
                                                  entite[0].date_arret_activite,
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
                                        href={`/societe/${params.societeID}/entite/${params.entiteID}/contact`}
                                    >
                                        <p className={style.titre}>
                                            {' '}
                                            Contact(s) de l&apos;entité{' '}
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
                                        href={`/societe/${params.societeID}/entite/${params.entiteID}/interaction`}
                                    >
                                        <p className={style.titre}>
                                            {' '}
                                            Interaction(s) avec l&apos;entité{' '}
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
                                        href={`/societe/${params.societeID}/entite/${params.entiteID}/entite-site-link`}
                                    >
                                        <p className={style.titre}>
                                            {' '}
                                            Utilisateur(s) suivant l&apos;entité{' '}
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
