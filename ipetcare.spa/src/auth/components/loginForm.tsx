import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import axios from 'axios'
import { BASE_URL } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { UserState } from '../../state/userReducer'
import { StoreState } from '../../store'
import { setUser } from '../../state/userActions'
import '../auth.css'

export function LoginForm() {
  const dispatch = useDispatch()
  const user = useSelector((state: StoreState) => state.user)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const onSumbit = async () => {
    const response = await axios.post(BASE_URL + '/users/login', {
      email: login,
      password,
    })

    console.log(response)

    dispatch(setUser(response.data))
  }

  return (
    <Form size="tiny" onSubmit={onSumbit}>
      <div className="authForm">
        <h1>Logowanie</h1>
        <Form.Input
          required
          label="Email"
          onChange={e => setLogin(e.target.value)}
        />
        <Form.Input
          required
          type="password"
          label="Hasło"
          onChange={e => setPassword(e.target.value)}
        />
        <Button fluid>Zaloguj</Button>
      </div>
    </Form>
  )
}
