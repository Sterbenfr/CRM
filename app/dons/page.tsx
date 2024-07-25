/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
import List from '../../components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import { useCallback } from 'react'
import withAuthorization from '@/components/withAuthorization'
import style from '../../styles/components.module.css'
import TypesButtons from '@/components/TypesButtons'

export interface Don {
    code_Don: number
    titre_don: string
    code_Entite_donatrice: number
    date_proposition_don: Date
    code_contact_Entite_donatrice: number
    code_type_don: string
    code_type_competences: string
    code_type_produits: string
    code_mode_conservation_produits: string
    date_debut_mise_disposition: Date
    date_fin_mise_disposition: Date
    commentaires: string
    pieces_associees: Blob //Faire blob
    code_Utilisateur_saisie_don: number
    statut_acceptation_don: string
    date_acceptation_refus_don: Date
    type_date_acceptation_refus: string
    code_Utilisateur_accepte_refuse_don: number
    code_site_beneficiaire_don: number
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
    raison_sociale?: string
}

function DonsPage() {
    const [EntiteDonatrice, setEntiteDonatrice] = useState('')
    const [titreDon, setTitreDon] = useState('')
    const [datePropositionDon, setDatePropositionDon] = useState(new Date())
    const [codeContactEntiteDonatrice, setCodeContactEntiteDonatrice] =
        useState('')
    const [selectedTypeCompetence, setSelectedTypeCompetence] = useState('')
    const [selectedTypeMarchandise, setSelectedTypeMarchandise] = useState('')
    const [selectedTypeDon, setSelectedTypeDon] = useState('')
    const [commentaires, setCommentaires] = useState('')
    const [codeUtilisateurSaisieDon, setCodeUtilisateurSaisieDon] = useState('')
    const [statutAcceptationDon, setStatutAcceptationDon] = useState('')
    const [indicateurRemerciement, setindicateurRemerciement] = useState(false)
    const [cerfaFait, setCerfaFait] = useState(false)

    const [lastdebutMiseDispo, setLastDebutMiseDispo] = useState(new Date())
    const [debutMiseDispo, setDebutMiseDispo] = useState(
        lastdebutMiseDispo !== new Date() ? lastdebutMiseDispo : new Date(),
    )

    const [lastfinMiseDispo, setLastFinMiseDispo] = useState(new Date())
    const [finMiseDispo, setFinMiseDispo] = useState(
        lastfinMiseDispo !== new Date() ? lastfinMiseDispo : new Date(),
    )

    const [dateAcceptationRefusDon, setDateAcceptationRefusDon] = useState(
        new Date(),
    )
    const [
        codeUtilisateurAccepteRefuseDon,
        setCodeUtilisateurAccepteRefuseDon,
    ] = useState('')
    const [siteBeneficiaireDon, setSiteBeneficiaireDon] = useState('')
    const [dateRemerciement, setDateRemerciement] = useState(new Date())
    const [nomDestinataireCerfa, setNomDestinataireCerfa] = useState('')
    const [adresseDestinataireCerfa, setadresseDestinataireCerfa] = useState('')
    const [adresseMailDestinataireCerfa, setAdresseMailDestinataireCerfa] =
        useState('')
    const [telephoneDestinataireCerfa, setTelephoneDestinataireCerfa] =
        useState('')
    const [valeurCerfa, setValeurCerfa] = useState('0')
    const [dateCerfa, setDateCerfa] = useState(new Date())

    const [Dons, setDons] = useState<Don[]>([]) // list of dons
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)
    const [search, setSearch] = useState<Don[]>([])
    const [fileIndex, setFileIndex] = useState(8)
    const [fileIndex2, setFileIndex2] = useState(20)
    const [fields, setFields] = useState<
        {
            id: string
            type: FieldType
            value: string | null
            placeholder?: string
            url?: string
            createURL?: string
            required?: boolean
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[]
    >([])

    const handleClose = () => {
        setIsPopUpOpen(false)
        setindicateurRemerciement(false)
        setCerfaFait(false)
    }
    const handleEntiteDonatriceChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setEntiteDonatrice(event.target.value)
    }

    const handleTitreDonChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setTitreDon(event.target.value)
    }

    const handleCodeContactEntiteDonatriceChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeContactEntiteDonatrice(event.target.value)
    }

    const handleSiteBeneficiaireDonChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSiteBeneficiaireDon(event.target.value)
    }

    const handleIndicateurRemerciement = () => {
        setindicateurRemerciement(!indicateurRemerciement)
    }

    const handleCerfaFait = () => {
        setCerfaFait(!cerfaFait)
    }

    const handleDatePropositionDon = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDatePropositionDon(new Date(event.target.value))
    }

    const handleDateRemerciementChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDateRemerciement(new Date(event.target.value))
    }

    const handleDateCerfaChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDateCerfa(new Date(event.target.value))
    }

    const handleTypeDonChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedTypeDon(event.target.value)
    }

    const handleTypeCompetenceChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedTypeCompetence(event.target.value)
    }

    const handleDebutMiseDispoChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDebutMiseDispo(new Date(event.target.value))
    }

    const handleFinMiseDispoChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        let returnedDate = new Date(event.target.value)
        if (event.target.value) {
            const newFinMiseDispo = new Date(event.target.value)
                .toISOString()
                .split('T')[0]

            const debut = debutMiseDispo.toISOString().split('T')[0]
            if (newFinMiseDispo < debut) {
                returnedDate = debutMiseDispo
                setFinMiseDispo(returnedDate)
            } else {
                setFinMiseDispo(returnedDate)
            }
        }
    }

    const handleDateAcceptationRefusDonChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDateAcceptationRefusDon(new Date(event.target.value))
    }

    const handleCodeUtilisateurSaisieDonChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCodeUtilisateurSaisieDon(event.target.value)
    }

    const handleCodeUtilisateurAccepteRefuseDonChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCodeUtilisateurAccepteRefuseDon(event.target.value)
    }

    const handleStatutAcceptationDonChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setStatutAcceptationDon(event.target.value)
    }

    const handleMarchandiseChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedTypeMarchandise(event.target.value)
    }

    const handleCommentairesChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCommentaires(event.target.value)
    }

    const handleNomDestinataireCerfaChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNomDestinataireCerfa(event.target.value)
    }

    const handleadresseDestinataireCerfaChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setadresseDestinataireCerfa(event.target.value)
    }

    const handleAdresseMailDestinataireCerfaChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setAdresseMailDestinataireCerfa(event.target.value)
    }

    const handleTelephoneDestinataireCerfaChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setTelephoneDestinataireCerfa(event.target.value)
    }

    const handleValeurCerfaChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setValeurCerfa(event.target.value)
    }

    type FieldType =
        | 'number'
        | 'search'
        | 'date'
        | 'select'
        | 'input'
        | 'file'
        | 'checkbox'
        | 'enum'

    const generateFields = useCallback(
        (
            debutMiseDispo: Date,
            finMiseDispo: Date,
            selectedTypeDon: string,
            selectedTypeMarchandise: string,
            commentaires: string,
            statutAcceptationDon: string,
        ) => {
            const fields: {
                id: string
                type: FieldType
                value: string | null
                placeholder?: string
                url?: string
                createURL?: string
                required?: boolean
                maxLength?: number
                onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
                onInputChange?: (
                    event: React.ChangeEvent<HTMLInputElement>,
                ) => void
            }[] = [
                {
                    id: 'code_Entite_donatrice',
                    type: 'search',
                    value: EntiteDonatrice,
                    url: '../api/select/societe/entite',
                    required: true,
                    placeholder: 'Exemple: Entreprise Alpha',
                    onInputChange: handleEntiteDonatriceChange,
                },
                {
                    id: 'titre_don',
                    type: 'input',
                    value: titreDon,
                    placeholder: 'Exemple: Don de chocolat',
                    maxLength: 50,
                    required: true,
                    onInputChange: handleTitreDonChange,
                },
                {
                    id: 'date_proposition_don',
                    type: 'date',
                    value: !isNaN(datePropositionDon.getTime())
                        ? datePropositionDon.toISOString().split('T')[0]
                        : null,
                    required: true,
                    onInputChange: handleDatePropositionDon,
                },
                {
                    id: 'code_contact_Entite_donatrice',
                    type: 'select',
                    value: codeContactEntiteDonatrice,
                    url: `../api/select/societe/entite/${EntiteDonatrice}/contact`,
                    required: true,
                    onChange: handleCodeContactEntiteDonatriceChange,
                }, //si c'est un nouveau contact ?
                {
                    id: 'code_type_don',
                    type: 'select',
                    value: selectedTypeDon,
                    url: '../api/dons/type-don',
                    createURL: '/dons/type-don',
                    required: true,
                    onChange: handleTypeDonChange,
                },
                {
                    id: 'date_debut_mise_disposition',
                    type: 'date',
                    value: !isNaN(debutMiseDispo.getTime())
                        ? debutMiseDispo.toISOString().split('T')[0]
                        : null,
                    onInputChange: handleDebutMiseDispoChange,
                },
                {
                    id: 'date_fin_mise_disposition',
                    type: 'date',
                    value: !isNaN(finMiseDispo.getTime())
                        ? finMiseDispo.toISOString().split('T')[0]
                        : null,
                    onInputChange: handleFinMiseDispoChange,
                },
                {
                    id: 'commentaires',
                    type: 'input',
                    value: commentaires,
                    placeholder: 'Exemple: ...',
                    maxLength: 200,
                    onInputChange: handleCommentairesChange,
                },
                { id: 'pieces_associees', type: 'file', value: null },

                {
                    id: 'code_Utilisateur_saisie_don',
                    type: 'search',
                    placeholder: 'Exemple: Jean Dupont',
                    value: codeUtilisateurSaisieDon,
                    url: '../api/select/sites/utilisateurs',
                    required: true,
                    onInputChange: handleCodeUtilisateurSaisieDonChange,
                }, //default : login
                {
                    id: 'statut_acceptation_don',
                    type: 'select',
                    value: statutAcceptationDon,
                    url: '../api/select/dons',
                    required: true,
                    onChange: handleStatutAcceptationDonChange,
                },
                {
                    id: 'code_Utilisateur_accepte_refuse_don',
                    type: 'search',
                    value: codeUtilisateurAccepteRefuseDon,
                    url: '../api/select/sites/utilisateurs/donsAccepteRefuse',
                    placeholder: 'Exemple: Marie Dujardin',
                    required: true,
                    onInputChange: handleCodeUtilisateurAccepteRefuseDonChange,
                }, //default : login
                {
                    id: 'code_site_beneficiaire_don',
                    type: 'search',
                    url: '../api/select/sites',
                    createURL: '/sites',
                    value: siteBeneficiaireDon,
                    required: true,
                    placeholder: 'Exemple: Entrepôt Principal',
                    onInputChange: handleSiteBeneficiaireDonChange,
                },
                {
                    id: 'indicateur_remerciement',
                    type: 'checkbox',
                    value: indicateurRemerciement ? 'O' : 'N',
                    onInputChange: handleIndicateurRemerciement,
                },
                {
                    id: 'nom_destinataire_cerfa',
                    type: 'input',
                    value: nomDestinataireCerfa,
                    placeholder: 'Exemple: Dupont',
                    maxLength: 50,
                    onInputChange: handleNomDestinataireCerfaChange,
                },
                {
                    id: 'adresse_destinataire_cerfa',
                    type: 'input',
                    value: adresseDestinataireCerfa,
                    placeholder: 'Exemple: 12 rue des lilas, 59000 Lille',
                    maxLength: 100,
                    onInputChange: handleadresseDestinataireCerfaChange,
                },
                {
                    id: 'adresse_mail_destinataire_cerfa',
                    type: 'input',
                    value: adresseMailDestinataireCerfa,
                    placeholder: 'Exemple: Exemple@exemple.com',
                    maxLength: 100,
                    onInputChange: handleAdresseMailDestinataireCerfaChange,
                },
                {
                    id: 'telephone_destinataire_cerfa',
                    type: 'input',
                    value: telephoneDestinataireCerfa,
                    placeholder: 'Exemple: 0601020304',
                    maxLength: 12,
                    onInputChange: handleTelephoneDestinataireCerfaChange,
                },
                {
                    id: 'valeur_cerfa',
                    type: 'number',
                    value: valeurCerfa.toString(),
                    placeholder: 'Exemple: 100',
                    maxLength: 11,
                    onInputChange: handleValeurCerfaChange,
                },
                {
                    id: 'cerfa_fait',
                    type: 'checkbox',
                    value: cerfaFait ? 'O' : 'N',
                    onInputChange: handleCerfaFait,
                },
                {
                    id: 'cerfa',
                    type: 'file',
                    value: null,
                },
            ]

            let incrementFileIndex = 0
            let incrementFileIndex2 = 0

            const FindIndex = (id: string) => {
                return fields.findIndex(field => field.id === id) + 1
            }

            if (debutMiseDispo !== new Date()) {
                setLastDebutMiseDispo(debutMiseDispo)
                if (debutMiseDispo > finMiseDispo) {
                    setLastFinMiseDispo(debutMiseDispo)
                }
            }

            if (finMiseDispo !== new Date()) {
                setLastFinMiseDispo(finMiseDispo)
            }

            if (selectedTypeDon === 'SIP') {
                fields.splice(5, 0, {
                    id: 'code_type_competences',
                    type: 'select',
                    value: selectedTypeCompetence,
                    url: '../api/dons/type-competences',
                    onChange: handleTypeCompetenceChange,
                })
                incrementFileIndex++
                incrementFileIndex2++
            }

            if (selectedTypeDon === 'MAR') {
                fields.splice(5, 0, {
                    id: 'code_type_produits',
                    type: 'select',
                    value: selectedTypeMarchandise,
                    url: '../api/dons/type-produits',
                    onChange: handleMarchandiseChange,
                })
                incrementFileIndex++
                incrementFileIndex2++
            }

            if (
                selectedTypeDon === 'MAR' &&
                selectedTypeMarchandise === 'ALI'
            ) {
                fields.splice(6, 0, {
                    id: 'code_mode_conservation_produits',
                    type: 'select', //que si code_type_produits = alimentaire
                    value: null,
                    url: '../api/dons/type-mode-conservations-produits',
                })
                incrementFileIndex++
                incrementFileIndex2++
            }

            if (statutAcceptationDon === 'R' || statutAcceptationDon === 'V') {
                fields.splice(FindIndex('statut_acceptation_don'), 0, {
                    id: 'date_acceptation_refus_don',
                    type: 'date',
                    value: dateAcceptationRefusDon.toISOString().split('T')[0],
                    onInputChange: handleDateAcceptationRefusDonChange,
                }) //que si status different de attente)
                incrementFileIndex2++
            }

            if (indicateurRemerciement !== false) {
                fields.splice(FindIndex('indicateur_remerciement'), 0, {
                    id: 'date_remerciement',
                    type: 'date',
                    value: dateRemerciement.toISOString().split('T')[0],
                    onInputChange: handleDateRemerciementChange,
                }) //depend de indicateur_remerciement
                incrementFileIndex2++
            }

            if (cerfaFait !== false) {
                fields.splice(FindIndex('cerfa_fait'), 0, {
                    id: 'date_cerfa',
                    type: 'date',
                    value: dateCerfa.toISOString().split('T')[0],
                    onInputChange: handleDateCerfaChange,
                }) // depend de cerfa_fait
                incrementFileIndex2++
            }

            if (EntiteDonatrice !== undefined && fields[2] !== undefined) {
                fields[2].url = `../api/select/societe/entite/${parseInt(
                    EntiteDonatrice,
                )}/contact`
            }
            setFileIndex(8 + incrementFileIndex)
            setFileIndex2(20 + incrementFileIndex2)
            return fields
        },
        [
            indicateurRemerciement,
            EntiteDonatrice,
            commentaires,
            selectedTypeDon,
            selectedTypeMarchandise,
            statutAcceptationDon,
            debutMiseDispo,
            finMiseDispo,
            cerfaFait,
        ],
    )

    useEffect(() => {
        const fetchDons = async () => {
            const res = await fetch(
                `../api/dons?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Don[]; total: number } =
                await res.json()
            setDons(data)
            setTotalItems(total) // set the total items
            setFields(
                generateFields(
                    debutMiseDispo,
                    finMiseDispo,
                    selectedTypeDon,
                    selectedTypeMarchandise,
                    commentaires,
                    statutAcceptationDon,
                ),
            )
        }

        const fetchSearchDons = async () => {
            if (search.length === 0) {
                const res = await fetch('../api/dons')

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const { data }: { data: Don[] } = await res.json()
                setSearch(data)
            }
        }

        fetchDons()
        fetchSearchDons()
    }, [
        page,
        itemsPerPage,
        selectedTypeDon,
        selectedTypeMarchandise,
        statutAcceptationDon,
        debutMiseDispo,
        generateFields,
    ])

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleItemsPerPageChange = (newItemsPerPage: number): void => {
        setItemsPerPage(newItemsPerPage)
        setPage(1)
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'V':
                return 'Validé'
            case 'R':
                return 'Refusé'
            case 'A':
                return 'En attente'
            default:
                return ''
        }
    }

    return (
        <>
            <div className={style.page}>
                <h1 className={style.lg}>Dons</h1>
                <List
                    items={Dons.map(Don => ({
                        value1: Don.code_Don.toString()
                            ? Don.code_Don.toString()
                            : '/',
                        value2: Don.raison_sociale ? Don.raison_sociale : '/',
                        value3: Don.titre_don ? Don.titre_don : '/',
                        value4: Don.date_proposition_don
                            .toString()
                            .split('T')[0]
                            ? Don.date_proposition_don.toString().split('T')[0]
                            : '/',
                        value5: Don.statut_acceptation_don
                            ? Don.statut_acceptation_don
                            : '/',
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: '../api/dons',
                    }}
                    attribut={{
                        att1: 'Donateur',
                        att2: 'Titre du don',
                        att3: 'Date de proposition du don',
                        att4: 'Statut du don',
                    }}
                    searchItems={search.map(Don => ({
                        value1: Don.code_Don.toString(),
                        value2: Don.raison_sociale ? Don.raison_sociale : '',
                        value3: Don.titre_don ? Don.titre_don : '',
                        value4: Don.date_proposition_don
                            .toString()
                            .split('T')[0],
                        value5: Don.statut_acceptation_don
                            ? Don.statut_acceptation_don
                            : '',
                        value7: getStatusLabel(Don.statut_acceptation_don),
                    }))}
                    pageInfos={{
                        page,
                        itemsPerPage,
                        totalItems,
                        setTotal: setTotalItems,
                    }}
                    dataExcel={Dons}
                />
                <Pagination
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    currentPage={page}
                />
                {''}
                {isPopUpOpen && (
                    <div className={style.PopUp}>
                        <PopUp
                            onClose={handleClose}
                            url='../api/dons'
                            fields={fields} // Use the fields state here
                            fileUrl='../api/upload/piece'
                            fileUrl2='../api/upload/cerfa'
                            fileIndex={fileIndex}
                            fileIndex2={fileIndex2}
                        />
                    </div>
                )}
                <TypesButtons
                    items={[
                        { label: 'Types de don', url: 'type-don' },
                        {
                            label: 'Types de compétence',
                            url: 'type-competences',
                        },
                        { label: 'Types de produit', url: 'type-produits' },
                        {
                            label: 'Types de conservation des produits',
                            url: 'type-mode-conservation-produits',
                        },
                    ]}
                />
            </div>
        </>
    )
}

export default withAuthorization(DonsPage, ['AD', 'PR'])
