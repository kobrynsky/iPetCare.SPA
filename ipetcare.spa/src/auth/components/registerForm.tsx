import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import axios from 'axios'
import { BASE_URL } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { UserState } from '../../state/userReducer'
import { StoreState } from '../../store'
import { setUser } from '../../state/userActions'
import '../auth.css'

export function RegisterForm() {
  const dispatch = useDispatch()
  const user: UserState = useSelector((state: StoreState) => state.user)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeated, setPasswordRepeated] = useState('')
  const [role, setRole] = useState('')

  const onSumbit = async () => {
    const response = await axios.post(BASE_URL + '/users/register', {
      firstName,
      lastName,
      userName,
      email,
      password,
      role,
    })

    console.log(response)

    dispatch(setUser(response.data))
  }

  return (
    <Form onSubmit={onSumbit} size="tiny">
      <div className="authForm">
        <h1>Rejestracja</h1>
        <Form.Input
          required
          label="Imię"
          placeholder="Jan"
          onChange={e => setFirstName(e.target.value)}
        />
        <Form.Input
          required
          label="Nazwisko"
          placeholder="Kowalski"
          onChange={e => setLastName(e.target.value)}
        />
        <Form.Input
          required
          label="Nazwa użytkownika"
          onChange={e => setUserName(e.target.value)}
        />
        <Form.Input
          required
          label="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <Form.Input
          required
          type="password"
          label="Hasło"
          onChange={e => setPassword(e.target.value)}
        />
        <Form.Input
          required
          type="password"
          error={password !== passwordRepeated}
          label="Powtórz hasło"
          onChange={e => setPasswordRepeated(e.target.value)}
        />
        <Form.Field required>
          <Form.Radio
            label="Opiekun"
            value="Owner"
            name="roleRadio"
            checked={role === 'Owner'}
            onChange={(e, { value }) => {
              if (typeof value === 'string') setRole(value)
            }}
          />
          <Form.Radio
            label="Weterynarz"
            value="Vet"
            name="roleRadio"
            checked={role === 'Vet'}
            onChange={(e, { value }) => {
              if (typeof value === 'string') setRole(value)
            }}
          />
        </Form.Field>
        <Button fluid>Zarejestruj</Button>
      </div>
    </Form>
  )
}
