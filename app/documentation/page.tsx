'use client'
import React, { useRef } from 'react'
import style from '../../styles/documentation.module.css'
import withAuthorization from '@/components/withAuthorization'

function Docu() {
    const elementRef = useRef<HTMLDivElement>(null)

    const scrollToElement = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
        event.preventDefault()
        const targetID = event.currentTarget.getAttribute('data-id')
        console.log('Target ID:', targetID)
        if (targetID) {
            // Add this check
            const TargetElement = document.getElementById(targetID)
            if (TargetElement) {
                const rect = TargetElement.getBoundingClientRect()
                const scrollTop =
                    window.pageYOffset || document.documentElement.scrollTop
                const elementTop = rect.top + scrollTop
                console.log('Scrolling to:', elementTop)
                window.scrollTo({
                    top: elementTop - 130,
                    behavior: 'smooth',
                })
            }
        }
    }
    return (
        <div className={style.globalStyles}>
            <div className={style.page}>
                <h1 className={style.titre}>Documentation</h1>
                <div className={style.sommaire}>
                    <h2 className={style.titre2}>Sommaire</h2>
                    <div>
                        <div>
                            <p className={style.pres}>
                                Cette documentation présente de manière claire
                                et concise toutes les informations nécessaires
                                pour utiliser notre application. Vous y
                                trouverez des instructions détaillées, des
                                exemples concrets et des astuces pour tirer le
                                meilleur parti de nos fonctionnalités. Vous
                                pourrez retrouver ci-dessous le sommaire de la
                                documentation. Pour accéder à une section en
                                particulier, cliquez sur le titre correspondant.
                                Ce sormaire es également représentatif de
                                l&apos;architecture de l&apos;application.
                            </p>
                        </div>
                        <div>
                            <ol className={style.numerotation} role='list'>
                                <li className={style.linkLi}>
                                    <a
                                        className={style.linkA}
                                        href='#1'
                                        data-id='1'
                                        onClick={scrollToElement}
                                    >
                                        <span className={style.titre2}>
                                            Fonctionnalités
                                        </span>
                                    </a>
                                    <ol
                                        className={style.sousNumerotation1}
                                        role='list'
                                    >
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#1.1'
                                                data-id='1.1'
                                                onClick={scrollToElement}
                                            >
                                                Supprimer des données
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#1.2'
                                                data-id='1.2'
                                                onClick={scrollToElement}
                                            >
                                                Exporter des données
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#1.3'
                                                data-id='1.3'
                                                onClick={scrollToElement}
                                            >
                                                Ajouter des données
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#1.4'
                                                data-id='1.4'
                                                onClick={scrollToElement}
                                            >
                                                Rechercher des données
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#1.5'
                                                data-id='1.5'
                                                onClick={scrollToElement}
                                            >
                                                Modifier des données
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#1.6'
                                                data-id='1.6'
                                                onClick={scrollToElement}
                                            >
                                                Imprimer des données
                                            </a>
                                        </li>
                                    </ol>
                                </li>
                                <li className={style.linkLi}>
                                    <a
                                        className={style.linkA}
                                        href='#2'
                                        data-id='2'
                                        onClick={scrollToElement}
                                    >
                                        <span className={style.titre2}>
                                            Les pages
                                        </span>
                                    </a>
                                    <ol
                                        className={style.sousNumerotation1}
                                        role='list'
                                    >
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#2.1'
                                                data-id='2.1'
                                                onClick={scrollToElement}
                                            >
                                                Le calendrier
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#2.2'
                                                data-id='2.2'
                                                onClick={scrollToElement}
                                            >
                                                Page dons
                                            </a>
                                            <ol
                                                className={
                                                    style.sousNumerotation2
                                                }
                                                role='list'
                                            >
                                                <li className={style.linkLi}>
                                                    <a
                                                        className={style.linkA}
                                                        href='#2.2.1'
                                                        data-id='2.2.1'
                                                        onClick={
                                                            scrollToElement
                                                        }
                                                    >
                                                        Modalité de la livraison
                                                    </a>
                                                </li>
                                                <li className={style.linkLi}>
                                                    <a
                                                        className={style.linkA}
                                                        href='#2.2.2'
                                                        data-id='2.2.2'
                                                        onClick={
                                                            scrollToElement
                                                        }
                                                    >
                                                        Reception de la
                                                        livraison
                                                    </a>
                                                </li>
                                            </ol>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#2.3'
                                                data-id='2.3'
                                                onClick={scrollToElement}
                                            >
                                                Page Entreprise
                                            </a>
                                            <ol
                                                className={
                                                    style.sousNumerotation2
                                                }
                                                role='list'
                                            >
                                                <li className={style.linkLi}>
                                                    <a
                                                        className={style.linkA}
                                                        href='#2.3.1'
                                                        data-id='2.3.1'
                                                        onClick={
                                                            scrollToElement
                                                        }
                                                    >
                                                        Entité(s) appartenant à
                                                        l&apos;entreprise
                                                    </a>
                                                    <ol
                                                        className={
                                                            style.sousNumerotation3
                                                        }
                                                        role='list'
                                                    >
                                                        <li
                                                            className={
                                                                style.linkLi
                                                            }
                                                        >
                                                            <a
                                                                className={
                                                                    style.linkA
                                                                }
                                                                href='#2.3.1.1'
                                                                data-id='2.3.1.1'
                                                                onClick={
                                                                    scrollToElement
                                                                }
                                                            >
                                                                Contact(s) de
                                                                l&apos;Entité
                                                            </a>
                                                        </li>
                                                        <li
                                                            className={
                                                                style.linkLi
                                                            }
                                                        >
                                                            <a
                                                                className={
                                                                    style.linkA
                                                                }
                                                                href='#2.3.1.2'
                                                                data-id='2.3.1.2'
                                                                onClick={
                                                                    scrollToElement
                                                                }
                                                            >
                                                                Interaction(s)
                                                                avec
                                                                l&apos;Entité
                                                            </a>
                                                        </li>
                                                        <li
                                                            className={
                                                                style.linkLi
                                                            }
                                                        >
                                                            <a
                                                                className={
                                                                    style.linkA
                                                                }
                                                                href='#2.3.1.3'
                                                                data-id='2.3.1.3'
                                                                onClick={
                                                                    scrollToElement
                                                                }
                                                            >
                                                                Utilisateur(s)
                                                                suivant
                                                                l&apos;Entité
                                                            </a>
                                                        </li>
                                                    </ol>
                                                </li>
                                                <li className={style.linkLi}>
                                                    <a
                                                        className={style.linkA}
                                                        href='#2.3.2'
                                                        data-id='2.3.2'
                                                        onClick={
                                                            scrollToElement
                                                        }
                                                    >
                                                        Groupe
                                                        d&apos;appartenance de
                                                        l&apos;entreprise
                                                    </a>
                                                    <ol
                                                        className={
                                                            style.sousNumerotation3
                                                        }
                                                        role='list'
                                                    >
                                                        <li
                                                            className={
                                                                style.linkLi
                                                            }
                                                        >
                                                            <a
                                                                className={
                                                                    style.linkA
                                                                }
                                                                href='#2.3.2.1'
                                                                data-id='2.3.2.1'
                                                                onClick={
                                                                    scrollToElement
                                                                }
                                                            >
                                                                Utilisateur(s)
                                                                suivant le
                                                                groupe
                                                            </a>
                                                        </li>
                                                    </ol>
                                                </li>
                                                <li className={style.linkLi}>
                                                    <a
                                                        className={style.linkA}
                                                        href='#2.3.3'
                                                        data-id='2.3.3'
                                                        onClick={
                                                            scrollToElement
                                                        }
                                                    >
                                                        Utilisateur(s) suivant
                                                        l&apos;entreprise
                                                    </a>
                                                </li>
                                            </ol>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#2.4'
                                                data-id='2.4'
                                                onClick={scrollToElement}
                                            >
                                                Page Sites RC
                                            </a>
                                            <ol
                                                className={
                                                    style.sousNumerotation2
                                                }
                                                role='list'
                                            >
                                                <li className={style.linkLi}>
                                                    <a
                                                        className={style.linkA}
                                                        href='#2.4.1'
                                                        data-id='2.4.1'
                                                        onClick={
                                                            scrollToElement
                                                        }
                                                    >
                                                        Utilisateurs du site
                                                    </a>
                                                </li>
                                            </ol>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#2.5'
                                                data-id='2.5.1'
                                                onClick={scrollToElement}
                                            >
                                                Page Prestataires
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#2.6'
                                                data-id='2.6.1'
                                                onClick={scrollToElement}
                                            >
                                                Page Utilisateurs
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#2.7'
                                                data-id='2.7'
                                                onClick={scrollToElement}
                                            >
                                                Page Compte
                                            </a>
                                        </li>
                                    </ol>
                                </li>

                                <li className={style.linkLi}>
                                    <a
                                        className={style.linkA}
                                        href='#3'
                                        data-id='3'
                                        onClick={scrollToElement}
                                    >
                                        <span className={style.titre2}>
                                            Les types
                                        </span>
                                    </a>
                                    <ol
                                        className={style.sousNumerotation1}
                                        role='list'
                                    >
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#3.1'
                                                data-id='3.1'
                                                onClick={scrollToElement}
                                            >
                                                Types de don
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#3.2'
                                                data-id='3.2'
                                                onClick={scrollToElement}
                                            >
                                                Types de compétence
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#3.3'
                                                data-id='3.3'
                                                onClick={scrollToElement}
                                            >
                                                Types de produit
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#3.4'
                                                data-id='3.4'
                                                onClick={scrollToElement}
                                            >
                                                Types de conservation des
                                                produits
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#3.5'
                                                data-id='3.5'
                                                onClick={scrollToElement}
                                            >
                                                Types de livraison
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#3.6'
                                                data-id='3.6'
                                                onClick={scrollToElement}
                                            >
                                                Types d&apos;activité
                                                d&apos;entreprise
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#3.7'
                                                data-id='3.7'
                                                onClick={scrollToElement}
                                            >
                                                Types d&apos;Entité
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#3.8'
                                                data-id='3.8'
                                                onClick={scrollToElement}
                                            >
                                                Types de fréqence Cerfa
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='3.9'
                                                data-id='3.9'
                                                onClick={scrollToElement}
                                            >
                                                Types d&apos;interactions
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#3.10'
                                                data-id='3.10'
                                                onClick={scrollToElement}
                                            >
                                                Types de modalités
                                                d&apos;interactions
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#3.11'
                                                data-id='3.11'
                                                onClick={scrollToElement}
                                            >
                                                Types de sites
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#3.12'
                                                data-id='3.12'
                                                onClick={scrollToElement}
                                            >
                                                Types de lien
                                            </a>
                                        </li>
                                        <li className={style.linkLi}>
                                            <a
                                                className={style.linkA}
                                                href='#3.13'
                                                data-id='3.13'
                                                onClick={scrollToElement}
                                            >
                                                Types d&apos;Utilisateurs
                                            </a>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className={style.compart}>
                    <h2 className={style.titre2} id='1' ref={elementRef}>
                        Fonctionnalité
                    </h2>
                    <div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='1.1'
                                ref={elementRef}
                            >
                                Supprimer des données
                            </h3>

                            <p>
                                Pour supprimer des données, suivez ces étapes :
                            </p>
                            <br />
                            <ol>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Sélection :
                                    </span>{' '}
                                    Cochez les cases correspondantes aux
                                    éléments que vous souhaitez supprimer.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Confirmation :
                                    </span>{' '}
                                    Cliquez sur le bouton &quot;Supprimer&quot;.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Validation :
                                    </span>{' '}
                                    Une alerte va apparaître en haut de la page.
                                    Vous pourrez alors valider la sélection en
                                    cliquant sur &quot;Ok&quot; ou
                                    &quot;Annuler&quot; la suppression.
                                </li>
                            </ol>
                            <br />
                            <p>
                                <span className={style.attention}>
                                    Attention :
                                </span>{' '}
                                Cette action est irréversible. Les données
                                supprimées ne pourront pas être récupérées.
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='1.2'
                                ref={elementRef}
                            >
                                Exporter des données
                            </h3>
                            <p>
                                Vous pouvez exporter vos données au format Excel
                                de deux manières :
                            </p>
                            <br />
                            <ol>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Exporter tout :
                                    </span>{' '}
                                    Cliquez directement sur le bouton
                                    &quot;Exporter&quot;.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Exporter une sélection :
                                    </span>{' '}
                                    Cochez les éléments à exporter. Cliquez
                                    ensuite sur le bouton &quot;Exporter&quot;.
                                </li>
                            </ol>
                            <br />
                            <p>
                                <span className={style.attention}>
                                    Attention :
                                </span>{' '}
                                Cette fonctionnalité n&apos;est pas disponible
                                pour les pages de type &quot;types&quot; et
                                &quot;site-lien&quot;. Pour plus
                                d&apos;informations sur les types de pages,
                                consultez la documentation dédiée.
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='1.3'
                                ref={elementRef}
                            >
                                Ajouter des données
                            </h3>
                            <p>Pour ajouter de nouvelles données :</p>
                            <br />
                            <ol>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Localisez :
                                    </span>{' '}
                                    Accédez à la page où vous souhaitez ajouter
                                    les données.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Ajouter :
                                    </span>{' '}
                                    Cliquez sur le bouton &quot;Ajouter&quot;.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Remplissez :
                                    </span>{' '}
                                    Saisissez les informations requises dans
                                    chacun des champs du formulaire. Les champs
                                    obligatoires sont signalés par un astérisque{' '}
                                    <span className={style.important}>*</span>.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Enregistrer :
                                    </span>{' '}
                                    Confirmez votre ajout en cliquant sur le
                                    bouton &quot;Enregistrer&quot; en bas du
                                    formulaire.
                                </li>
                            </ol>
                            <br />
                            <p>
                                <span className={style.attention}>
                                    Attention :
                                </span>{' '}
                                Si le formulaire ne s&apos;envoie pas, il est
                                probable qu&apos;il manque des informations
                                obligatoires. Elles vous seront signalées par un
                                message d&apos;erreur. à côté du champ concerné.
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='1.4'
                                ref={elementRef}
                            >
                                Rechercher des données
                            </h3>
                            <p>Pour effectuer une recherche :</p>
                            <br />
                            <ol>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Localisez :
                                    </span>{' '}
                                    Accédez à la page où vous souhaitez
                                    rechercher des données.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Saisir :
                                    </span>{' '}
                                    Dans le champ de recherche situé en haut de
                                    la page, saisissez le mot ou la phrase que
                                    vous recherchez. Pour que la recherche soit
                                    efficace, saisissez les 3 premières lettres
                                    du mot que vous recherchez.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        A noter :
                                    </span>{' '}
                                    Dans la page des dons, vous pouvez
                                    rechercher par statut du don. Il vous suffit
                                    de taper dans la barre de recherche le
                                    statut que vous souhaitez. (validé, en
                                    attente, refusé)
                                </li>
                            </ol>
                            <br />
                            <p>
                                <span className={style.attention}>
                                    Attention :
                                </span>{' '}
                                Utilisez des accents et un seul espace entre les
                                mots pour affiner vos résultats. (ils peuvent
                                avoir une incidence sur la recherche).
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='1.5'
                                ref={elementRef}
                            >
                                Modifier des données
                            </h3>
                            <p>Pour modifier des données :</p>
                            <br />
                            <ol>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Sélection :
                                    </span>{' '}
                                    Cliquez dans l&apos;une des pages sur une
                                    ligne pour sélectionner l&apos;élément à
                                    modifier.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Cliquez :
                                    </span>{' '}
                                    En haut de la page, vous pourrez voir un
                                    bouton &quot;Modifier&quot;. Cliquez dessus.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Modification :
                                    </span>{' '}
                                    Un formulaire s&apos;affichera, présentant
                                    les champs modifiables. Modifiez les valeurs
                                    selon vos besoins.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Enregistrement :
                                    </span>{' '}
                                    Cliquez sur le bouton
                                    &quot;Enregistrer&quot; situé en bas du
                                    formulaire pour valider les changements.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Annuler :
                                    </span>{' '}
                                    Pour annuler les modifications en cours,
                                    cliquez sur la flèche de retour située en
                                    haut à droite de la page.
                                </li>
                            </ol>
                            <br />
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='1.6'
                                ref={elementRef}
                            >
                                Imprimer des données
                            </h3>
                            <p>Pour imprimer des données :</p>
                            <br />
                            <ol>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Localisez :
                                    </span>{' '}
                                    Accédez à la page où vous souhaitez imprimer
                                    des données.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Sélection :
                                    </span>{' '}
                                    Cliquez dans les cases à gauche des lignes
                                    de données pour sélectionner les éléments à
                                    imprimer.
                                    <br />
                                    <span className={style.important}>
                                        Tout sélectionner :
                                    </span>{' '}
                                    Pour sélectionner tous les éléments à
                                    imprimer. Il vous suffira de cliquer
                                    directement sur le bouton imprimé en haut de
                                    la page. (Il n&apos;est pas nécessaire de
                                    cocher des cases individuellement !)
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Impression :
                                    </span>{' '}
                                    Cliquer sur le bouton &quot;imprimer&quot;
                                    en haut de la page.
                                </li>
                            </ol>
                        </div>
                    </div>
                    <h2 className={style.titre2} id='2' ref={elementRef}>
                        Les pages
                    </h2>
                    <div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='2.1'
                                ref={elementRef}
                            >
                                Le calendrier
                            </h3>

                            <p>Sur cette page, vous pourrez retrouver :</p>
                            <br />
                            <ol>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        4 cases cochables :
                                    </span>{' '}
                                    Vous pourrez sélectionner les informations
                                    qui vous sont intéressantes à être affiche
                                    sur le calendrier.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Le calendrier :
                                    </span>{' '}
                                    Vous pourrez retrouver sur le coin supérieur
                                    gauche 2 flèches pour pouvoir naviguer dans
                                    celui-ci.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Le informations :
                                    </span>{' '}
                                    Une fois une ou plusieurs cases cochées,
                                    vous pourrez retrouver toutes ces
                                    informations sur le calendrier pour y
                                    accéder, vous pourrez cliquer directement
                                    dessus.
                                </li>
                            </ol>
                            <br />
                            <p>
                                <span className={style.attention}>
                                    Attention :
                                </span>{' '}
                                il se peut que plusieurs informations aient
                                besoin d&apos;être affiché un même jour pour
                                pouvoir toute y accéder, il vous suffit de
                                cliquer sur le + en bas du jour.
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='2.2'
                                ref={elementRef}
                            >
                                Dons
                            </h3>

                            <p>Sur cette page, vous pourrez retrouver :</p>
                            <br />
                            <ol>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Pagination et affichage :
                                    </span>{' '}
                                    Vous pouvez paginer les résultats en bas de
                                    page et personnaliser le nombre de dons
                                    affichés par page.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Triage :
                                    </span>{' '}
                                    Les dons sont classés par date de création,
                                    du plus récent au plus ancien.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Accès aux détails :
                                    </span>{' '}
                                    Pour consulter les informations détaillées
                                    d&apos;un don, cliquez simplement sur
                                    l&apos;un des éléments présentés.
                                </li>
                            </ol>
                            <br />
                            <p>
                                <span className={style.attention}>
                                    Attention :
                                </span>{' '}
                                la case à gauche de chaque ligne est réservée
                                aux actions spécifiques (voir les{' '}
                                <a
                                    className={style.linkA}
                                    href='#1'
                                    data-id='1'
                                    onClick={scrollToElement}
                                >
                                    Fonctionnalités
                                </a>
                                ). Ne cochez pas ces cases si vous ne souhaitez
                                pas réaliser des actions sur les dons.
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='2.2.1'
                                ref={elementRef}
                            >
                                Modalité de la livraison
                            </h3>
                            <br />
                            <p>
                                <span className={style.important}>
                                    Accessibilité :
                                </span>{' '}
                                Cette page est accessible depuis la page
                                d&apos;information d&apos;un don(voir la page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.2'
                                    data-id='2.2'
                                    onClick={scrollToElement}
                                >
                                    Dons
                                </a>
                                )
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='2.2.2'
                                ref={elementRef}
                            >
                                Reception de la livraison
                            </h3>
                            <br />
                            <p>
                                <span className={style.important}>
                                    Accessibilité :
                                </span>{' '}
                                Cette page est accessible depuis la page
                                d&apos;information d&apos;un don(voir la page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.2'
                                    data-id='2.2'
                                    onClick={scrollToElement}
                                >
                                    Dons
                                </a>
                                )
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='2.3'
                                ref={elementRef}
                            >
                                Entreprise
                            </h3>

                            <p>Sur cette page, vous pourrez retrouver :</p>
                            <br />
                            <ol>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Pagination et affichage :
                                    </span>{' '}
                                    Vous pouvez paginer les résultats en bas de
                                    page et personnaliser le nombre
                                    d&apos;entreprise affichés par page.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Triage :
                                    </span>{' '}
                                    Les Entreprises sont classés par date de
                                    création, du plus récent au plus ancien.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Accès aux détails :
                                    </span>{' '}
                                    Pour consulter les informations détaillées
                                    d&apos;une entreprise, cliquez simplement
                                    sur l&apos;un des éléments présentés.
                                </li>
                            </ol>
                            <br />
                            <p>
                                <span className={style.attention}>
                                    Attention :
                                </span>{' '}
                                la case à gauche de chaque ligne est réservée
                                aux actions spécifiques (voir les{' '}
                                <a
                                    className={style.linkA}
                                    href='#1'
                                    data-id='1'
                                    onClick={scrollToElement}
                                >
                                    Fonctionnalités
                                </a>
                                ). Ne cochez pas ces cases si vous ne souhaitez
                                pas réaliser des actions sur les Entreprises.
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='2.3.1'
                                ref={elementRef}
                            >
                                Entité(s) appartenant à l&apos;entreprise
                            </h3>
                            <br />
                            <p>
                                <span className={style.important}>
                                    Accessibilité :
                                </span>{' '}
                                Cette page est accessible depuis la page
                                d&apos;information d&apos;une entreprise(voir la
                                page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.3'
                                    data-id='2.3'
                                    onClick={scrollToElement}
                                >
                                    Entreprise
                                </a>
                                )
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='2.3.1.1'
                                ref={elementRef}
                            >
                                Contact(s) de l&apos;Entité
                            </h3>
                            <br />
                            <p>
                                <span className={style.important}>
                                    Accessibilité :
                                </span>{' '}
                                Cette page est accessible depuis la page
                                d&apos;information d&apos;une entité(s)
                                appartenant à l&apos;entreprise(voir la page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.3.1'
                                    data-id='2.3.1'
                                    onClick={scrollToElement}
                                >
                                    Entité(s) appartenant à l&apos;entreprise
                                </a>
                                )
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='2.3.1.2'
                                ref={elementRef}
                            >
                                Interaction(s) avec l&apos;Entité
                            </h3>
                            <br />
                            <p>
                                <span className={style.important}>
                                    Accessibilité :
                                </span>{' '}
                                Cette page est accessible depuis la page
                                d&apos;information d&apos;une entité(s)
                                appartenant à l&apos;entreprise(voir la page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.3.1'
                                    data-id='2.3.1'
                                    onClick={scrollToElement}
                                >
                                    Entité(s) appartenant à l&apos;entreprise
                                </a>
                                )
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='2.3.1.3'
                                ref={elementRef}
                            >
                                Utilisateur(s) suivant l&apos;Entité
                            </h3>
                            <br />
                            <p>
                                <span className={style.important}>
                                    Accessibilité :
                                </span>{' '}
                                Cette page est accessible depuis la page
                                d&apos;information d&apos;une Entité(s)
                                appartenant à l&apos;entreprise(voir la page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.3.1'
                                    data-id='2.3.1'
                                    onClick={scrollToElement}
                                >
                                    Entité(s) appartenant à l&apos;entreprise
                                </a>
                                )
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='2.3.2'
                                ref={elementRef}
                            >
                                Groupe d&apos;appartenance de l&apos;entreprise
                            </h3>
                            <br />
                            <p>
                                <span className={style.important}>
                                    Accessibilité :
                                </span>{' '}
                                Cette page est accessible depuis la page
                                d&apos;information d&apos;une entreprise(voir la
                                page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.3'
                                    data-id='2.3'
                                    onClick={scrollToElement}
                                >
                                    Entreprise
                                </a>
                                )
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='2.3.2.1'
                                ref={elementRef}
                            >
                                Utilisateur(s) suivant le groupe
                            </h3>
                            <br />
                            <p>
                                <span className={style.important}>
                                    Accessibilité :
                                </span>{' '}
                                Cette page est accessible depuis la page
                                d&apos;information d&apos;un groupe
                                d&apos;appartenance de l&apos;entreprise(voir la
                                page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.3.2'
                                    data-id='2.3.2'
                                    onClick={scrollToElement}
                                >
                                    Groupe d&apos;appartenance de
                                    l&apos;entreprise
                                </a>
                                )
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='2.3.3'
                                ref={elementRef}
                            >
                                Utilisateur(s) suivant l&apos;entreprise
                            </h3>
                            <br />
                            <p>
                                <span className={style.important}>
                                    Accessibilité :
                                </span>{' '}
                                Cette page est accessible depuis la page
                                d&apos;information d&apos;une entreprise(voir la
                                page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.3'
                                    data-id='2.3'
                                    onClick={scrollToElement}
                                >
                                    Entreprise
                                </a>
                                )
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='2.4'
                                ref={elementRef}
                            >
                                Sites RC
                            </h3>

                            <p>Sur cette page, vous pourrez retrouver :</p>
                            <br />
                            <ol>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Pagination et affichage :
                                    </span>{' '}
                                    Vous pouvez paginer les résultats en bas de
                                    page et personnaliser le nombre de sites du
                                    RC affichés par page.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Triage :
                                    </span>{' '}
                                    Les sites du RC sont classés par date de
                                    création, du plus récent au plus ancien.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Accès aux détails :
                                    </span>{' '}
                                    Pour consulter les informations détaillées
                                    d&apos;un site du RC, cliquez simplement sur
                                    l&apos;un des éléments présentés.
                                </li>
                            </ol>
                            <br />
                            <p>
                                <span className={style.attention}>
                                    Attention :
                                </span>{' '}
                                la case à gauche de chaque ligne est réservée
                                aux actions spécifiques (voir les{' '}
                                <a
                                    className={style.linkA}
                                    href='#1'
                                    data-id='1'
                                    onClick={scrollToElement}
                                >
                                    Fonctionnalités
                                </a>
                                ). Ne cochez pas ces cases si vous ne souhaitez
                                pas réaliser des actions sur les sites du RC.
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='2.4.1'
                                ref={elementRef}
                            >
                                Utilisateurs du site
                            </h3>
                            <br />
                            <p>
                                <span className={style.important}>
                                    Accessibilité :
                                </span>{' '}
                                Cette page est accessible depuis la page
                                d&apos;information d&apos;un Sites RC(voir la
                                page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.4'
                                    data-id='2.4'
                                    onClick={scrollToElement}
                                >
                                    Sites RC
                                </a>
                                )
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='2.5'
                                ref={elementRef}
                            >
                                Prestataires
                            </h3>

                            <p>Sur cette page, vous pourrez retrouver :</p>
                            <br />
                            <ol>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Pagination et affichage :
                                    </span>{' '}
                                    Vous pouvez paginer les résultats en bas de
                                    page et personnaliser le nombre de
                                    prestataires affichés par page.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Triage :
                                    </span>{' '}
                                    Les prestataires sont classés par date de
                                    création, du plus récent au plus ancien.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Accès aux détails :
                                    </span>{' '}
                                    Pour consulter les informations détaillées
                                    d&apos;un prestataire, cliquez simplement
                                    sur l&apos;un des éléments présentés.
                                </li>
                            </ol>
                            <br />
                            <p>
                                <span className={style.attention}>
                                    Attention :
                                </span>{' '}
                                la case à gauche de chaque ligne est réservée
                                aux actions spécifiques (voir les{' '}
                                <a
                                    className={style.linkA}
                                    href='#1'
                                    data-id='1'
                                    onClick={scrollToElement}
                                >
                                    Fonctionnalités
                                </a>
                                ). Ne cochez pas ces cases si vous ne souhaitez
                                pas réaliser des actions sur les prestataires.
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='2.6'
                                ref={elementRef}
                            >
                                Utilisateurs
                            </h3>

                            <p>Sur cette page, vous pourrez retrouver :</p>
                            <br />
                            <ol>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Pagination et affichage :
                                    </span>{' '}
                                    Vous pouvez paginer les résultats en bas de
                                    page et personnaliser le nombre
                                    d&apos;utilisateurs affichés par page.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Triage :
                                    </span>{' '}
                                    Les utilisateurs sont classés par date de
                                    création, du plus récent au plus ancien.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Accès aux détails :
                                    </span>{' '}
                                    Pour consulter les informations détaillées
                                    d&apos;un utilisateur, cliquez simplement
                                    sur l&apos;un des éléments présentés.
                                </li>
                            </ol>
                            <br />
                            <p>
                                <span className={style.attention}>
                                    Attention :
                                </span>{' '}
                                la case à gauche de chaque ligne est réservée
                                aux actions spécifiques (voir les{' '}
                                <a
                                    className={style.linkA}
                                    href='#1'
                                    data-id='1'
                                    onClick={scrollToElement}
                                >
                                    Fonctionnalités
                                </a>
                                ). Ne cochez pas ces cases si vous ne souhaitez
                                pas réaliser des actions sur les utilisateurs.
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='2.7'
                                ref={elementRef}
                            >
                                Compte
                            </h3>

                            <p>Sur cette page, vous pourrez retrouver :</p>
                            <br />
                            <ol>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Déconnexion :
                                    </span>{' '}
                                    Cliquez sur le bouton
                                    &quot;Déconnexion&quot; pour vous
                                    déconnecter de votre compte.
                                </li>
                                <li className={style.linkLi}>
                                    <span className={style.important}>
                                        Modification du mot de passe :
                                    </span>{' '}
                                    Vous pourrez modifier votre mot de passe si
                                    nécessaire.
                                </li>
                            </ol>
                            <br />
                            <p>
                                <span className={style.attention}>
                                    Attention :
                                </span>{' '}
                                Pour une sécurité optimale, choisissez un mot de
                                passe d&apos;au moins 8 caractères comprenant au
                                moins un chiffre, une majuscule et un caractère
                                spécial.
                            </p>
                        </div>
                    </div>

                    <h2 className={style.titre2} id='3' ref={elementRef}>
                        Les types
                    </h2>
                    <div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='3.1'
                                ref={elementRef}
                            >
                                Types de dons
                            </h3>

                            <p>Pour y accéder :</p>
                            <br />
                            <p>
                                Accéder à la page dons (Voir ici comment accéder
                                à la page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2'
                                    data-id='2'
                                    onClick={scrollToElement}
                                >
                                    dons
                                </a>
                                ) puis dirigez vous en bas de la page ou vous
                                pourrez cliquer sur le bouton &quot;Types de
                                dons&quot;
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='3.2'
                                ref={elementRef}
                            >
                                Types de compétence
                            </h3>
                            <p>Pour y accéder :</p>
                            <br />
                            <p>
                                Accéder à la page dons (Voir ici comment accéder
                                à la page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2'
                                    data-id='2'
                                    onClick={scrollToElement}
                                >
                                    dons
                                </a>
                                ) puis dirigez vous en bas de la page ou vous
                                pourrez cliquer sur le bouton &quot;Types de
                                compétence&quot;
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='3.3'
                                ref={elementRef}
                            >
                                Types de produit
                            </h3>
                            <p>Pour y accéder :</p>
                            <br />
                            <p>
                                Accéder à la page dons (Voir ici comment accéder
                                à la page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.2'
                                    data-id='2.2'
                                    onClick={scrollToElement}
                                >
                                    dons
                                </a>
                                ) puis dirigez vous en bas de la page ou vous
                                pourrez cliquer sur le bouton &quot;Types de
                                produit&quot;
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='3.4'
                                ref={elementRef}
                            >
                                Types de conservation des produits
                            </h3>
                            <p>Pour y accéder :</p>
                            <br />
                            <p>
                                Accéder à la page dons (Voir ici comment accéder
                                à la page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2'
                                    data-id='2'
                                    onClick={scrollToElement}
                                >
                                    dons
                                </a>
                                ) puis dirigez vous en bas de la page ou vous
                                pourrez cliquer sur le bouton &quot;Types de
                                conservation des produits&quot;
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='3.5'
                                ref={elementRef}
                            >
                                Types de livraison
                            </h3>
                            <p>Pour y accéder :</p>
                            <br />
                            <p>
                                Accéder à la page Modalité de la livraison (Voir
                                ici comment accéder à la page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.2.1'
                                    data-id='2.2.1'
                                    onClick={scrollToElement}
                                >
                                    Modalité de la livraison
                                </a>
                                ) puis dirigez vous en bas de la page ou vous
                                pourrez cliquer sur le bouton &quot;Types de
                                livraison&quot;
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='3.6'
                                ref={elementRef}
                            >
                                Types d&apos;activité d&apos;entreprise
                            </h3>
                            <p>Pour y accéder :</p>
                            <br />
                            <p>
                                Accéder à la page Reception de la livraison
                                (Voir ici comment accéder à la page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.3'
                                    data-id='2.3'
                                    onClick={scrollToElement}
                                >
                                    Entreprise
                                </a>
                                ) puis dirigez vous en bas de la page ou vous
                                pourrez cliquer sur le bouton &quot;Types
                                d&apos;activité d&apos;entreprise&quot;
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='3.7'
                                ref={elementRef}
                            >
                                Types d&apos;Entité
                            </h3>
                            <p>Pour y accéder :</p>
                            <br />
                            <p>
                                Accéder à la page Entité(s) appartenant à
                                l&apos;entreprise (Voir ici comment accéder à la
                                page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.3.1'
                                    data-id='2.3.1'
                                    onClick={scrollToElement}
                                >
                                    Entité(s) appartenant à l&apos;entreprise
                                </a>
                                ) puis dirigez vous en bas de la page ou vous
                                pourrez cliquer sur le bouton &quot;Types
                                d&apos;Entité&quot;
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='3.8'
                                ref={elementRef}
                            >
                                Types de fréqence Cerfa
                            </h3>
                            <p>Pour y accéder :</p>
                            <br />
                            <p>
                                Accéder à la page Entité(s) appartenant à
                                l&apos;entreprise (Voir ici comment accéder à la
                                page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.3.1'
                                    data-id='2.3.1'
                                    onClick={scrollToElement}
                                >
                                    Entité(s) appartenant à l&apos;entreprise
                                </a>
                                ) puis dirigez vous en bas de la page ou vous
                                pourrez cliquer sur le bouton &quot;Types de
                                fréqence Cerfa&quot;
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='3.9'
                                ref={elementRef}
                            >
                                Types d&apos;interactions
                            </h3>
                            <p>Pour y accéder :</p>
                            <br />
                            <p>
                                Accéder à la page Interaction(s) avec
                                l&apos;Entité (Voir ici comment accéder à la
                                page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.3.1.2'
                                    data-id='2.3.1.2'
                                    onClick={scrollToElement}
                                >
                                    Interaction(s) avec l&apos;Entité
                                </a>
                                ) puis dirigez vous en bas de la page ou vous
                                pourrez cliquer sur le bouton &quot;Types
                                d&apos;interactions&quot;
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='3.10'
                                ref={elementRef}
                            >
                                Types de modalités d&apos;interactions
                            </h3>
                            <p>Pour y accéder :</p>
                            <br />
                            <p>
                                Accéder à la page Interaction(s) avec
                                l&apos;Entité (Voir ici comment accéder à la
                                page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.3.1.2'
                                    data-id='2.3.1.2'
                                    onClick={scrollToElement}
                                >
                                    Interaction(s) avec l&apos;Entité
                                </a>
                                ) puis dirigez vous en bas de la page ou vous
                                pourrez cliquer sur le bouton &quot;Types de
                                modalités d&apos;interactions&quot;
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='3.11'
                                ref={elementRef}
                            >
                                Types de sites
                            </h3>
                            <p>Pour y accéder :</p>
                            <br />
                            <p>
                                Accéder à la page Sites RC (Voir ici comment
                                accéder à la page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.4'
                                    data-id='2.4'
                                    onClick={scrollToElement}
                                >
                                    Sites RC
                                </a>
                                ) puis dirigez vous en bas de la page ou vous
                                pourrez cliquer sur le bouton &quot;Types de
                                sites&quot;
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='3.12'
                                ref={elementRef}
                            >
                                Types d&apos;Utilisateurs
                            </h3>
                            <p>Pour y accéder :</p>
                            <br />
                            <p>
                                Accéder à la page Utilisateurs du site ou
                                Utilisateurs(Voir ici comment accéder à la page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.4.1'
                                    data-id='2.4.1'
                                    onClick={scrollToElement}
                                >
                                    Utilisateurs du site
                                </a>{' '}
                                ou{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.6'
                                    data-id='2.6'
                                    onClick={scrollToElement}
                                >
                                    Utilisateurs
                                </a>
                                ) puis dirigez vous en bas de la page ou vous
                                pourrez cliquer sur le bouton &quot;Types
                                d&apos;Utilisateurs&quot;
                            </p>
                        </div>
                        <div className={style.sousCompart}>
                            <h3
                                className={style.titre3}
                                id='3.13'
                                ref={elementRef}
                            >
                                Types de Prestataires
                            </h3>
                            <p>Pour y accéder :</p>
                            <br />
                            <p>
                                Accéder à la page Prestataires (Voir ici comment
                                accéder à la page{' '}
                                <a
                                    className={style.linkA}
                                    href='#2.5'
                                    data-id='2.5'
                                    onClick={scrollToElement}
                                >
                                    Prestataires
                                </a>
                                ) puis dirigez vous en bas de la page ou vous
                                pourrez cliquer sur le bouton &quot;Types de
                                Prestataires&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withAuthorization(Docu, ['AD', 'AP', 'SU', 'EN'])
