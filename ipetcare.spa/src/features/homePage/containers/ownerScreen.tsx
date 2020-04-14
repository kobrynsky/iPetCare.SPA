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
                  orem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
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
