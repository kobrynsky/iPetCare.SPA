import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../constants'
import '../race.css'
import {
    FormControl,
    FormLabel,
    Button,
    TextField,
    FormHelperText,
    Select,
    MenuItem,
    InputLabel,
} from '@material-ui/core'
import { getUserState } from '../../utils/localStorageHelper'
import { useParams } from 'react-router-dom'

axios.interceptors.request.use(
    config => {
        const token = getUserState()?.token
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

interface RaceFormProps {
    editing: boolean
}


export function RaceForm({ editing }: RaceFormProps) {
    const [name, setName] = useState('')
    const [species, setSpecies] = useState({ id: 0, name: "" })
    const [error, setError] = useState('')
    const [speciesList, setSpeciesList] = useState([{ id: 0, name: "" }])

    let { raceId } = useParams()


    useEffect(() => {
        axios.get(BASE_URL + '/species')
            .then(function (response) {
                console.log(response.data)
                setSpeciesList(response.data)
            })
            .catch(error => console.log(error));
        if (editing) {
            axios.get(BASE_URL + '/races/' + raceId)
                .then(function (response) {
                    setName(response.data.name)
                    setSpecies(response.data.species)
                })
                .catch(error => console.log(error));
        }

    }, []);

    const handleSpecieChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSpecies({ id: event.target.value as number, name: "" });
    };


    const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            if (editing) {
                let speciesId = species.id
                const response = await axios.put(BASE_URL + '/races/' + raceId, {
                    name,
                    speciesId
                })
            }
            else {
                let speciesId = species.id
                const response = await axios.post(BASE_URL + '/races', {
                    name,
                    speciesId
                })
            }

        } catch (error) {
            setError(error.response.data)
        }
    }

    return (
        <form onSubmit={onSumbit}>
            <div className="raceForm">
                {editing ?
                    <h2>Edytuj rasę</h2>
                    :
                    <h2>Dodaj rasę</h2>
                }

                <TextField
                    required
                    margin="normal"
                    variant="outlined"
                    label="Nazwa"
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
                <FormControl required variant="outlined" margin="normal">
                    <InputLabel htmlFor="outlined-age-native-simple">Gatunek</InputLabel>
                    <Select
                        onChange={handleSpecieChange}
                        value={species.id}
                        variant="outlined"
                        label="Gatunek"
                    >
                        {speciesList.map(species => (
                            <MenuItem key={species.id} value={species.id}>{species.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormHelperText error={!!error}>{error}</FormHelperText>
                <Button type="submit">Zapisz</Button>
            </div>
        </form >
    )
}
