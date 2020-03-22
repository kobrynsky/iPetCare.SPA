import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography } from '@material-ui/core'

interface Props {
  title: string
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

export const ContentCard: React.FC<Props> = ({ title, children }) => {
  const styles = useStyles()

  return (
    <Card className={styles.container}>
      <Typography className={styles.title} color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
