import React from 'react';

import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchBar from './SearchBar';
import Row from './Row';
import * as symbols from '../api/symbols'

export default class WatchList extends React.Component {
  state = {
    stocks: [],
    search: '',
    searchFromChild: ''
  }

  componentDidMount() {
    symbols.getSymbols().then((res) => {
      console.log("data is: ",res);
      this.setState({ stocks: res });
    })
  }

  searchCallback = (dataFromChild) => {
    this.setState({ searchFromChild: dataFromChild })
  }
  
  render() {
    const filteredStocks = this.state.stocks.filter(stock =>
        stock.name.toLowerCase().includes(this.state.searchFromChild.toLowerCase())
      );
    return (
        <TableContainer component={Paper}>
          <SearchBar callbackFromParent={this.searchCallback}/>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell/>
              <TableCell>Symbol</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredStocks.map((row) => (
              <Row key={row.name} row={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}