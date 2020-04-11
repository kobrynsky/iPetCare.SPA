import React, { useState } from 'react'
import { UserResult } from '../components/userResult'
import { TextField, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  input: {
    maxWidth: 500,
    minWidth: 300,
    margin: 20,
  },
})

export const UserSearchPage = () => {
  // const [searchResults, setSearchResults] = useState()
  const styles = useStyles()

  return (
    <div className={styles.container}>
      <TextField
        className={styles.input}
        type="search"
        title="Wyszukaj"
        placeholder="Wyszukaj"
        inputMode="search"
      />

      <UserResult
        lastName="Borowski"
        firstName="Piotr"
        email="pb@gmail.com"
        imageUrl="https://www.wprost.pl/_thumb/5f/09/909272231d1fcb0bd2a3bcd3d8c3.jpeg"
        placeOfResidence="Wrocław jakas 2/1"
        specialization="stomatolog"
        title="lek"
      />
    </div>
  )
}
