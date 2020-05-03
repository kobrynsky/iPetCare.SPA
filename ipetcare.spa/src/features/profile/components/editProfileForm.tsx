import React, { useState, useEffect } from 'react'
import { Card, TextField, Button, Grid } from '@material-ui/core'
import { User } from '../../../state/user/userReducer'
import { VET } from '../../../utils/constants'
import { TableCommon } from '../../../common/components/tableCommon'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
// import '../../auth/auth.css'
import { getInstitutions, getInstitutionsPerVet, singUpInstitution, singOutInstitution } from '../../../state/institutions/institutionsActions'

interface Props {
  user: User
  onSubmit: (user: User) => any
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
  const dispatch = useDispatch()
  const institutionsState = useSelector((state: RootState) => state.institutions)
  const myInstitutionsState = useSelector((state: RootState) => state.myInstitutions)

  useEffect(() => {
    dispatch(getInstitutionsPerVet(user.id as string))
    dispatch(getInstitutions())
  }, [])

  return (
    <Card className="formCard">
      <form
        onSubmit={e => {
          e.preventDefault()
          onSubmit({
            firstName,
            lastName,
            email,
            placeOfResidence,
            imageUrl,
            role,
            userName,
            specialization,
          })
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

          <TextField
            required
            margin="normal"
            // variant="outlined"
            label="Zdjęcie"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
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
              <TableCommon
                  title="Moje Instytucje"
                  isLoading={myInstitutionsState.loading}
                  columns={[
                    {
                      title: 'Nazwa',
                      field: 'Id',
                      lookup: institutionsState.items.reduce(
                        (a, x) => ({ ...a, [x.id as string]: x.name }),
                        {}
                      ),
                    },
                    { title: 'Adres', field: 'address' }
                  ]}

                  rows={myInstitutionsState.items}
                  onDelete={async data => {
                        console.log(data)
                        dispatch(singOutInstitution(data.id))
                  }}
                  onAdd={async data => {
                      dispatch(
                        singUpInstitution(data.Id)
                      )
                  }}
                />
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
