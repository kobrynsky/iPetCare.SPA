import React from 'react'
import '../home.css'
import { Grid, Typography } from '@material-ui/core'
import { ContentCard } from '../../../common/components/contentCard'
import { Link, NavLink } from 'react-router-dom'
import PetsIcon from '@material-ui/icons/Pets'

export function HomeScreen() {
  return (
    <div>
      <Grid container direction="column" justify={'center'}>
        <Grid item>
          <NavLink className="title" to="/">
            <Typography variant="h2" className="title peru">
              <PetsIcon fontSize="large" />
              iPetCare
            </Typography>
          </NavLink>
        </Grid>
        <Grid container direction="row" wrap={'wrap'}>
          <Grid item xs={12} md={3} style={{ minWidth: 200 }}>
            <Grid container alignItems="center" direction="column">
              <Link className="sideNav" to="/">
                Główna
              </Link>
              <a className="sideNav" href="#whatItIs">
                Co to jest?
              </a>
              <a className="sideNav" href="#about">
                Dla kogo
              </a>
              <a className="sideNav" href="#contact">
                Kontakt
              </a>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container direction="column" style={{ minWidth: 300 }}>
              <Grid item id="whatItIs">
                <ContentCard title="Co to jest?">
                  iPetCare to internetowa książeczka zdrowia zwierząt, która
                  jest kluczem do uproszczenia procesu opieki nad zwierzętami.
                  Skupia wszystkie konieczne informacjie dotyczące pupili w
                  jednym miejscu. Pozwala prowadzić historię zdrowia zwierząt,
                  gromadzić dokumentację medyczną, trzymać i aktualizować dane,
                  tworzyć notatki, dodawać ważne wydarzenia z życia zwierząt w
                  kalendarzu, jak również wprowadzać daty przyszłych badań.
                  Ponadto, elektroniczna książeczka zdrowia zwierząt iPetCare
                  umożliwa wyszukanie weterynarzy oraz zaproszenie danego
                  weterynarza do opieki nad wybranym pupilem. iPetCare jest
                  świetną opcją do łatwego dostępu do historii i danych
                  zwierząt, jak również do łatwej diagnozy potencjalnych chorób
                  przez weterynarza.
                </ContentCard>
              </Grid>
              <Grid item id="about">
                <ContentCard title="Dla kogo">
                  Główną grupę docelową systemu stanowią prywatni właściciele
                  zwierząt oraz weterynarze. Już dziś dołącz do naszej
                  społeczności i stań się jej częścią. Jeśli jesteś
                  weterynarzem, pozwoli Ci to na dostęp do danych i historii
                  zdrowia wszystkich zwierząt, które stanowią bazę Twoich
                  pacjentów. Jeśli jesteś właścicielem jednego bądź większej
                  ilości zwierząt, zdobędziesz sposobność do scentralizowania
                  procesu opieki nad wszystkimi Twoimi pupilami, bo w iPetCare
                  wszystkie ważne informacje będą w jednym miejscu.
                </ContentCard>
              </Grid>
              <Grid item id="contact">
                <ContentCard title="Kontakt">
                  Jeśli potrzebujesz skontaktować się z nami w sprawie wszelkich
                  kwestii zachęcamy do kontatku drogą e-mail. W tym celu należy
                  wysłać wiadomość bezpośrednio na adres
                  administracja@ipetcare.com.
                </ContentCard>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={3} item={true} />
        </Grid>
      </Grid>
    </div>
  )
}
