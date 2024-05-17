import LoginForm from '@/components/forms/LoginForm'
import protectFromLogged from '@/utils/functools/protectFromLogged'

export default async function LoginPage() {
    await protectFromLogged()

    return <LoginForm />
}
