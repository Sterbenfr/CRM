'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../styles/components.module.css'
import Image from 'next/image'
import SearchComponent from '@/components/searchComponent'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'
import fileUpload, { setFile } from '@/components/fileUploadModify'
import withAuthorization from '../../../../../components/withAuthorization'

interface ExtendedSession extends Session {
    user: {
        name?: string | null
        email?: string | null
        image?: string | null
        role?: string
        id?: string
    }
}

interface ReceptionID {
    numero_reception: number
    code_Don: number
    numero_livraison: string
    date_reception: Date
    heure_reception: string
    nombre_palettes_recues: number
    nombre_palettes_consignees_recues: number
    nombre_palettes_consignees_rendues: number
    nombre_cartons_recus: number
    poids_recu_kg: number
    produits_sur_palettes: string
    commentaires: string
    pieces_associees: string
    raison_sociale_don: string
}

function ReceptionPage({
    params,
}: {
    params: { donsID: string; receptionID: string }
}) {
    const [reception, setReception] = useState<ReceptionID[]>([])
    const [session, setSession] = useState<ExtendedSession | null>(null)
    const [modify, setModify] = useState<boolean>(false)
    const [modifiedReception, setModifiedReception] = useState<
        Partial<ReceptionID>
    >({})

    useEffect(() => {
        const fetchSessionAndReception = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)
            if (params.receptionID) {
                const res = await fetch(
                    `../../../../api/dons/${params.donsID}/reception/${params.receptionID}`,
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const receptionData: ReceptionID[] = await res.json()
                setReception(receptionData)
            }
        }

        fetchSessionAndReception()
    }, [params.receptionID, params.donsID, modify])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target

        setModifiedReception(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleNumeroLivraisonChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (!reception || reception.length === 0 || !session) return
        let value = event.target.value

        if (reception[0].numero_livraison !== '' && value === '') {
            value = reception[0].numero_livraison
        }
        setModifiedReception({
            ...modifiedReception,
            numero_livraison: value,
        })
    }

    const handlePalettesChange = () => {
        if (!reception || reception.length === 0 || !session) return

        const currentStatus =
            modifiedReception.produits_sur_palettes ||
            reception[0].produits_sur_palettes

        const newStatus = currentStatus === 'O' ? 'N' : 'O'

        setModifiedReception({
            ...modifiedReception,
            produits_sur_palettes: newStatus,
        })
    }

    const formatDate = (dateString: string | number | Date) => {
        return dateString
            ? new Date(dateString).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
    }

    const handleHeureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (
            event.target.value[event.target.value.length - 1] === ':' ||
            !isNaN(parseInt(event.target.value[event.target.value.length - 1]))
        ) {
            if (parseInt(event.target.value.slice(0, 2)) > 23) {
                event.target.value = '23' + event.target.value.slice(2)
            }
            if (parseInt(event.target.value.slice(3, 5)) > 59) {
                event.target.value =
                    event.target.value.slice(0, 3) +
                    '59' +
                    event.target.value.slice(5)
            }
            if (parseInt(event.target.value.slice(6, 8)) > 59) {
                event.target.value =
                    event.target.value.slice(0, 6) +
                    '59' +
                    event.target.value.slice(8)
            }
            if (
                event.target.value.length === 3 &&
                event.target.value[2] !== ':'
            ) {
                event.target.value =
                    event.target.value.slice(0, 2) + ':' + event.target.value[2]
            }
            if (event.target.value.length === 5) {
                event.target.value = event.target.value + ':00'
            }
            if (event.target.value.length === 7) {
                event.target.value = event.target.value.slice(0, 5)
            }
            reception[0].heure_reception = event.target.value
        } else {
            event.target.value = event.target.value.slice(
                0,
                event.target.value.length - 1,
            )
        }
    }

    const handleFileChange: React.ChangeEventHandler<
        HTMLInputElement
    > = event => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0])
        }
    }

    if (
        !Array.isArray(reception) ||
        reception.length === 0 ||
        typeof reception[0]?.numero_reception === 'undefined'
    )
        return (
            <div className={style.page}>
                <h2 className={style.load}>Chargement...</h2>
            </div>
        )

    const handleSubmit = async () => {

        
            const filePaths = await fileUpload('../../../../api/upload/piece')

            const jsonPayload = {
                ...modifiedReception,
                pieces_associees: filePaths[0],
            }

            // Convert non-file data to JSON
            const body = JSON.stringify(jsonPayload)

            try {
                const res = await fetch(
                    `../../../../api/dons/${params.donsID}/reception/${params.receptionID}`,
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

                const updatedReception: ReceptionID[] = await res.json()
                setReception(updatedReception)
                setModify(false)
            } catch (error) {
                console.error('Error submitting form:', error)
            }
            window.location.reload()
        
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

    const initialValue = () => {
        const keysToCheck = [
            'nombre_palettes_recues',
            'nombre_palettes_consignees_recues',
            'nombre_palettes_consignees_rendues',
            'nombre_cartons_recus',
            'poids_recu_kg',
            'commentaires',
        ]

        keysToCheck.forEach(key => {
            if (
                reception[0][key as keyof ReceptionID] !== null &&
                reception[0][key as keyof ReceptionID] !== ''
            ) {
                setModifiedReception(prevState => ({
                    ...prevState,
                    [key]: reception[0][key as keyof ReceptionID],
                }))
            }
        })
    }

    return (
        <div className={style.idPage}>
            <div className={style.croixID}>
                <h1 className={style.titre_global}>Récéption</h1>
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
                session.user.role === ('AD' || 'EN' || 'SU') && (
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
                                    Numéro de réception :
                                </p>
                                <p>
                                    {reception[0].numero_reception == null
                                        ? '/'
                                        : reception[0].numero_reception}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Raison sociale :</p>
                                <p>
                                    {reception[0].raison_sociale_don == null
                                        ? '/'
                                        : reception[0].raison_sociale_don}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Numéro livraison :
                                </p>
                                {modify &&
                                (session?.user.role === 'AD' ||
                                    'EN' ||
                                    'SU') ? (
                                    <SearchComponent
                                        url={`../../../api/select/dons/${params.donsID}/modalites-livraison`}
                                        onChange={e =>
                                            handleNumeroLivraisonChange(e)
                                        }
                                        placeholder={
                                            reception[0].numero_livraison ===
                                                null ||
                                            reception[0].numero_livraison === ''
                                                ? 'Exemple: Don de produits alimentaires - Livraison 2'
                                                : 'Actuellement: ' +
                                                  reception[0].numero_livraison
                                        }
                                    />
                                ) : (
                                    <p>
                                        {reception[0].numero_livraison == null
                                            ? '/'
                                            : reception[0].numero_livraison}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Date de réception :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'EN' || 'SU') ? (
                                    <input
                                        className={style.selectF}
                                        type='date'
                                        name='date_reception'
                                        value={formatDate(
                                            modifiedReception.date_reception ||
                                                reception[0].date_reception,
                                        )}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {reception[0].date_reception == null
                                            ? '/'
                                            : formatDate(
                                                  reception[0].date_reception,
                                              )}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Heure de réception :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'EN' || 'SU') ? (
                                    <input
                                        className={style.selectF}
                                        type='input'
                                        name='heure_prevue_livraison'
                                        value={
                                            modifiedReception.heure_reception
                                        }
                                        placeholder={
                                            reception[0].heure_reception ==
                                                null ||
                                            reception[0].heure_reception === ''
                                                ? 'Exemple: 14:20'
                                                : 'Actuellement: ' +
                                                  reception[0].heure_reception
                                        }
                                        onInput={handleHeureChange}
                                    />
                                ) : (
                                    <p>
                                        {reception[0].heure_reception == null
                                            ? '/'
                                            : reception[0].heure_reception}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Nombre de palettes recues :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'EN' || 'SU') ? (
                                    <input
                                        className={style.selectF}
                                        type='number'
                                        name='nombre_palettes_recues'
                                        value={
                                            modifiedReception.nombre_palettes_recues
                                        }
                                        placeholder={
                                            reception[0]
                                                .nombre_palettes_recues == null
                                                ? 'Exemple: 20'
                                                : 'Actuellement: ' +
                                                  reception[0]
                                                      .nombre_palettes_recues
                                        }
                                        onInput={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => {
                                            if (e.target.value.length > 10) {
                                                e.target.value =
                                                    e.target.value.slice(0, 10)
                                            }
                                        }}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {reception[0].nombre_palettes_recues ==
                                        null
                                            ? '/'
                                            : reception[0]
                                                  .nombre_palettes_recues}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Nombre palettes consignées recues :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'EN' || 'SU') ? (
                                    <input
                                        className={style.selectF}
                                        type='number'
                                        name='nombre_palettes_consignees_recues'
                                        value={
                                            modifiedReception.nombre_palettes_consignees_recues
                                        }
                                        placeholder={
                                            reception[0]
                                                .nombre_palettes_consignees_recues ==
                                            null
                                                ? 'Exemple: 20'
                                                : 'Actuellement: ' +
                                                  reception[0]
                                                      .nombre_palettes_consignees_recues
                                        }
                                        onInput={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => {
                                            if (e.target.value.length > 10) {
                                                e.target.value =
                                                    e.target.value.slice(0, 10)
                                            }
                                        }}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {reception[0]
                                            .nombre_palettes_consignees_recues ==
                                        null
                                            ? '/'
                                            : reception[0]
                                                  .nombre_palettes_consignees_recues}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={style.col_2}>
                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Nombre de palettes consignées rendues :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'EN' || 'SU') ? (
                                    <input
                                        className={style.selectF}
                                        type='number'
                                        name='nombre_palettes_consignees_rendues'
                                        value={
                                            modifiedReception.nombre_palettes_consignees_rendues
                                        }
                                        placeholder={
                                            reception[0]
                                                .nombre_palettes_consignees_rendues ==
                                            null
                                                ? 'Exemple: 2'
                                                : 'Actuellement: ' +
                                                  reception[0]
                                                      .nombre_palettes_consignees_rendues
                                        }
                                        onInput={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => {
                                            if (e.target.value.length > 10) {
                                                e.target.value =
                                                    e.target.value.slice(0, 10)
                                            }
                                        }}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {reception[0]
                                            .nombre_palettes_consignees_rendues ==
                                        null
                                            ? '/'
                                            : reception[0]
                                                  .nombre_palettes_consignees_rendues}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Nombre de cartons recus :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'EN' || 'SU') ? (
                                    <input
                                        className={style.selectF}
                                        type='number'
                                        name='nombre_cartons_recus'
                                        value={
                                            modifiedReception.nombre_cartons_recus
                                        }
                                        placeholder={
                                            reception[0].nombre_cartons_recus ==
                                            null
                                                ? 'Exemple: 2'
                                                : 'Actuellement: ' +
                                                  reception[0]
                                                      .nombre_cartons_recus
                                        }
                                        onInput={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => {
                                            if (e.target.value.length > 15) {
                                                e.target.value =
                                                    e.target.value.slice(0, 15)
                                            }
                                        }}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {reception[0].nombre_cartons_recus ==
                                        null
                                            ? '/'
                                            : reception[0].nombre_cartons_recus}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Poids recu en kg :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'EN' || 'SU') ? (
                                    <input
                                        className={style.selectF}
                                        type='number'
                                        name='poids_recu_kg'
                                        value={modifiedReception.poids_recu_kg}
                                        placeholder={
                                            reception[0].poids_recu_kg == null
                                                ? 'Exemple: 600'
                                                : 'Actuellement: ' +
                                                  reception[0].poids_recu_kg
                                        }
                                        onInput={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => {
                                            if (e.target.value.length > 20) {
                                                e.target.value =
                                                    e.target.value.slice(0, 20)
                                            }
                                        }}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {reception[0].poids_recu_kg == null
                                            ? '/'
                                            : reception[0].poids_recu_kg}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Produits sur les palettes :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'EN' || 'SU') ? (
                                    <input
                                        className={style.checkboxF}
                                        type='checkbox'
                                        name='produits_sur_palettes'
                                        value={
                                            modifiedReception.produits_sur_palettes ||
                                            reception[0].produits_sur_palettes
                                        }
                                        checked={
                                            modifiedReception.produits_sur_palettes
                                                ? modifiedReception.produits_sur_palettes ===
                                                  'O'
                                                : reception[0]
                                                      .produits_sur_palettes ===
                                                  'O'
                                        }
                                        onChange={handlePalettesChange}
                                    />
                                ) : (
                                    <p>
                                        {reception[0].produits_sur_palettes ==
                                        null
                                            ? '/'
                                            : reception[0]
                                                  .produits_sur_palettes}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>commentaires :</p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'EN' || 'SU') ? (
                                    <input
                                        className={style.selectF}
                                        type='input'
                                        name='commentaires'
                                        value={modifiedReception.commentaires}
                                        placeholder={
                                            reception[0].commentaires == null
                                                ? 'Exemple: Réception de 10 palettes de vêtements'
                                                : 'Actuellement: ' +
                                                  reception[0].commentaires
                                        }
                                        maxLength={200}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {reception[0].commentaires ==
                                        (null || '')
                                            ? '/'
                                            : reception[0].commentaires}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Pièces associées :
                                </p>
                                {modify &&
                                session?.user.role === ('AD' || 'RC') ? (
                                    <input
                                        className={style.selectF}
                                        type='file'
                                        name='pieces_associees'
                                        onChange={handleFileChange}
                                    />
                                ) : reception[0].pieces_associees == null ? (
                                    <p>/</p>
                                ) : typeof reception[0].pieces_associees ===
                                  'string' ? (
                                    <a
                                        href={reception[0].pieces_associees}
                                        download='pieces_associees'
                                    >
                                        Télécharger la pièce associée
                                    </a>
                                ) : (
                                    <a
                                        href={reception[0].pieces_associees}
                                        download='pieces_associees'
                                    >
                                        Télécharger la pièce associée
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

export default withAuthorization(ReceptionPage, ['AD', 'EN', 'SU'])
