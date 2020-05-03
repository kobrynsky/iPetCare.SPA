import React from 'react'
import { EditProfileForm } from '../components/editProfileForm'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../state/store'
import { editUser, logout } from '../../../state/user/userActions'
import { useHistory } from 'react-router-dom'
import { User } from '../../../state/user/userReducer'

export const EditProfilePage = () => {
  const userState = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <EditProfileForm
      disabled={userState.loading}
      onSubmit={async (user: User, file: any) => {
        if (
          user.email !== userState.user.email ||
          user.userName !== userState.user.userName
        ) {
          await dispatch(editUser(user, file))
          await dispatch(logout())
          history.push('/')
        } else await dispatch(editUser(user, file))
      }}
      user={userState.user}
    />
  )
}
