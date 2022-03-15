import { SignUpForm } from '../components/SignUpForm'
import { useRegisterNewUserMutation } from '../store/API'

export const SignUpPage = () => {
  const [registerNewUser, { data, error: serverErrors }] =
    useRegisterNewUserMutation()

  const handleSubmit = (userData: object) => {
    registerNewUser(userData).unwrap()
  }
  return (
    <SignUpForm
      serverErrors={serverErrors}
      success={!!data}
      handleSubmit={handleSubmit}
    />
  )
}
