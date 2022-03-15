import { message } from 'antd'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { EditProfileForm } from '../components/EditForm'
import { useAuth } from '../hooks/useAuth'
import { useEditProfileMutation } from '../store/API'
import { setUser } from '../store/slices/userSlice'

interface IUserData {
  username: string
  image: string
  email: string
  password: string
}

export const EditProfilePage = () => {
  const [editProfile, { data, error: serverErrors }] = useEditProfileMutation()
  const { token, username, image, email } = useAuth()
  const dispatch = useDispatch()

  const handleSubmit = (userData: IUserData) => {
    if (
      userData.username === username &&
      userData.image === image &&
      userData.email === email &&
      userData.password === ''
    ) {
      message.warning('Вы ничего не изменили.')
    } else {
      editProfile({ userData, token }).unwrap()
    }
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
    <EditProfileForm
      handleSubmit={handleSubmit}
      serverErrors={serverErrors}
      success={!!data}
    />
  )
}
