import React, { useState, useEffect } from 'react'
import { UserResult } from '../components/userResult'
import {
  TextField,
  makeStyles,
  CircularProgress,
  Select,
  MenuItem,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core'
import { GetSearchResponseDto, SortBy, GetSearchDto } from '../../../api/dto'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../state/store'
import { searchVets, searchOwners } from '../../../state/search/searchActions'
import { OWNER, VET } from '../../../utils/constants'
import { Pagination } from '@material-ui/lab'
import { ceil } from 'lodash'

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
  resultTitle: {
    justifyContent: 'center',
    textAlign: 'center',
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
  } else {
    return <h3>Nie znaleziono, spróbuj wpisać inną frazę</h3>
  }
}

const renderOwners = (results: GetSearchResponseDto) => {
  if (results.owners) {
    return results.owners.map(v => (
      <UserResult
        key={v.id}
        firstName={v.firstName}
        lastName={v.lastName}
        email={v.email}
        imageUrl="https://www.wprost.pl/_thumb/5f/09/909272231d1fcb0bd2a3bcd3d8c3.jpeg"
        placeOfResidence={v.placeOfResidence}
      />
    ))
  } else {
    return <h3>Nie znaleziono, spróbuj wpisać inną frazę</h3>
  }
}

export const UserSearchPage = () => {
  const styles = useStyles()
  const dispatch = useDispatch()
  const searchState = useSelector((state: RootState) => state.search)
  const [timeout, setTimeoutState] = useState(0 as any)
  const [who, setWho] = useState(VET)
  const [request, setRequest] = useState({
    query: '',
    sortBy: undefined,
    page: 1,
    pageSize: 10,
  } as GetSearchDto)

  useEffect(() => {
    if (request.query.length > 0) {
      if (timeout) clearTimeout(timeout)
      setTimeoutState(
        setTimeout(() => {
          who === VET
            ? dispatch(searchVets(request))
            : dispatch(searchOwners(request))
        }, 700)
      )
    }
  }, [request])

  const getPages = () => {
    return who === VET
      ? ceil(
          searchState.vetsResponse.totalItems /
            searchState.vetsResponse.pageSize
        )
      : ceil(
          searchState.ownersResponse.totalItems /
            searchState.ownersResponse.pageSize
        )
  }

  const onInputChange = (e: any) => {
    setRequest({ ...request, query: e.target.value })
  }

  const renderResults = () => (
    <>
      {who === VET ? (
        <h2 className={styles.resultTitle}>Weterynarze</h2>
      ) : (
        <h2 className={styles.resultTitle}>Użytkownicy</h2>
      )}
      <br />
      <div className={styles.resultContainer}>
        {who === VET
          ? renderVets(searchState.vetsResponse)
          : renderOwners(searchState.ownersResponse)}
      </div>
    </>
  )

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <RadioGroup
          row
          defaultValue={VET}
          onChange={e => setWho(e.target.value)}
        >
          <FormControlLabel
            value={VET}
            control={<Radio color="primary" />}
            label="Weterynarze"
          />
          <FormControlLabel
            value={OWNER}
            control={<Radio color="primary" />}
            label="Opiekunowie"
          />
        </RadioGroup>
        <TextField
          className={styles.input}
          type="search"
          label="Wyszukaj"
          placeholder="Wyszukaj"
          inputMode="search"
          onChange={onInputChange}
          onKeyPress={e => {
            if (e.which === 13) onInputChange(e)
          }}
        />

        <FormControl>
          <FormLabel>Sortowanie</FormLabel>
          <Select
            className={styles.select}
            label="Sortowanie"
            value={request.sortBy}
            defaultValue=""
            onChange={e => {
              setRequest({ ...request, sortBy: e.target.value as SortBy })
            }}
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
        </FormControl>
      </div>

      {searchState.loading ? <CircularProgress /> : renderResults()}

      {getPages() > 0 && (
        <Pagination
          style={{ backgroundColor: 'white' }}
          color="standard"
          count={getPages()}
          size="medium"
          page={request.page}
          onChange={(e, val) => setRequest({ ...request, page: val })}
        />
      )}
    </div>
  )
}
