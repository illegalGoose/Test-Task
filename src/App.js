import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Stack } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function getOptions() {
  return fetch("https://www.cbr-xml-daily.ru/daily_json.js")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return data.Valute;
  })
  .then((valute) => {
    let valutes = [];
    for (let name in valute) {
      valutes.push(valute[name]);
    }
    return valutes;
  })
  .then((array) => {
    const rows = array.map((valute) => {
      return {
        favourite: "Избранное",
        name: valute.Name,
        nominal: valute.Nominal,
        charcode: valute.CharCode,
        value: valute.Value,
        id: valute.ID,
      }
    })
    return rows;
  });
}


function App() {
  const [options, setOptions] = React.useState([]);
  React.useEffect(() => {
    getOptions().then(setOptions)
  }, [])
  



  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

  return (
    <div className="App">
      <header className="App-header">
        <Stack spacing={0}>
          <p style={{ color: "grey", margin: 0 }}>Базовая валюта</p>
          <Autocomplete sx={{ width: 160 }}
            options={options}
            getOptionLabel={(option) => option.name}
            id="clear-on-escape"
            clearOnEscape
            renderInput={(params) => (
              <TextField {...params} variant="standard" />
            )}
          />
          <p style={{color: "grey", marginTop: "5px", fontFamily: 'sans-serif', fontSize: "13px"}}>Выберите базовую валюту</p>
        </Stack>
      </header>
      <div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{width: "150px"}}>Избранное</TableCell>
              <TableCell align="left">Валюта</TableCell>
              <TableCell align="right">Единиц</TableCell>
              <TableCell align="right" style={{width: "200px"}}>Буквенный код</TableCell>
              <TableCell align="right" style={{width: "100px"}}>Курс</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {options.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align='center'>
                  {row.favourite}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.nominal}</TableCell>
                <TableCell align="right">{row.charcode}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;
