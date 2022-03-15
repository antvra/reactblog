import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { unsetUser } from '../../store/slices/userSlice'

import './Header.scss'

const Header = () => {
  const { isAuth, username, image } = useAuth()
  const dispatch = useDispatch()
  return (
    <header className="header">
      <NavLink to="/articles" className="header__logo">
        RealWorld Blog
      </NavLink>
      {!isAuth && (
        <div className="header__buttons">
          <NavLink to="/sign-in" className="header__btn header__btn_sign-in">
            Sign In
          </NavLink>
          <NavLink to="/sign-up" className="header__btn header__btn_sign-up">
            Sign Up
          </NavLink>
        </div>
      )}
      {isAuth && (
        <div className="header__buttons">
          <NavLink
            to="/new-article"
            className="header__btn header__btn_create-article"
          >
            Create article
          </NavLink>
          <NavLink to="/edit" className="header__btn header__btn_edit-profile">
            <div className="header__user-info">
              <h6 className="header__profile-name">{username}</h6>
              <img
                className="edit-profile_img"
                src={
                  image
                    ? image
                    : 'https://static.productionready.io/images/smiley-cyrus.jpg'
                }
                alt="ProfileImage"
              ></img>
            </div>
          </NavLink>
          <NavLink
            to="/"
            className="header__btn header__btn_log-out"
            onClick={() => {
              dispatch(unsetUser())
              localStorage.clear()
            }}
          >
            Log Out
          </NavLink>
        </div>
      )}
    </header>
  )
}

export default Header
