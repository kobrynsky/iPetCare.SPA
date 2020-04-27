import React from 'react'
import {
  Card,
  makeStyles,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  ButtonGroup,
} from '@material-ui/core'
import { Institution } from '../../../api/dto'

interface Props {
  firstName: string
  lastName: string
  specialization?: string
  email: string
  placeOfResidence?: string
  institutions?: Institution[]
  imageUrl: string
  title?: string
}

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: 10,
    height: 450,
  },
  content: {
    height: 220,
    scrollBehavior: 'auto',
    overflow: 'scroll',
    overflowX: 'hidden',
    msOverflowStyle: 'none',
    scrollbarColor: 'transparent',
  },
})

export const UserResult = ({
  email,
  firstName,
  imageUrl,
  lastName,
  placeOfResidence,
  institutions,
  specialization,
  title = '',
}: Props) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      {/* <CardActionArea> */}
      <CardMedia
        component="img"
        alt="Zdjęcie profilowe"
        height="180"
        image={imageUrl}
      />
      <CardContent className={'hideScroll ' + classes.content}>
        <Typography variant="h5" component="h2">
          {`${title} ${firstName} ${lastName}`}
        </Typography>
        {specialization && (
          <Typography variant="subtitle1" color="textSecondary">
            Specjalizacja: {specialization}
          </Typography>
        )}
        {placeOfResidence && (
          <Typography variant="body1">{placeOfResidence}</Typography>
        )}
        {institutions &&
          institutions.map(i => (
            <>
              <Typography variant="body1">{i.name}</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {i.address}
              </Typography>
            </>
          ))}
        {institutions &&
          institutions.map(i => (
            <>
              <Typography variant="body1">{i.name}</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {i.address}
              </Typography>
            </>
          ))}
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions>
        <Button size="small" color="primary">
          Szczegóły
        </Button>
        <Button size="small" color="primary">
          Dodaj
        </Button>
      </CardActions>
    </Card>
  )
}
