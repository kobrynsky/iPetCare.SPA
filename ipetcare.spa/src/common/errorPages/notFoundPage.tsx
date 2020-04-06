import React from 'react'
import '../../index.css'
import './error.css'
import { Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

export const NotFoundPage = () => (
  <div className="container">
    <h3 className="title">404 Not Found</h3>
    <Button variant="contained">
      <NavLink to="/">Strona Główna</NavLink>
    </Button>
  </div>
)
