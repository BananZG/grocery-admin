import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ProductService from '../product-service'

const styles = theme => ({
  root: {
    width: 'auto',
    marginTop: theme.spacing.unit * 3,
    margin: 15,
    overflowX: 'auto',
  },
  paper: {
    padding: 15,
  },
  table: {
    minWidth: 700,
  },
});

class ListView extends Component {

  constructor(props) {
    super(props);
    let service = ProductService.getInstance();
    this.data = service.getAllProducts();
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Item Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell numeric>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.data.map(row => {
            return (
              <TableRow hover key={row.id}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>{row.desc}</TableCell>
                <TableCell numeric>{row.price}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
    );
  }
}

ListView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListView);
