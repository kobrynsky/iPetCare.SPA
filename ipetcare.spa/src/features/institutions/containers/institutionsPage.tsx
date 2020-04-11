import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { ContentCard } from '../../../common/components/contentCard'
import { Link, NavLink } from 'react-router-dom'
import { TableCommon } from '../../../common/components/tableCommon'
import { createInstitution, getInstitutions, deleteInstitution, updateInstitution } from '../../../state/institutions/institutionsActions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { Institution } from '../../../state/institutions/institutionsReducer'

export function InstitutionsPage() {
    const dispatch = useDispatch()
    const institutionsState = useSelector((state: RootState) => state.institutions)

    useEffect(() => {
        dispatch(getInstitutions())
    }, [])


    return (
        <div>
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="h1" className="title">
                        Instytucje
          </Typography>
                </Grid>
                <Grid item>
                    <TableCommon
                        title="Instytucje"
                        isLoading={institutionsState.loading}
                        columns={[{ title: 'Nazwa', field: 'name' }, { title: 'Adres', field: 'address' }]}
                        rows={institutionsState.items}
                        onDelete={async data => {
                            dispatch(deleteInstitution(data.id))
                        }}
                        onAdd={async data => {
                            dispatch(
                                createInstitution({
                                    id: undefined,
                                    name: data.name,
                                    address: data.address,
                                })
                            )
                        }}
                        onEdit={async data => {
                            dispatch(
                                updateInstitution({
                                    id: data.id,
                                    name: data.name,
                                    address: data.address,
                                })
                            )
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    )
}