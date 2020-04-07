import React, { useState, useEffect } from 'react'
import { Button, TextField, Card } from '@material-ui/core'
import { OWNER, ADMIN, VET } from '../../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { loginUser } from '../../../state/user/userActions'
import '../auth.css'
import { useHistory } from 'react-router-dom'

export function LoginForm() {
  const dispatch = useDispatch()
  const userState = useSelector((state: RootState) => state.user)
  const history = useHistory()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    switch (userState.user.role) {
      case OWNER:
        history.push('/owner')
        break
      case ADMIN:
        history.push('/admin')
        break
      case VET:
        history.push('/vet')
        break
    }
  }, [userState.user])

  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)
    try {
      dispatch(loginUser({ email: login, password }))
    } catch (error) {
      if (error.status == 401) {
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
          <Button type="submit" disabled={userState.loading}>
            Zaloguj
          </Button>
        </div>
      </form>
    </Card>
  )
}
