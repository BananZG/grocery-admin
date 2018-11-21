import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ProductService from "../product-service";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    paddingLeft : 15,
    padding: 15,
  },
  card: {
    maxWidth: 345,
    "borderRadius": 15,
  },
  media: {
    height: 150,
  },
});

class Dashboard extends Component {

  constructor(props) {
    super(props);
    let service = ProductService.getInstance();
    this.data = service.getAllProducts();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="root" >
        <GridList cellHeight={290} spacing={10} cols={'auto'} className={classes.gridList}>
          {this.data.map(each => (
            <GridListTile key={each.id}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={each.imageUrl}
                    title={each.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    {each.title}
          </Typography>
                    <Typography component="p">
                      {each.desc}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </GridListTile>
          ))}
        </GridList>

      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
