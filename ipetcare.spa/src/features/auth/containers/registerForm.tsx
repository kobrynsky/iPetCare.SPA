import React, { useState } from 'react'
// import { Form, Button, Input } from 'semantic-ui-react'
import axios from 'axios'
import { BASE_URL } from '../../../utils/constants'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../state/user/userActions'
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
} from '@material-ui/core'

export function RegisterForm() {
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeated, setPasswordRepeated] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')

  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post(BASE_URL + '/users/register', {
        firstName,
        lastName,
        userName,
        email,
        password,
        role,
      })

      dispatch(setUser(response.data))
    } catch (error) {
      setError(error.response.data)
    }
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
                value="Owner"
                control={
                  <Radio
                    color="primary"
                    checked={role === 'Owner'}
                    onChange={e => {
                      if (typeof e.target.value === 'string')
                        setRole(e.target.value)
                    }}
                  />
                }
              />
              <FormControlLabel
                label="Weterynarz"
                value="Vet"
                control={
                  <Radio
                    color="primary"
                    checked={role === 'Vet'}
                    onChange={e => {
                      if (typeof e.target.value === 'string')
                        setRole(e.target.value)
                    }}
                  />
                }
              />
            </RadioGroup>
          </FormControl>
          <FormHelperText error={!!error}>{error}</FormHelperText>
          <Button type="submit">Zarejestruj</Button>
        </div>
      </form>
    </Card>
  )
}
