import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { TableCommon } from '../../../common/components/tableCommon'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import {
  getExaminations,
  deleteExamination,
  createExamination,
  updateExamination,
} from '../../../state/examinations/examinationsActions'
import { getExaminationTypes } from '../../../state/examinationTypes/examinationTypesActions'
import { Link } from 'react-router-dom'

export function ExaminationsPage() {
  const dispatch = useDispatch()
  const examinationState = useSelector((state: RootState) => state.examinations)

  const examinationTypesState = useSelector(
    (state: RootState) => state.examinationTypes
  )

  useEffect(() => {
    dispatch(getExaminations())
    dispatch(getExaminationTypes())
  }, [])

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h1" className="title">
            Badania
          </Typography>
        </Grid>
        <Grid item>
          <TableCommon
            title="Badania"
            isLoading={examinationState.loading}
            columns={[
              { title: 'Data', field: 'date', type: 'date' },
              {
                title: 'Typ badania',
                field: 'examinationTypeId',
                lookup: examinationTypesState.items.reduce(
                  (prev, curr) => ({
                    ...prev,
                    [curr.id as number]: curr.name,
                  }),
                  {}
                ),
              },
              {
                title: 'Zwierzę',
                field: 'petId',
                render: row => (
                  <Link to={`/pets/details/${row.id}`}>{row.name}</Link>
                ),
              },
              {
                title: 'Notatka',
                field: 'noteId',
                render: row => (
                  <Link to={`/pets/details/${row.id}`}>{row.name}</Link>
                ),
              },
            ]}
            rows={examinationState.items}
            onDelete={async data => {
              dispatch(deleteExamination(data.id))
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}
