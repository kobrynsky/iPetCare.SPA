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
    margin: 20,
    padding: 10,
    minWidth: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(244, 244, 244, 0.85)',
    borderRadius: 10,
    boxShadow: '3px 3px 10px #AAAAAA',
  },
  select: {
    width: 200,
    paddingLeft: 10,
    marginRight: 10,
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
        role={v.role}
        key={v.id}
        userId={v.userId}
        firstName={v.firstName}
        lastName={v.lastName}
        title="lek"
        email={v.email}
        imageUrl="https://i.pinimg.com/originals/02/60/fa/0260fa4827b372bb5884126324d171c1.jpg"
        institutions={v.institutions}
        specialization={v.specialization}
        currentSearchingUserRole={results.currentSearchingUserRole}
        isOwner={false}
      />
    ))
  } else {
    return <h3>Wpisz frazę, aby wyszukać</h3>
  }
}

const renderOwners = (results: GetSearchResponseDto) => {
  if (results.owners) {
    return results.owners.map(v => (
      <UserResult
        role={v.role}
        key={v.id}
        userId={v.userId}
        firstName={v.firstName}
        lastName={v.lastName}
        email={v.email}
        imageUrl="https://i.kym-cdn.com/entries/icons/facebook/000/032/280/meme1.jpg"
        placeOfResidence={v.placeOfResidence}
        currentSearchingUserRole={results.currentSearchingUserRole}
        isOwner={true}
      />
    ))
  } else {
    return <h3>Wpisz frazę, aby wyszukać</h3>
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
      console.log(request)
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
            defaultValue="SortByLastNameAsc"
            onChange={e => {
              setRequest({ ...request, sortBy: e.target.value as SortBy })
            }}
          >
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
