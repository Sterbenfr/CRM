'use client'
import { useEffect, useState } from 'react'

interface type_utilisateur {
    code_type_utilisateur: string
    libelle: string
}

export default function UsersPage() {
    const [Utilisateurs, setUsers] = useState<type_utilisateur[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch(
                'http://localhost:3000/api/type_utilisateur',
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Utilisateurs: type_utilisateur[] = await res.json()
            setUsers(Utilisateurs)
        }

        fetchUsers()
    }, [])

    return (
        <div>
            <h1>Type Utilisateur</h1>
            {Utilisateurs.map(TypeUtilisateur => (
                <div key={TypeUtilisateur.code_type_utilisateur}>
                    <h2>{TypeUtilisateur.libelle}</h2>
                    <h2>{TypeUtilisateur.code_type_utilisateur}</h2>
                </div>
            ))}
        </div>
    )
}
