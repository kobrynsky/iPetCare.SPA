import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { TableCommon } from '../../../common/components/tableCommon'
import { createInstitution, deleteInstitution, updateInstitution } from '../../../state/institutions/institutionsActions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { getExaminationTypes, deleteExaminationType, createExaminationType, updateExaminationType } from '../../../state/examinationTypes/examinationTypesActions'
import { getAllSpecies } from '../../../state/species/speciesActions'

export function ExaminationTypesPage() {
    const dispatch = useDispatch()
    const examinationTypesState = useSelector((state: RootState) => state.examinationTypes)
    const speciesState = useSelector((state: RootState) => state.species)

    useEffect(() => {
        dispatch(getExaminationTypes())
    }, [])

    useEffect(() => {
        dispatch(getAllSpecies())
    }, [])

    return (
        <div>
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="h1" className="title">
                        Typy badań
          </Typography>
                </Grid>
                <Grid item>
                    <TableCommon
                        title="Type badań"
                        isLoading={examinationTypesState.loading}
                        columns={[
                            { title: 'Nazwa', field: 'name' },
                            {
                                title: 'Gatunek',
                                field: 'speciesId',
                                lookup: speciesState.items.reduce((a, x) => ({ ...a, [x.id as number]: x.name }), {})
                            },
                        ]}
                        rows={examinationTypesState.items}
                        onDelete={async data => {
                            dispatch(deleteExaminationType(data.id))
                        }}
                        onAdd={async data => {
                            dispatch(
                                createExaminationType({
                                    name: data.name,
                                    speciesId: parseInt(data.speciesId)
                                })
                            )
                        }}
                        onEdit={async data => {
                            dispatch(
                                updateExaminationType({
                                    id: data.id,
                                    name: data.name,
                                    speciesId: parseInt(data.speciesId)
                                })
                            )
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    )
}