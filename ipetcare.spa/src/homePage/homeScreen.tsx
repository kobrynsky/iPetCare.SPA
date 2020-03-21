import React from 'react'
import './home.css'
import { Grid } from '@material-ui/core'
import { ContentCard } from './components/contentCard'
import { Link, NavLink } from 'react-router-dom'

export function HomeScreen() {
  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <NavLink className="title" to="/">
            <h1>iPetCare</h1>
          </NavLink>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={3}>
            <Grid container alignItems="center" direction="column">
              <Link className="sideNav" to="/">
                Główna
              </Link>
              <Link className="sideNav" to="/">
                Co to jest?
              </Link>
              <Link className="sideNav" to="/">
                O nas
              </Link>
              <Link className="sideNav" to="/">
                Kontakt
              </Link>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container direction="column">
              <Grid item>
                <ContentCard
                  title="Co to jest?"
                  content="orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                />
              </Grid>
              <Grid item>
                <ContentCard
                  title="O nas"
                  content="orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                />
              </Grid>
              <Grid item>
                <ContentCard
                  title="Kontakt"
                  content="asdasdasd asd asd asd asd asd asd asd"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={3} />
        </Grid>
      </Grid>
    </div>
  )
}
