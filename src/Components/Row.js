import React from 'react';
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useState, useEffect } from 'react';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import axiosRetry from 'axios-retry';

function Row(props) {
    axiosRetry(axios, { retries: 3 });

    const [details, setDetails] = useState(null);
    const useRowStyles = makeStyles({
      root: {
        '& > *': {
          borderBottom: 'unset',
        },
      },
    });
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [trigger, setTrigger] = React.useState(true);
    const [price, setPrice] = React.useState('');
    const classes = useRowStyles();

      const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);

      const fetchData = async () => {
        setOpen(!open)
        const response = await axios.get(
          `https://hiring-project-307416.uk.r.appspot.com/api/v1/data//${row.symbol}`, {
            headers: {
                'api-key': '8675309-divya'
              }
          }
        );
        setDetails(response.data);
      };

      useEffect(() => {
        async function fetchPrice() {
          if(trigger) {
            console.log("[Row]-api call to get price of a stock")
            try {
              let result = await axios.get(`https://hiring-project-307416.uk.r.appspot.com/api/v1/price/${row.symbol}`, {
                headers: {
                'api-key': '8675309-divya'
              }  
              })
            console.log('Result is :', result);
            setPrice(result.data.price)
            } 
            catch (e) {
              if(e == 'Error: Request failed with status code 429')
              {
                console.log('Maximum limit reached-unable to get the stock price at this time');
                setPrice('Please try after a minute')
              }
            console.log('Error is :',e);
            }
          }
        }
    
        fetchPrice()
      }, [trigger])
   
    return (
      <React.Fragment>
        <StyledTableRow className={classes.root}>
          <StyledTableCell>
            <IconButton aria-label="expand row" size="small" onClick={fetchData}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </StyledTableCell>
          <StyledTableCell >{row.symbol}</StyledTableCell>
          <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
          <StyledTableCell component="th" scope="row">{price}</StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell>
            <IconButton color="primary" aria-label="add to shopping cart">
              <AddShoppingCartIcon />
            </IconButton>
          </StyledTableCell>
        </StyledTableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Capital Expenditure</TableCell>
                      <TableCell>Currency</TableCell>
                      <TableCell>EBITDA</TableCell>
                      <TableCell>EPS</TableCell>
                      <TableCell>Free Cash Flow</TableCell>
                      <TableCell>Gross Profit</TableCell>
                      <TableCell>Income Before Tax</TableCell>
                      <TableCell>Long Term Debt</TableCell>
                      <TableCell>Net Income</TableCell>
                      <TableCell>Revenue</TableCell>
                      <TableCell>Link</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {details && details.map((detailsRow) => (
                      <TableRow key={detailsRow.date}>
                        <TableCell component="th" scope="row">{detailsRow.date}</TableCell>
                        <TableCell>{detailsRow.capital_expenditure}</TableCell>
                        <TableCell>{detailsRow.currency}</TableCell>
                        <TableCell>{detailsRow.ebitda}</TableCell>
                        <TableCell>{detailsRow.eps}</TableCell>
                        <TableCell>{detailsRow.free_cash_flow}</TableCell>
                        <TableCell>{detailsRow.gross_profit}</TableCell>
                        <TableCell>{detailsRow.income_before_tax}</TableCell>
                        <TableCell>{detailsRow.long_term_debt}</TableCell>
                        <TableCell>{detailsRow.net_income}</TableCell>
                        <TableCell>{detailsRow.revenue}</TableCell>
                        <TableCell>{detailsRow.sec_link}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  export default Row;