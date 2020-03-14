import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import axios from 'axios'
import { BASE_URL } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { UserState } from '../state/userReducer'
import { StoreState } from '../store'
import { setUser } from '../state/userActions'

export function RegisterScreen() {
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
    <Form onSubmit={onSumbit}>
      <Form.Input
        label="Imię"
        placeholder="Jan"
        onChange={e => setFirstName(e.target.value)}
      />
      <Form.Input
        label="Nazwisko"
        placeholder="Kowalski"
        onChange={e => setLastName(e.target.value)}
      />
      <Form.Input
        label="Nazwa użytkownika"
        onChange={e => setUserName(e.target.value)}
      />
      <Form.Input label="Email" onChange={e => setEmail(e.target.value)} />
      <Form.Input label="Hasło" onChange={e => setPassword(e.target.value)} />
      <Form.Input
        label="Powtórz hasło"
        onChange={e => setPasswordRepeated(e.target.value)}
      />
      <Form.Input label="Rola" onChange={e => setRole(e.target.value)} />
      <Button>Zarejestruj</Button>
    </Form>
  )
}
