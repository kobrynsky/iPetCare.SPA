import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { TableCommon } from '../../../common/components/tableCommon'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { getAllUsers, deleteUser } from '../../../state/user/userActions'

export function UsersPage() {
  const dispatch = useDispatch()
  const userState = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    // <div>
    <Grid container direction="column" xs={12}>
      <Grid item xs={12}>
        <Typography variant="h2" className="title">
          Użytkownicy
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TableCommon
          title="Użytkownicy"
          isLoading={userState.loading}
          columns={[
            { title: 'Nazwa użytkownika', field: 'userName' },
            { title: 'Imie', field: 'firstName' },
            { title: 'Nazwisko', field: 'lastName' },
            { title: 'E-mail', field: 'email' },
            { title: 'Rola', field: 'role' },
          ]}
          rows={userState.items}
          onDelete={async data => {
            dispatch(deleteUser(data.id))
          }}
        />
      </Grid>
    </Grid>
    // </div>
  )
}
