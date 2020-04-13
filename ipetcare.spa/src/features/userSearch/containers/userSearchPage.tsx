import React, { useState } from 'react'
import { UserResult } from '../components/userResult'
import { TextField, makeStyles, CircularProgress } from '@material-ui/core'
import {
  GetVetsSearchResponseDto,
  SortBy,
  GetVetsSearchDto,
} from '../../../api/dto'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../state/store'
import { searchVets } from '../../../state/search/searchActions'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  input: {
    maxWidth: 500,
    minWidth: 300,
    margin: 20,
  },
})

const renderResults = (results: GetVetsSearchResponseDto) => {
  if (results.vets) {
    return results.vets.map(v => (
      <UserResult
        key={v.id}
        firstName={v.firstName}
        lastName={v.lastName}
        title="lek"
        email={v.email}
        imageUrl="https://www.wprost.pl/_thumb/5f/09/909272231d1fcb0bd2a3bcd3d8c3.jpeg"
        institutions={v.institutions}
        specialization={v.specialization}
      />
    ))
  }
}

export const UserSearchPage = () => {
  const styles = useStyles()
  const dispatch = useDispatch()
  const searchState = useSelector((state: RootState) => state.search)
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('' as SortBy)
  const [timeout, setTimeoutState] = useState(0 as any)

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuery(e.target.value)
    const request = {
      query,
      getVetsSortBy: sortBy === '' ? undefined : sortBy,
    } as GetVetsSearchDto

    if (timeout) clearTimeout(timeout)
    setTimeoutState(setTimeout(() => dispatch(searchVets(request)), 700))
  }

  return (
    <div className={styles.container}>
      <TextField
        className={styles.input}
        type="search"
        title="Wyszukaj"
        placeholder="Wyszukaj"
        inputMode="search"
        onChange={onInputChange}
      />

      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        {searchState.loading ? (
          <CircularProgress />
        ) : (
          renderResults(searchState.vetsResponse)
        )}
      </div>
    </div>
  )
}
