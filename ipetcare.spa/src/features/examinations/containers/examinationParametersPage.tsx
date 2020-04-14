import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { TableCommon } from '../../../common/components/tableCommon'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { getExaminationTypes } from '../../../state/examinationTypes/examinationTypesActions'
import { deleteExaminationParameter, createExaminationParameter, updateExaminationParameter, getExaminationParameters } from '../../../state/examinationParameters/examinationParametersActions'

export function ExaminationParametersPage() {
    const dispatch = useDispatch()
    const examinationParametersState = useSelector((state: RootState) => state.examinationParameters)
    const examinationTypesState = useSelector((state: RootState) => state.examinationTypes)

    useEffect(() => {
        dispatch(getExaminationParameters())
    }, [])

    useEffect(() => {
        dispatch(getExaminationTypes())
    }, [])

    return (
        <div>
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="h1" className="title">
                        Parametry badań
          </Typography>
                </Grid>
                <Grid item>
                    <TableCommon
                        title="Parametry badań"
                        isLoading={examinationParametersState.loading}
                        columns={[
                            { title: 'Nazwa', field: 'name' },
                            { title: 'Górna granica', field: 'upperLimit' },
                            { title: 'Dolna granica', field: 'lowerLimit' },
                            {
                                title: 'Typ badania',
                                field: 'examinationTypeId',
                                lookup: examinationTypesState.items.reduce((a, x) => ({ ...a, [x.id as number]: x.name }), {})
                            },
                        ]}
                        rows={examinationParametersState.items}
                        onDelete={async data => {
                            dispatch(deleteExaminationParameter(data.id))
                        }}
                        onAdd={async data => {
                            dispatch(
                                createExaminationParameter({
                                    name: data.name,
                                    upperLimit: parseInt(data.upperLimit),
                                    lowerLimit: parseInt(data.lowerLimit),
                                    examinationTypeId: parseInt(data.examinationTypeId)
                                })
                            )
                        }}
                        onEdit={async data => {
                            dispatch(
                                updateExaminationParameter({
                                    id: data.id,
                                    name: data.name,
                                    upperLimit: parseInt(data.upperLimit),
                                    lowerLimit: parseInt(data.lowerLimit),
                                    examinationTypeId: parseInt(data.examinationTypeId)
                                })
                            )
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    )
}