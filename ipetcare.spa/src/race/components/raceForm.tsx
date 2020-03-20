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
    const [specie, setSpecie] = useState({ id: 0, name: "" })
    const [error, setError] = useState('')
    const [species, setSpecies] = useState([{ id: 0, name: "" }])

    let { raceId } = useParams()


    useEffect(() => {
        axios.get(BASE_URL + '/species')
            .then(function (response) {
                setSpecies(response.data)
            })
            .catch(error => console.log(error));
        console.log(editing);

        if (editing) {
            axios.get(BASE_URL + '/races/' + raceId)
                .then(function (response) {
                    setName(response.data.name)
                    setSpecie(response.data.specie)
                })
                .catch(error => console.log(error));
        }

    }, []);

    const handleSpecieChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSpecie({ id: event.target.value as number, name: "" });
    };


    const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            if (editing) {
                let speciesId = specie.id
                const response = await axios.put(BASE_URL + '/races/' + raceId, {
                    name,
                    speciesId
                })
            }
            else {
                let specieId = specie.id
                const response = await axios.post(BASE_URL + '/races', {
                    name,
                    specieId
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
                <FormControl required margin="normal">
                    <FormLabel>Gatunek</FormLabel>
                    <Select
                        onChange={handleSpecieChange}
                        value={specie.id}
                    >
                        {species.map(specie => (
                            <MenuItem key={specie.id} value={specie.id}>{specie.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormHelperText error={!!error}>{error}</FormHelperText>
                <Button type="submit">Zapisz</Button>
            </div>
        </form >
    )
}
