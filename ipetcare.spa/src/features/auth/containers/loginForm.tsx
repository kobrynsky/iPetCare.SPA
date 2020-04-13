import React, { useState, useEffect } from 'react'
import { Button, TextField, Card, CircularProgress } from '@material-ui/core'
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

  useEffect(() => {
    if (userState.error) {
      setError(true)
    }
  }, [userState.error, error])

  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)
    dispatch(loginUser({ email: login, password }))
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
          {!userState.loading ? (
            <CircularProgress style={{ alignSelf: 'center' }} />
          ) : (
            <Button type="submit">Zaloguj</Button>
          )}
        </div>
      </form>
    </Card>
  )
}
