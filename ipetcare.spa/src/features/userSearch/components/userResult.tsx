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
import { ADMIN, OWNER } from '../../../utils/constants'
import { Link } from 'react-router-dom'

interface Props {
  key: string
  userId: string
  firstName: string
  lastName: string
  specialization?: string
  email: string
  placeOfResidence?: string
  institutions?: Institution[]
  imageUrl: string
  title?: string
  currentSearchingUserRole: string
  isOwner: boolean
  role: string
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
  key,
  userId,
  email,
  firstName,
  imageUrl,
  lastName,
  placeOfResidence,
  institutions,
  specialization,
  title = '',
  currentSearchingUserRole,
  isOwner,
  role,
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
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions>
        {currentSearchingUserRole === ADMIN && (
          <Button size="small" color="primary">
            Usuń
          </Button>
        )}
        {role === OWNER && (
          <Button
            size="small"
            color="primary"
            component={Link}
            to={`/users/${userId}/pets`}
          >
            Zwierzaki
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
