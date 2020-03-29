import React from 'react'
import { ButtonGroup, Button, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router'

const useStyles = makeStyles({
  container: {
    margin: 5,
  },
})

export const NotLoggedNavbar = () => {
  const history = useHistory()
  const styles = useStyles()

  return (
    <ButtonGroup
      className={styles.container}
      variant="contained"
      color="default"
    >
      <Button
        disableTouchRipple
        onClick={() => {
          history.push('/register')
        }}
      >
        Rejestracja
      </Button>
      <Button
        disableTouchRipple
        onClick={() => {
          history.push('/login')
        }}
      >
        Logowanie
      </Button>
    </ButtonGroup>
  )
}
