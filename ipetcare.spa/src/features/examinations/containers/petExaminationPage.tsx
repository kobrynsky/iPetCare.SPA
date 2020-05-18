import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  Card,
  Typography,
  Grid,
  CircularProgress,
  CardContent,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Box,
} from '@material-ui/core'
import { RootState } from '../../../state/store'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import { getExamination } from '../../../state/examinations/examinationsActions'

interface PetExaminationPageParams {
  petId: string
  examinationId: string
}

const useStyles = makeStyles({
  badParameterValue: {
    color: 'red',
    fontWeight: 'bold',
  },
  goodParameterValue: {
    color: 'green',
    fontWeight: 'bold',
  },
  infoCard: {
    marginBottom: 20,
  },
})

export const PetExaminationPage = (
  props: RouteComponentProps<PetExaminationPageParams>
) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const examinationsState = useSelector(
    (state: RootState) => state.examinations
  )
  const examination = useSelector(
    (state: RootState) => state.examinations.itemDetails
  )

  const examinationId = props.match.params.examinationId

  useEffect(() => {
    dispatch(getExamination(examinationId))
  }, [])

  return examinationsState.loading ? (
    <div>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={{ alignSelf: 'center', paddingTop: 100 }}
      >
        <CircularProgress />
      </Grid>
    </div>
  ) : (
    <div>
      <Box marginY={2}>
        <Typography variant="h2" className="title">
          Szczegóły badania
        </Typography>
      </Box>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={10} md={3}></Grid>
        <Grid
          item
          xs={10}
          md={3}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Card variant="outlined" className={classes.infoCard}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                <Moment format="DD.MM.YYYY HH:mm ">{examination?.date}</Moment>
              </Typography>
              <Typography variant="h5" component="h2">
                {examination?.examinationType.name}
              </Typography>
              <Typography variant="h6" component="h2">
                {examination?.pet.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {examination?.content}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} xs={10}></Grid>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
          item
          md={6}
          xs={10}
        >
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Nazwa parametru</TableCell>
                  <TableCell align="center">Wynik</TableCell>
                  <TableCell align="center">Zakres referencyjny</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {examination?.examinationParameterValues.map(param => (
                  <TableRow key={param.id}>
                    <TableCell component="th" scope="row" align="center">
                      {param.examinationParameter.name}
                    </TableCell>
                    <TableCell align="center">
                      {param.value >= param.examinationParameter.lowerLimit &&
                      param.value <= param.examinationParameter.upperLimit ? (
                        <div className={classes.goodParameterValue}>
                          {param.value}
                        </div>
                      ) : (
                        <div className={classes.badParameterValue}>
                          {param.value}
                        </div>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {param.examinationParameter.lowerLimit}-
                      {param.examinationParameter.upperLimit}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}
