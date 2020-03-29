import React, { useState } from 'react'
import { Button, TextField, Card } from '@material-ui/core'
import axios from 'axios'
import { BASE_URL } from '../../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { UserState } from '../../../state/user/userReducer'
import { RootState } from '../../../state/store'
import { setUser } from '../../../state/user/userActions'
import { saveUserState } from '../../../utils/localStorageHelper'
import '../auth.css'
import { useHistory } from 'react-router-dom'
import { setTokenInHeader } from '../../../utils/api'
import { Users } from '../../../api'

export function LoginForm() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const history = useHistory()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)
    try {
      const response = await Users.login({ email: login, password })

      dispatch(setUser(response))
      saveUserState(response)
      setTokenInHeader(response.token)
      switch (response.role.toLowerCase()) {
        case 'owner':
          history.push('/owner')
          break
        case 'admin':
          history.push('/admin')
          break
        case 'vet':
          history.push('/vet')
          break
      }
    } catch (error) {
      if (error.response.status == 401) {
        setError(true)
      }
    }
  }

  return (
    <Card className="formCard">
      <form onSubmit={onSumbit}>
        <div className="authForm">
          <h2>Logowanie</h2>
          <TextField
            required
            margin="normal"
            variant="outlined"
            label="Email"
            error={error}
            onChange={e => setLogin(e.target.value)}
          />

          <TextField
            required
            margin="normal"
            variant="outlined"
            type="password"
            label="Hasło"
            error={error}
            helperText={error ? 'Nieprawidłowy email lub hasło' : ''}
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit">Zaloguj</Button>
        </div>
      </form>
    </Card>
  )
}
