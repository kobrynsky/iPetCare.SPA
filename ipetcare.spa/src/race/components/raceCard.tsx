import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BASE_URL } from '../../constants';
import axios from 'axios'

interface IRace {
    id: number
    name: string
    species: { id: number, name: string }
}

interface IProps {
    race: IRace
}


const RaceCard: React.FC<IProps> = ({ race }) => {

    const deleteRace = (raceId: number) => {
        axios.delete(BASE_URL + '/races/' + raceId)
            .then(function () {
                console.log("Usunięte");
            })
            .catch(error => console.log(error));
    }

    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {race.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Id: {race.id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Gatunek: {race.species?.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" href={`/race/edit/${race.id}`}>
                    Edytuj
                </Button>
                <Button size="small" color="secondary" onClick={() => { deleteRace(race.id) }}>
                    Usuń
                </Button>
            </CardActions>

        </Card>
    );
}

export default RaceCard