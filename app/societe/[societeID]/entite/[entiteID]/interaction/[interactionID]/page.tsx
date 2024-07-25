'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../../../styles/components.module.css'
import Image from 'next/image'
import SelectComponent from '@/components/select-component'
import SearchComponent from '@/components/searchComponent'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'
import fileUpload, { setFile } from '@/components/fileUploadModify'
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

interface InteractionID {
    code_interaction: number
    code_Utilisateur_Prospecteur: string
    code_Entite_Prospectee: number
    date_interaction: Date
    code_type_interaction: string
    code_modalite_interaction: string
    code_contact_entite: string
    commentaires: string
    pieces_associees: string
    date_relance: Date
    raison_sociale: string
    utilisateur_prospecteur: string
    contact_entite: string
    libelle_type_interaction: string
    libelle_modalite_interaction: string
}

function InteractionPage({
    params,
}: {
    params: { societeID: string; entiteID: string; interactionID: string }
}) {
    const [interaction, setInteraction] = useState<InteractionID[]>([])
    const [session, setSession] = useState<ExtendedSession | null>(null)
    const [modify, setModify] = useState<boolean>(false)
    const [modifiedInteraction, setmodifiedInteraction] = useState<
        Partial<InteractionID>
    >({})

    useEffect(() => {
        const fetchSessionAndInteraction = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)

            if (params.interactionID) {
                const res = await fetch(
                    `../../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/interactions/${params.interactionID}`,
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const interaction: InteractionID[] = await res.json()
                setInteraction(interaction)
            }
        }

        fetchSessionAndInteraction()
    }, [params.interactionID, params.societeID, params.entiteID, modify])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target

        setmodifiedInteraction(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleTypeInteractionChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (!interaction || interaction.length === 0 || !session) return
        let value = event.target.value

        if (interaction[0].code_type_interaction !== '' && value === '') {
            value = interaction[0].code_type_interaction
        }
        setmodifiedInteraction({
            ...modifiedInteraction,
            code_type_interaction: value,
        })
    }

    const handleModaliteChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (!interaction || interaction.length === 0 || !session) return
        let value = event.target.value

        if (interaction[0].code_modalite_interaction !== '' && value === '') {
            value = interaction[0].code_modalite_interaction
        }
        setmodifiedInteraction({
            ...modifiedInteraction,
            code_modalite_interaction: value,
        })
    }

    const handleContactChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (!interaction || interaction.length === 0 || !session) return
        let value = event.target.value

        if (interaction[0].code_contact_entite !== '' && value === '') {
            value = interaction[0].code_contact_entite
        }
        setmodifiedInteraction({
            ...modifiedInteraction,
            code_contact_entite: value,
        })
    }

    const handleProspecteurChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (!interaction || interaction.length === 0 || !session) return
        let value = event.target.value

        if (
            interaction[0].code_Utilisateur_Prospecteur !== '' &&
            value === ''
        ) {
            value = interaction[0].code_Utilisateur_Prospecteur
        }
        setmodifiedInteraction({
            ...modifiedInteraction,
            code_Utilisateur_Prospecteur: value,
        })
    }

    const formatDate = (dateString: string | number | Date) => {
        return dateString
            ? new Date(dateString).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
    }

    const handleFileChange: React.ChangeEventHandler<
        HTMLInputElement
    > = event => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0])
        }
    }

    const handleSubmit = async () => {
        const filePaths = await fileUpload(
            '../../../../../../api/upload/piece',
        )
        
        const jsonPayload = {
            ...modifiedInteraction,
            pieces_associees: filePaths[0],
        }

        // Convert non-file data to JSON
        const body = JSON.stringify(jsonPayload)

        try {
            const res = await fetch(
                `../../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/interactions/${params.interactionID}`,
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

            const updatedInteraction: InteractionID[] = await res.json()
            setInteraction(updatedInteraction)
            setModify(false)
        } catch (error) {
            console.error('Error submitting form:', error)
        }
        window.location.reload()
    }

    if (
        !Array.isArray(interaction) ||
        interaction.length === 0 ||
        typeof interaction[0]?.code_interaction === 'undefined'
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
                <h1 className={style.titre_global}>Details des interaction</h1>
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
                session?.user.role === ('AD' || 'SU' || 'AP') && (
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
                                    Code d&apos;interaction :
                                </p>
                                <p>{interaction[0].code_interaction}</p>
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Code entité prospectée :
                                </p>
                                <p>
                                    {interaction[0].raison_sociale == null
                                        ? '/'
                                        : interaction[0].raison_sociale}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Code utilisateur prospecteur :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'SU' || 'AP') ? (
                                    <SearchComponent
                                        url='../../../../../../api/select/sites/utilisateurs'
                                        onChange={e =>
                                            handleProspecteurChange(e)
                                        }
                                        placeholder='Exemple: Sophie Petit'
                                    />
                                ) : (
                                    <p>
                                        {interaction[0]
                                            .utilisateur_prospecteur ===
                                        (null || '')
                                            ? '/'
                                            : interaction[0]
                                                  .utilisateur_prospecteur}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Date de l&apos;interaction :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'SU' || 'AP') ? (
                                    <input
                                        className={style.selectF}
                                        type='date'
                                        name='date_interaction'
                                        value={formatDate(
                                            modifiedInteraction.date_interaction ||
                                                interaction[0].date_interaction,
                                        )}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {interaction[0].date_interaction == null
                                            ? '/'
                                            : formatDate(
                                                  interaction[0]
                                                      .date_interaction,
                                              )}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Code type d&apos;interaction :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'SU' || 'AP') ? (
                                    <SelectComponent
                                        url={`../../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/interactions/type-interactions`}
                                        onChange={e =>
                                            handleTypeInteractionChange(e)
                                        }
                                    />
                                ) : (
                                    <p>
                                        {interaction[0]
                                            .libelle_type_interaction === null
                                            ? '/'
                                            : interaction[0]
                                                  .libelle_type_interaction}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={style.col_2}>
                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Code modalite interaction :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'SU' || 'AP') ? (
                                    <SelectComponent
                                        url={`../../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/interactions/type-modalite-interactions`}
                                        onChange={e => handleModaliteChange(e)}
                                    />
                                ) : (
                                    <p>
                                        {interaction[0]
                                            .libelle_modalite_interaction ===
                                        null
                                            ? '/'
                                            : interaction[0]
                                                  .libelle_modalite_interaction}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Code contact de l&apos;entite :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'SU' || 'AP') ? (
                                    <SelectComponent
                                        url={`../../../../../../api/select/societe/entite/${params.entiteID}/contact`}
                                        onChange={e => handleContactChange(e)}
                                    />
                                ) : (
                                    <p>
                                        {interaction[0].contact_entite === null
                                            ? '/'
                                            : interaction[0].contact_entite}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Commentaires</p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'SU' || 'AP') ? (
                                    <input
                                        className={style.selectF}
                                        type='input'
                                        name='commentaires'
                                        value={modifiedInteraction.commentaires}
                                        placeholder={
                                            interaction[0].commentaires ==
                                                null ||
                                            interaction[0].commentaires === ''
                                                ? 'Exemple: Relance pour aide a Dunkerque'
                                                : 'Actuellement: ' +
                                                  interaction[0].commentaires
                                        }
                                        maxLength={200}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {interaction[0].commentaires ===
                                        (null || '')
                                            ? '/'
                                            : interaction[0].commentaires}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Pieces associees :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'RC') ? (
                                    <input
                                        className={style.selectF}
                                        type='file'
                                        name='pieces_associees'
                                        onChange={handleFileChange}
                                    />
                                ) : interaction[0].pieces_associees == null ? (
                                    <p>/</p>
                                ) : typeof interaction[0].pieces_associees ===
                                  'string' ? (
                                    <a
                                        href={interaction[0].pieces_associees}
                                        download='pieces_associees'
                                    >
                                        Télécharger la pièce associée
                                    </a>
                                ) : (
                                    <a
                                        href={interaction[0].pieces_associees}
                                        download='pieces_associees'
                                    >
                                        Télécharger la pièce associée
                                    </a>
                                )}
                            </div>
                        </div>
                        
                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Date relance :</p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'SU' || 'AP') ? (
                                    <input
                                        className={style.selectF}
                                        type='date'
                                        name='date_relance'
                                        value={formatDate(
                                            modifiedInteraction.date_relance ||
                                                interaction[0].date_relance,
                                        )}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {interaction[0].date_relance === null
                                            ? '/'
                                            : formatDate(
                                                  interaction[0].date_relance,
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

export default withAuthorization(InteractionPage, ['AD', 'SU', 'AP'])
