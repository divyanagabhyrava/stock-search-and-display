import React from 'react';

import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Row from './Row';

export default class WatchList extends React.Component {
  state = {
    stocks: [],
    search: '',
  }

  componentDidMount() {
    axios.get(`https://hiring-project-307416.uk.r.appspot.com/api/v1/symbols`, {
        headers: {
            'api-key': '8675309-divya'
          }
    })
      .then(res => {
        this.setState({ stocks: res.data });
      })
  }

  render() {
    const handleChange = e => {
        this.setState({ search: e.target.value});
      };
    const filteredRows = this.state.stocks.filter(row =>
        row.name.toLowerCase().includes(this.state.search.toLowerCase())
      );
    return (
        <TableContainer component={Paper}>
        <div className='coin-search'>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Symbol</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredRows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}