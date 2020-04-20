import React, { useEffect, useState } from "react"
import { RouteComponentProps, useHistory } from "react-router-dom"
import { Card, CircularProgress, Button, MenuItem, Select, Grid, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core"
import { RootState } from "../../../state/store"
import { useDispatch, useSelector } from "react-redux"
import { getExaminationTypesByPetId } from "../../../state/examinationTypes/examinationTypesActions"
import { getExaminationParameters } from "../../../state/examinationParameters/examinationParametersActions"
import { createExamination } from "../../../state/examinations/examinationsActions"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { v4 as uuid } from 'uuid';
import { createExaminationParameterValue } from "../../../state/examinationValues/examinationValuesActions"

interface AddExaminationPageParams {
    petId: string;
}

export const AddExaminationPage = (props: RouteComponentProps<AddExaminationPageParams>) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const examinationTypesState = useSelector((state: RootState) => state.examinationTypes)
    const examinationParametersState = useSelector((state: RootState) => state.examinationParameters)

    const [examinationTypeId, setExaminationTypeId] = useState(0);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const petId = props.match.params.petId

    useEffect(() => {
        dispatch(getExaminationTypesByPetId(petId))
        dispatch(getExaminationParameters())
    }, [])

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setExaminationTypeId(event.target.value as number);
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const examinationId: string = uuid();
        await dispatch(createExamination({ petId: petId, examinationTypeId: examinationTypeId, id: examinationId, date: selectedDate as Date }))

        let paramsValues = document.getElementsByClassName('parameter-value');

        for (let i = 0; i < examinationTypesState.items.length; i++) {
            let parameterValue = {
                examinationId: examinationId,
                value: +paramsValues[i].innerHTML,
                examinationParameterId: examinationTypesState.items[i].id as number
            }
            await dispatch(createExaminationParameterValue(parameterValue))
        }
        history.push(`/pets/${petId}/examinations`)
    }

    return (
        examinationTypesState.loading ?
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
                <form onSubmit={onSumbit}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        direction="column"
                        style={{ alignSelf: 'center', paddingTop: 20 }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={examinationTypeId}
                            onChange={handleChange}
                            label="Typ badania"
                        >
                            {examinationTypesState.items.map((type) =>
                                <MenuItem value={type.id}>{type.name}</MenuItem>
                            )
                            }
                        </Select>
                        <Card className="formCard">
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Parametry badania</TableCell>
                                            <TableCell align="center">Wyniki badań</TableCell>
                                            <TableCell align="center">Zakres referencyjny</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {examinationParametersState.items
                                            .filter(parameter => parameter.examinationTypeId == examinationTypeId)
                                            .map(parameter => (
                                                <TableRow key={parameter.id}>
                                                    <TableCell component="th" scope="row" align="center">
                                                        {parameter.name}
                                                    </TableCell>
                                                    <TableCell contentEditable={true} align="center" className="parameter-value"></TableCell>
                                                    <TableCell align="center">{parameter.lowerLimit}-{parameter.upperLimit}</TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd.MM.yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Data badania"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Card >
                        {examinationParametersState.loading ?
                            (
                                <CircularProgress style={{ alignSelf: 'center' }} />
                            )
                            :
                            (
                                <Button variant="contained" type="submit">Dodaj badanie</Button>
                            )}
                    </Grid>
                </form >
            </div >
    )
}