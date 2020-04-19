import React from 'react'
import '../home.css'
import { Grid, Typography } from '@material-ui/core'
import { ContentCard } from '../../../common/components/contentCard'
import { NavLink } from 'react-router-dom'
import { RootState } from '../../../state/store'
import { useSelector } from 'react-redux'

export function AdminScreen() {
  const user = useSelector((state: RootState) => state.user.user)

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <NavLink className="title" to="/">
            <Typography variant="h1" className="title">
              iPetCare
            </Typography>
          </NavLink>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={3}></Grid>

          <Grid item xs={6}>
            <Grid container direction="column">
              <Grid item>
                <ContentCard title={`Witaj ${user.firstName}`}>
                  Właśnie zalogowałeś się do panelu administratora systemu iPetCare. 
                  Jako administrator możesz przeglądać listę użytkowników oraz zwierząt, dodawać i modyfikować 
                  rasy oraz gatunki, jak również tworzyć nowe typy badań wraz z ich parametrami oraz dodawać instytucje.
                </ContentCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={3} />
      </Grid>
    </div>
  )
}
