import LoginForm from '@/components/forms/login-form'
import redirectLoggedIn from '@/utils/functools/redirect-logged-in'

export default async function LoginPage() {
    await redirectLoggedIn()

    return <LoginForm />
}
