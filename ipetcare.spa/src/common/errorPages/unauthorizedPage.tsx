import React from 'react'
import '../../index.css'
import './error.css'
import { Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

export const UnauthorizedPage = () => (
  <div className="container">
    <h3 className="title">401 Unauthorized</h3>
    <h6 className="title">Twoja sesja wygasła, zaloguj się ponownie</h6>
    <Button variant="contained">
      <NavLink to="login">Zaloguj</NavLink>
    </Button>
  </div>
)
