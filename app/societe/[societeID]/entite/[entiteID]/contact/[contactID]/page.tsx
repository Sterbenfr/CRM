'use client'
import { useEffect, useState } from 'react'
import style from '../../../../../../../styles/components.module.css'
import Image from 'next/image'
import SelectComponent from '@/components/select-component'
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
interface ContactID {
    code_contact: number
    raison_sociale: string
    civilite: string
    nom: string
    prenom: string
    photo: string
    fonction: string
    service: string
    numero_fixe: string
    numero_portable: string
    adresse_mail: string
    commentaires: string
    date_arret_contact: Date
}

function ContactPage({
    params,
}: {
    params: { societeID: string; entiteID: string; contactID: string }
}) {
    const [contact, setContact] = useState<ContactID[]>([])
    const [session, setSession] = useState<ExtendedSession | null>(null)
    const [modify, setModify] = useState<boolean>(false)
    const [modifiedContact, setModifiedContact] = useState<Partial<ContactID>>(
        {},
    )

    useEffect(() => {
        const fetchSessionAndContact = async () => {
            const sessionData = await getSession()
            setSession(sessionData as ExtendedSession)

            if (params.contactID) {
                const res = await fetch(
                    `../../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/contact/${params.contactID}`,
                )

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const contactData: ContactID[] = await res.json()
                setContact(contactData)
            }
        }

        fetchSessionAndContact()
    }, [params.contactID, params.societeID, params.entiteID, modify])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target

        setModifiedContact(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleCiviliteChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (!contact || contact.length === 0 || !session) return

        setModifiedContact({
            ...modifiedContact,
            civilite: event.target.value,
        })
    }

    const formatDate = (dateString: string | number | Date) => {
        return dateString
            ? new Date(dateString).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
    }

    const handlePhotoChange: React.ChangeEventHandler<
        HTMLInputElement
    > = event => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0])
        }
    }

    const handleSubmit = async () => {
        const filePaths = await fileUpload('../../../../../../api/upload/image')

        const jsonPayload = {
            ...modifiedContact,
            photo: filePaths[0],
        }

        // Convert non-file data to JSON
        const body = JSON.stringify(jsonPayload)

        try {
            const res = await fetch(
                `../../../../../../api/societe/${params.societeID}/entite/${params.entiteID}/contact/${params.contactID}`,
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

            const updatedContact: ContactID[] = await res.json()
            setContact(updatedContact)
            setModify(false)
        } catch (error) {
            console.error('Error submitting form:', error)
        }
        window.location.reload()
    }

    if (
        !Array.isArray(contact) ||
        contact.length === 0 ||
        typeof contact[0]?.code_contact === 'undefined'
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
                <h1 className={style.titre_global}>Détails du contact</h1>
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
                                <p className={style.titre}>Code du contact :</p>
                                <p>
                                    {contact[0].code_contact == null
                                        ? '/'
                                        : contact[0].code_contact}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Nom de l&apos;entité :
                                </p>
                                <p>
                                    {contact[0].raison_sociale == null
                                        ? '/'
                                        : contact[0].raison_sociale}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Civilité du contact :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'SU' || 'AP') ? (
                                    <SelectComponent
                                        url='../../../../../../api/select/genre'
                                        onChange={e => handleCiviliteChange(e)}
                                    />
                                ) : (
                                    <p>
                                        {contact[0].civilite == (null || '')
                                            ? '/'
                                            : contact[0].civilite === 'M.'
                                              ? 'Monsieur'
                                              : contact[0].civilite === 'Mme'
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
                                session?.user.role ===
                                    ('AD' || 'SU' || 'AP') ? (
                                    <input
                                        className={style.selectF}
                                        type='input'
                                        name='nom'
                                        value={modifiedContact.nom}
                                        placeholder={
                                            contact[0].nom == null ||
                                            contact[0].nom === ''
                                                ? 'Exemple: Dupont'
                                                : 'Actuellement: ' +
                                                  contact[0].nom
                                        }
                                        maxLength={20}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {contact[0].nom == null
                                            ? '/'
                                            : contact[0].nom}
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
                                session?.user.role ===
                                    ('AD' || 'SU' || 'AP') ? (
                                    <input
                                        className={style.selectF}
                                        type='input'
                                        name='prenom'
                                        value={modifiedContact.prenom}
                                        placeholder={
                                            contact[0].prenom == null ||
                                            contact[0].prenom === ''
                                                ? 'Exemple: Corrine'
                                                : 'Actuellement: ' +
                                                  contact[0].prenom
                                        }
                                        maxLength={20}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {contact[0].prenom == null
                                            ? '/'
                                            : contact[0].prenom}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Fonction du contact :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'SU' || 'AP') ? (
                                    <input
                                        className={style.selectF}
                                        type='input'
                                        name='fonction'
                                        value={modifiedContact.fonction}
                                        placeholder={
                                            contact[0].fonction == null ||
                                            contact[0].fonction === ''
                                                ? 'Exemple: Assistante'
                                                : 'Actuellement: ' +
                                                  contact[0].fonction
                                        }
                                        maxLength={30}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {contact[0].fonction == (null || '')
                                            ? '/'
                                            : contact[0].fonction}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Service du contact :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'SU' || 'AP') ? (
                                    <input
                                        className={style.selectF}
                                        type='input'
                                        name='service'
                                        value={modifiedContact.service}
                                        placeholder={
                                            contact[0].service == null ||
                                            contact[0].service === ''
                                                ? 'Exemple: Ressources Humaines'
                                                : 'Actuellement: ' +
                                                  contact[0].service
                                        }
                                        maxLength={30}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {contact[0].service == (null || '')
                                            ? '/'
                                            : contact[0].service}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={style.col_2}>
                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Téléphone fixe du contact :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'SU' || 'AP') ? (
                                    <input
                                        className={style.selectF}
                                        type='number'
                                        name='numero_fixe'
                                        value={modifiedContact.numero_fixe}
                                        placeholder={
                                            contact[0].numero_fixe == null ||
                                            contact[0].numero_fixe === ''
                                                ? 'Exemple: 0634167452'
                                                : 'Actuellement: ' +
                                                  contact[0].numero_fixe
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
                                        {contact[0].numero_fixe == (null || '')
                                            ? '/'
                                            : contact[0].numero_fixe}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Téléphone portable du contact :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'SU' || 'AP') ? (
                                    <input
                                        className={style.selectF}
                                        type='number'
                                        name='numero_portable'
                                        value={modifiedContact.numero_portable}
                                        placeholder={
                                            contact[0].numero_portable ==
                                                null ||
                                            contact[0].numero_portable === ''
                                                ? 'Exemple: 0634161527'
                                                : 'Actuellement: ' +
                                                  contact[0].numero_portable
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
                                        {contact[0].numero_portable ===
                                        (null || '')
                                            ? '/'
                                            : contact[0].numero_portable}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Adresse mail du contact :
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'SU' || 'AP') ? (
                                    <input
                                        className={style.selectF}
                                        type='input'
                                        name='adresse_mail'
                                        value={modifiedContact.adresse_mail}
                                        placeholder={
                                            contact[0].adresse_mail == null ||
                                            contact[0].adresse_mail === ''
                                                ? 'Exemple: Corrine.dupont@gmail.com'
                                                : 'Actuellement: ' +
                                                  contact[0].adresse_mail
                                        }
                                        maxLength={200}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {contact[0].adresse_mail == (null || '')
                                            ? '/'
                                            : contact[0].adresse_mail}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>Photo :</p>
                                {modify &&
                                session?.user.role === ('AD' || 'RC') ? (
                                    <input
                                        className={style.selectF}
                                        type='file'
                                        name='photo_file'
                                        onChange={handlePhotoChange}
                                    />
                                ) : contact[0].photo == null ? (
                                    <p>/</p>
                                ) : typeof contact[0].photo === 'string' ? (
                                    <a href={contact[0].photo} download='photo'>
                                        Télécharger la photo
                                    </a>
                                ) : (
                                    <a href={contact[0].photo} download='photo'>
                                        Télécharger la photo
                                    </a>
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
                                        value={modifiedContact.commentaires}
                                        placeholder={
                                            contact[0].commentaires == null ||
                                            contact[0].commentaires === ''
                                                ? 'Exemple: Corrine Dupont habite dunkerque'
                                                : 'Actuellement: ' +
                                                  contact[0].commentaires
                                        }
                                        maxLength={200}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {contact[0].commentaires == (null || '')
                                            ? '/'
                                            : contact[0].commentaires}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className={style.info}>
                                <p className={style.titre}>
                                    Date d&apos;arrêt de liaison:
                                </p>
                                {modify &&
                                session?.user.role ===
                                    ('AD' || 'SU' || 'AP') ? (
                                    <input
                                        className={style.selectF}
                                        type='date'
                                        name='date_arret_contact'
                                        value={formatDate(
                                            modifiedContact.date_arret_contact ||
                                                contact[0].date_arret_contact,
                                        )}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>
                                        {contact[0].date_arret_contact == null
                                            ? '/'
                                            : formatDate(
                                                  contact[0].date_arret_contact,
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

export default withAuthorization(ContactPage, ['AD', 'SU', 'AP'])
