import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Session, User } from 'next-auth'

interface ExtendedUser extends User {
    role: Role
}

type ExtendedSession = Session & {
    user: ExtendedUser
}

type Role = 'AD' | 'PR' | 'RR' | 'AP' | 'RE' | 'RC' | 'RS' | 'RA' | 'RN'

const withAuthorization = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    allowedRoles: Role[],
) => {
    const WithAuthorization = (props: P) => {
        const { data: session, status: loading } = useSession() as {
            data: ExtendedSession | null
            status: string
        }
        const router = useRouter() // Move this line inside the component

        useEffect(() => {
            if (!loading && !session) {
                signIn()
            } else if (
                !loading &&
                session &&
                !allowedRoles.includes(session.user.role)
            ) {
                router.push('/')
            }
        }, [session, loading, router])

        if (session && allowedRoles.includes(session.user.role)) {
            return <WrappedComponent {...props} />
        }

        return null
    }

    WithAuthorization.displayName = `WithAuthorization(${getDisplayName(
        WrappedComponent,
    )})`

    return WithAuthorization
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getDisplayName(WrappedComponent: React.ComponentType<any>): string {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default withAuthorization

/**import withAuthorization from '../path/to/withAuthorization'

const MyProtectedPage = () => {
    // Page content here
}

export default withAuthorization(MyProtectedPage, ['AD', 'PR', 'RR']) */
