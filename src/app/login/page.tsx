import LoginForm from '@/components/forms/login-form'
import protectFromLogged from '@/utils/functools/protectFromLogged'

export default async function LoginPage() {
    await protectFromLogged()

    return <LoginForm />
}
