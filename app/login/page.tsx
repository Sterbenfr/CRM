'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import style from '../../styles/components.module.css'

const LoginPage = () => {
    const { data: session } = useSession<boolean>()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            email: { value: string }
            password: { value: string }
        }
        const email = target.email.value
        const password = target.password.value

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })

        if (result && !result.error) {
            window.location.href = '/'
        } else if (result) {
            console.error(result.error)
        }
    }

    const handleSignOut = async () => {
        document.cookie = 'next-auth.session-token'
        signOut()
    }

    const handleChangePassword = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            oldPassword: { value: string }
            newPassword: { value: string }
        }
        const oldPassword = target.oldPassword.value
        const newPassword = target.newPassword.value

        const response = await fetch('/api/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                oldPassword,
                newPassword,
                userId: session?.user?.id,
            }),
        })

        const result = await response.json()
        if (result.success) {
            const paragraph = document.querySelector('p')
            if (paragraph) {
                paragraph.textContent = 'Mot de passe changé avec succès !'
            }
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        } else {
            console.error(result.error)
            const paragraph = document.querySelector('p')
            if (paragraph) {
                paragraph.textContent =
                    'Erreur lors du changement de mot de passe.'
            }
        }
    }

    return (
        <div>
            {session ? (
                <>
                    <form
                        className={style.formu}
                        onSubmit={handleChangePassword}
                    >
                        <h1 className={style.lg}>Se deconnecter :</h1>
                        <div className={style.login}>
                            <button
                                className={style.submit}
                                onClick={handleSignOut}
                            >
                                Déconnexion
                            </button>
                        </div>
                    </form>
                    <form
                        className={style.formu}
                        onSubmit={handleChangePassword}
                    >
                        <h1 className={style.lg}>Changer le mot de passe :</h1>
                        <div className={style.log}>
                            <div className={style.login}>
                                <input
                                    className={style.input}
                                    name='oldPassword'
                                    type='password'
                                    placeholder='Ancien mot de passe'
                                    required
                                />
                            </div>
                            <div className={style.login}>
                                <input
                                    className={style.input}
                                    name='newPassword'
                                    type='password'
                                    placeholder='Nouveau mot de passe'
                                    required
                                />
                            </div>
                        </div>
                        <button className={style.submit} type='submit'>
                            Changer le mot de passe
                        </button>
                        <p
                            style={{
                                fontSize: '20px',
                                color: '#e5007d',
                                font: 'bold',
                            }}
                        ></p>
                    </form>
                </>
            ) : (
                <form className={style.formu} onSubmit={handleSubmit}>
                    <h1 className={style.lg}>Connexion :</h1>
                    <div className={style.log}>
                        <div className={style.login}>
                            <input
                                className={style.input}
                                name='email'
                                type='text'
                                placeholder='Email'
                                required
                            />
                        </div>
                        <div className={style.login}>
                            <input
                                className={style.input}
                                name='password'
                                type='password'
                                placeholder='Mot de passe'
                                required
                            />
                        </div>
                    </div>
                    <button className={style.submit} type='submit'>
                        Se connecter
                    </button>
                </form>
            )}
        </div>
    )
}

export default LoginPage
