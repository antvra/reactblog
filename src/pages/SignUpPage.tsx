import { useState } from 'react'

import { SignUpForm } from '../components/SignUpForm'
import { useRegisterNewUserMutation } from '../store/API'

export const SignUpPage = () => {
  const [serverErrors, changeServerErrors] = useState(null)

  const [registerNewUser, { data }] = useRegisterNewUserMutation()

  const handleSubmit = (userData: object) => {
    registerNewUser(userData)
      .unwrap()
      .catch((err) => changeServerErrors(err))
  }
  return (
    <SignUpForm
      serverErrors={serverErrors}
      success={!!data}
      handleSubmit={handleSubmit}
    />
  )
}
