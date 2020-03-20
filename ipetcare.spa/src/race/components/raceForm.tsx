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

export function RaceForm() {
    const [name, setName] = useState('')
    const [specieId, setSpecieId] = useState(0)
    const [error, setError] = useState('')
    const [species, setSpecies] = useState([{ id: 0, name: "" }])

    useEffect(() => {
        axios.get(BASE_URL + '/species')
            .then(function (response) {
                setSpecies(response.data)
            })
            .catch(error => console.log(error));
    }, []);

    const handleSpecieChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSpecieId(event.target.value as number);
    };


    const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await axios.post(BASE_URL + '/races', {
                name,
                specieId
            })
        } catch (error) {
            setError(error.response.data)
        }
    }

    return (
        <form onSubmit={onSumbit}>
            <div className="raceForm">
                <h2>Dodaj rasę</h2>

                <TextField
                    required
                    margin="normal"
                    variant="outlined"
                    label="Nazwa"
                    onChange={e => setName(e.target.value)}
                />
                <FormControl required margin="normal">
                    <FormLabel>Gatunek</FormLabel>
                    <Select
                        onChange={handleSpecieChange}
                        defaultValue=""
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
