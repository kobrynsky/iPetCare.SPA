import React from 'react'
import { EditProfileForm } from '../components/editProfileForm'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../state/store'
import { editUser } from '../../../state/user/userActions'

export const EditProfilePage = () => {
  const userState = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  return (
    <EditProfileForm
      disabled={userState.loading}
      onSubmit={user => dispatch(editUser(user))}
      user={userState.user}
    />
  )
}
