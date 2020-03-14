import React, { useState } from 'react'

export function LoginScreen() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <div className="ui labeled input">
        <div className="ui label label">login</div>
        <input
          type="text"
          onChange={e => setLogin(e.target.value)}
          placeholder="twój login"
        />
      </div>
      <div className="ui labeled input">
        <div className="ui label label">hasło</div>
        <input
          type="text"
          onChange={e => setPassword(e.target.value)}
          placeholder="twoje hasło"
        />
      </div>
    </div>
  )
}
