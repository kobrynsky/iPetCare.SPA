import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { TableCommon } from '../../../common/components/tableCommon'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { getAllUsers } from '../../../state/user/userActions'

export function UsersPage() {
  const dispatch = useDispatch()
  const userState = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h2" className="title">
            Użytkownicy
          </Typography>
        </Grid>
        <Grid item>
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
          />
        </Grid>
      </Grid>
    </div>
  )
}
