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

interface Props {
  firstName: string
  lastName: string
  specialization?: string
  email: string
  placeOfResidence: string
  imageUrl: string
  title: string
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 10,
  },
})

export const UserResult = ({
  email,
  firstName,
  imageUrl,
  lastName,
  placeOfResidence,
  specialization,
  title,
}: Props) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Zdjęcie profilowe"
          height="180"
          image={imageUrl}
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {`${title} ${firstName} ${lastName}`}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {specialization}
          </Typography>
          <Typography variant="body1">{placeOfResidence}</Typography>
        </CardContent>
      </CardActionArea>
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
