import React from 'react'
import '../../index.css'
import './error.css'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

export const ForbiddenPage = () => {
  const history = useHistory()

  return (
    <div className="container">
      <h3 className="title">403 Forbidden</h3>
      <h6 className="title">Nie masz odpowiednich uprawanień</h6>
      <Button
        variant="contained"
        onClick={() => {
          history.goBack()
        }}
      >
        Powrót
      </Button>
    </div>
  )
}
