import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { setUser } from '../store/slices/userSlice'
import { SignInForm } from '../components/SignInForm'
import { useLoginExistingUserMutation } from '../store/API'

export const SignInPage = () => {
  const [serverErrors, changeServerErrors] = useState(null)

  const [loginExistingUser, { data }] = useLoginExistingUserMutation()
  const dispatch = useDispatch()

  const handleSubmit = (userData: object) => {
    loginExistingUser(userData)
      .unwrap()
      .catch((err) => changeServerErrors(err))
  }

  useEffect(() => {
    if (data) {
      dispatch(
        setUser({
          username: data.user.username,
          email: data.user.email,
          token: data.user.token,
          image: data.user.image
        })
      )
      localStorage.setItem('session-info', JSON.stringify(data))
    }
  }, [data, dispatch])

  return (
    <SignInForm
      serverErrors={serverErrors}
      success={!!data}
      handleSubmit={handleSubmit}
    />
  )
}
