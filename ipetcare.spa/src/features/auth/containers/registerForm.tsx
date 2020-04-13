import React, { useState, useEffect } from 'react'
import { OWNER, VET } from '../../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../../state/user/userActions'
import '../auth.css'
import {
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Button,
  TextField,
  FormHelperText,
  Card,
  CircularProgress,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { RootState } from '../../../state/store'

export function RegisterForm() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeated, setPasswordRepeated] = useState('')
  const [role, setRole] = useState('' as 'Owner' | 'Vet')
  const [error, setError] = useState('')
  const userState = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (userState.error) {
      setError(userState.error)
    }
  }, [userState.error, error])

  useEffect(() => {
    if (userState.user.token) history.push('/login')
  }, [userState.user])

  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      registerUser({
        firstName,
        lastName,
        userName,
        email,
        password,
        role,
      })
    )
  }

  return (
    <Card className="formCard">
      <form onSubmit={onSumbit}>
        <div className="authForm">
          <h2>Rejestracja</h2>

          <TextField
            required
            margin="normal"
            variant="outlined"
            label="Imię"
            onChange={e => setFirstName(e.target.value)}
          />

          <TextField
            required
            margin="normal"
            variant="outlined"
            label="Nazwisko"
            onChange={e => setLastName(e.target.value)}
          />

          <TextField
            required
            margin="normal"
            variant="outlined"
            label="Nazwa użytkownika"
            onChange={e => setUserName(e.target.value)}
          />

          <TextField
            required
            margin="normal"
            variant="outlined"
            label="Email"
            onChange={e => setEmail(e.target.value)}
          />

          <TextField
            required
            margin="normal"
            variant="outlined"
            label="Hasło"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            required
            margin="normal"
            variant="outlined"
            label="Powtórz hasło"
            type="password"
            error={password !== passwordRepeated}
            onChange={e => setPasswordRepeated(e.target.value)}
          />

          <FormControl required margin="normal">
            <FormLabel>Rola</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                label="Opiekun"
                value={OWNER}
                control={
                  <Radio
                    color="primary"
                    checked={role === OWNER}
                    onChange={e => {
                      setRole(e.target.value as 'Owner' | 'Vet')
                    }}
                  />
                }
              />
              <FormControlLabel
                label="Weterynarz"
                value={VET}
                control={
                  <Radio
                    color="primary"
                    checked={role === VET}
                    onChange={e => {
                      setRole(e.target.value as 'Owner' | 'Vet')
                    }}
                  />
                }
              />
            </RadioGroup>
          </FormControl>
          <FormHelperText error={!!error}>{error}</FormHelperText>
          {userState.loading ? (
            <CircularProgress style={{ alignSelf: 'center' }} />
          ) : (
            <Button disabled={password !== passwordRepeated} type="submit">
              Zarejestruj
            </Button>
          )}
        </div>
      </form>
    </Card>
  )
}
