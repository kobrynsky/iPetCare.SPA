import React from 'react'
import { EditProfileForm } from '../components/editProfileForm'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../state/store'
import { editUser, logout } from '../../../state/user/userActions'
import { useHistory } from 'react-router-dom'

export const EditProfilePage = () => {
  const userState = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <EditProfileForm
      disabled={userState.loading}
      onSubmit={async user => {
        if (
          user.email !== userState.user.email ||
          user.userName !== userState.user.userName
        ) {
          await dispatch(editUser(user))
          await dispatch(logout())
          history.push('/')
        } else await dispatch(editUser(user))
      }}
      user={userState.user}
    />
  )
}
