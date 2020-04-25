import React, { useEffect } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import { Card, Typography, Grid, CircularProgress, Button, CardActions, CardContent, IconButton, CssBaseline, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core"
import { RootState } from "../../../state/store"
import { useDispatch, useSelector } from "react-redux"
import { getNotes, deleteNote } from "../../../state/notes/notesActions"
import Moment from 'react-moment';
import { getPet } from "../../../state/pets/petsActions"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { getExaminationsByPetId, deleteExamination } from "../../../state/examinations/examinationsActions"
import { getExaminationTypesByPetId } from "../../../state/examinationTypes/examinationTypesActions"
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';

interface PetExaminationsPageParams {
    petId: string;
}

export const PetExaminationsPage = (props: RouteComponentProps<PetExaminationsPageParams>) => {
    const dispatch = useDispatch()
    const examinationsState = useSelector((state: RootState) => state.examinations)
    const examinationTypesState = useSelector((state: RootState) => state.examinationTypes)
    const petId = props.match.params.petId

    useEffect(() => {
        dispatch(getExaminationsByPetId(petId))
    }, [])

    useEffect(() => {
        dispatch(getExaminationTypesByPetId(petId))
    }, [])

    return (
        examinationsState.loading || examinationTypesState.loading ?
            <div>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="column"
                    style={{ alignSelf: 'center', paddingTop: 100 }}>
                    <CircularProgress />
                </Grid>

            </div>
            :
            <div>
                <Typography variant="h2" className="title">
                    Badania
                </Typography>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center" >
                    <Grid
                        item xs={6}>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Nazwa badania</TableCell>
                                        <TableCell align="center">Data</TableCell>
                                        <TableCell align="center">Szczegóły</TableCell>
                                        <TableCell align="center">Usuń</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {examinationsState.items.map((examination) =>
                                        <TableRow key={examination.id}>
                                            <TableCell component="th" scope="row" align="center">
                                                {examinationTypesState.items.filter(x => x.id == examination.examinationTypeId)[0].name}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Moment format=" DD.MM.YYYY HH:mm">
                                                    {examination.date}
                                                </Moment></TableCell>
                                            <TableCell align="center">
                                                <Link to={`/pets/${petId}/examinations/${examination.id}`}>
                                                    <FormatAlignJustifyIcon />
                                                </Link>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton aria-label="delete" onClick={() => { dispatch(deleteExamination(examination.id as string, petId)) }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid
                        item xs={3}
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="flex-start">
                        <Card className="formCard">
                            <Typography color="textSecondary" gutterBottom>
                                Badania
                                </Typography>
                            <Link to={`/pets/${petId}/examinations/add`}>Dodaj nowe badanie</Link>
                        </Card>
                    </Grid>
                </Grid>
            </div >
    )
}