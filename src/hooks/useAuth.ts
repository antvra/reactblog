import { useSelector } from 'react-redux'

interface IState {
  user: {
    username: string
    email: string
    token: string
    image: string
  }
}

export const useAuth = () => {
  const { email, token, username, image } = useSelector(
    (state: IState) => state.user
  )

  return {
    isAuth: !!token,
    email,
    token,
    username,
    image
  }
}
