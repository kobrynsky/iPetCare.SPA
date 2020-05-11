import React from 'react'
import '../home.css'
import { Grid, Typography } from '@material-ui/core'
import { ContentCard } from '../../../common/components/contentCard'
import { NavLink } from 'react-router-dom'
import { RootState } from '../../../state/store'
import { useSelector } from 'react-redux'
import PetsIcon from '@material-ui/icons/Pets'

export function AdminScreen() {
  const user = useSelector((state: RootState) => state.user.user)

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <NavLink className="title" to="/admin">
            <Typography variant="h2" className="title peru">
              <PetsIcon fontSize="large" />
              iPetCare
            </Typography>
          </NavLink>
        </Grid>
        <Grid container direction="row">
          <Grid item md={3}></Grid>

          <Grid item md={6} xs={12}>
            <Grid className="home-cards" container direction="column">
              <Grid item>
                <ContentCard title={`Witaj ${user.firstName}`}>
                  Właśnie zalogowałeś się do panelu administratora systemu
                  iPetCare. Jako administrator możesz przeglądać listę
                  użytkowników oraz zwierząt, dodawać i modyfikować rasy oraz
                  gatunki, jak również tworzyć nowe typy badań wraz z ich
                  parametrami oraz dodawać instytucje.
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
