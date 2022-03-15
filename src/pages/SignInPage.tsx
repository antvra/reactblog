import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { setUser } from '../store/slices/userSlice'
import { SignInForm } from '../components/SignInForm'
import { useLoginExistingUserMutation } from '../store/API'

export const SignInPage = () => {
  const [loginExistingUser, { data, error: serverErrors }] =
    useLoginExistingUserMutation()
  const dispatch = useDispatch()

  const handleSubmit = (userData: object) => {
    loginExistingUser(userData).unwrap()
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
