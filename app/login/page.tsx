'use client'
import { signIn } from 'next-auth/react'
import style from '../../styles/components.module.css'

const LoginPage = () => {
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
            // Redirect to a protected page
            window.location.href = '/'
        } else if (result) {
            // Show error to user
            console.error(result.error)
        }
    }

    return (
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
    )
}

export default LoginPage
