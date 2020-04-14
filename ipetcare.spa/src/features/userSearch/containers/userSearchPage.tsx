import React, { useState } from 'react'
import { UserResult } from '../components/userResult'
import {
  TextField,
  makeStyles,
  CircularProgress,
  Select,
  MenuItem,
} from '@material-ui/core'
import { GetSearchResponseDto, SortBy, GetSearchDto } from '../../../api/dto'
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
  resultContainer: {
    display: 'flex',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  inputContainer: {
    display: 'flex',
    marginTop: 20,
    minWidth: 600,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(244, 244, 244, 0.85)',
    borderRadius: 10,
    boxShadow: '3px 3px 10px #AAAAAA',
  },
  select: {
    width: 200,
  },
})

const renderVets = (results: GetSearchResponseDto) => {
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

const renderOwners = (results: GetSearchResponseDto) => {
  if (results.owners) {
    return results.owners.map(v => (
      <UserResult
        key={v.id}
        firstName={v.firstName}
        lastName={v.lastName}
        title="lek"
        email={v.email}
        imageUrl="https://www.wprost.pl/_thumb/5f/09/909272231d1fcb0bd2a3bcd3d8c3.jpeg"
        placeOfResidence={v.placeOfResidence}
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
    } as GetSearchDto

    if (timeout) clearTimeout(timeout)
    setTimeoutState(setTimeout(() => dispatch(searchVets(request)), 700))
  }

  const renderResults = () => (
    <>
      {renderVets(searchState.vetsResponse)}
      {renderOwners(searchState.ownersResponse)}
    </>
  )

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <TextField
          className={styles.input}
          type="search"
          label="Wyszukaj"
          placeholder="Wyszukaj"
          inputMode="search"
          onChange={onInputChange}
        />

        <Select
          className={styles.select}
          label="Sortowanie"
          value={sortBy}
          onChange={e => setSortBy(e.target.value as SortBy)}
        >
          <MenuItem value="">Brak</MenuItem>
          <MenuItem value={'SortByLastNameAsc' as SortBy}>
            Nazwisko rosnąco
          </MenuItem>
          <MenuItem value={'SortByLastNameDesc' as SortBy}>
            Nazwisko malejąco
          </MenuItem>
          <MenuItem value={'SortBySpecializationAsc' as SortBy}>
            Specjalizacja rosnąco
          </MenuItem>
          <MenuItem value={'SortBySpecializationDesc' as SortBy}>
            Specjalizacja malejąco
          </MenuItem>
        </Select>
      </div>

      <div className={styles.resultContainer}>
        {searchState.loading ? <CircularProgress /> : renderResults()}
      </div>
    </div>
  )
}
