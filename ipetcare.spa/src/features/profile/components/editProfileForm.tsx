import React, { useState } from 'react'
import { Card, TextField, Button, Grid } from '@material-ui/core'
import { User } from '../../../state/user/userReducer'
import { TableInstitutions } from './myInstitutionsTable'
import { VET, BASE_URL_IMG, DEFAULT_USER_IMG } from '../../../utils/constants'
// import '../../auth/auth.css'

interface Props {
  user: User
  onSubmit: (user: User, file: any) => any
  disabled: boolean
}

export const EditProfileForm = ({ user, onSubmit, disabled }: Props) => {
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [placeOfResidence, setPlaceOfResidence] = useState(
    user.placeOfResidence
  )
  const [specialization, setSpecialization] = useState(user?.specialization)
  // const [institution, setInstitution] = useState(user?.institution)
  const [userName, setUserName] = useState(user.userName)
  const [role, setRole] = useState(user.role)
  const [imageUrl, setImageUrl] = useState(user.imageUrl)
  const [file, setFile] = useState<any>()


  return (
    <Card className="formCard">
      <form
        onSubmit={e => {
          e.preventDefault()
          onSubmit(
            {
              firstName,
              lastName,
              email,
              placeOfResidence,
              imageUrl,
              role,
              userName,
              specialization,
            },
            file
          )
        }}
      >
        <div className="authForm">
          <h2>Profil</h2>
          <TextField
            required
            margin="normal"
            // variant="outlined"
            label="Imię"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />

          <TextField
            required
            margin="normal"
            // variant="outlined"
            label="Nazwisko"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />

          <TextField
            required
            margin="normal"
            // variant="outlined"
            label="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <img
            style={{ height: '100%', width: '100%' }}
            src={imageUrl ? `${BASE_URL_IMG + imageUrl}` : DEFAULT_USER_IMG}
          />
          <input
            id="file"
            name="file"
            type="file"
            onChange={(event: any) => {
              setFile(event.currentTarget.files[0])
            }}
          />

          <TextField
            margin="normal"
            // variant="outlined"
            label="Miejsce zamieszkania"
            value={placeOfResidence}
            onChange={e => setPlaceOfResidence(e.target.value)}
          />

          {user.role === VET && (
            <TextField
              required
              margin="normal"
              // variant="outlined"
              label="Specjalizacja"
              value={specialization}
              onChange={e => setSpecialization(e.target.value)}
            />
          )}

          {user.role === VET && (
            <div>
            <Grid item>
              <TableInstitutions user={user}/>
            </Grid>
        </div>
          )}

          <TextField
            required
            margin="normal"
            // variant="outlined"
            label="Nazwa użytkownika"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />

          <Button type="submit" disabled={disabled}>
            Zapisz
          </Button>
        </div>
      </form>
    </Card>
  )
}
