import React from 'react'
import '../../index.css'
import './error.css'
import { Button, makeStyles, Card, Grid } from '@material-ui/core'
import { NavLink, Link } from 'react-router-dom'
import kitty from '../../assets/Cat-404.png'

export const NotFoundPage = () => (
  <Grid
    container
    direction="row"
    justify="center"
    alignItems="center"
  >
    <Card style={{ width: "60%", height: "70%", marginTop: "5rem", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
      <div className="container">
        <h3 className="title">404 Not Found</h3>
        <h4 className="title">Sorry, I cat find that page right meow.</h4 >
        <Button variant="outlined" component={Link} to="/" style={{ marginTop: "1rem" }}>Strona Główna</Button>
        <img src={kitty} alt="Logo" style={{ width: "50%", height: "50%", marginBottom: "2rem", marginTop: "2rem" }} />
      </div>
    </Card>
  </Grid>
)
