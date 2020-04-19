import React from 'react'
import '../home.css'
import { Grid, Typography } from '@material-ui/core'
import { ContentCard } from '../../../common/components/contentCard'
import { NavLink } from 'react-router-dom'
import { RootState } from '../../../state/store'
import { useSelector } from 'react-redux'

export function OwnerScreen() {
  const user = useSelector((state: RootState) => state.user.user)

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <NavLink className="title" to="/">
            <Typography variant="h2" className="title">
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
                  Właśnie zalogowałeś się do panelu właściciela w systemie iPetCare. 
                  Sprawdź co zmieniło się od ostatniego logowania. Przeglądaj i aktualizuj 
                  elektroniczną książeczkę zdrowia Twoich zwierząt. Dodawaj nowe informacje 
                  i wydarzenia w kalendarzu, a także sprawdź, czy nie zbliża się wizyta 
                  weterynaryjna lub nie jest konieczne wykonanie badania.
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
