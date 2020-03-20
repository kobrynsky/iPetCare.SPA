import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography } from '@material-ui/core'

interface Props {
  title: string
  content: string
}

const useStyles = makeStyles({
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  container: {
    margin: 15,
  },
})

export function ContentCard(props: Props) {
  const styles = useStyles()

  return (
    <Card className={styles.container}>
      <Typography className={styles.title} color="textSecondary" gutterBottom>
        Word of the Day
      </Typography>
      <CardContent>{props.content}</CardContent>
    </Card>
  )
}
