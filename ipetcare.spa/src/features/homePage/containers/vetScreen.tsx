import React from 'react'
import '../home.css'
import { Grid, Typography } from '@material-ui/core'
import { ContentCard } from '../../../common/components/contentCard'
import { NavLink } from 'react-router-dom'
import { RootState } from '../../../state/store'
import { useSelector } from 'react-redux'

export function VetScreen() {
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
                  Właśnie zalogowałeś się do panelu weterynarza w systemie iPetCare. 
                  Sprawdź co zmieniło się od ostatniego logowania. Przeglądaj listę 
                  podopiecznych, sprawdź nowe aktulaności u każdego z nich. Podczas 
                  wizyt weterynaryjnych dodawaj wyniki badań oraz dokumentuj historię 
                  choroby i przebieg wizyt zwierząt, a także planuj przyszłe badania 
                  i wizyty.
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
