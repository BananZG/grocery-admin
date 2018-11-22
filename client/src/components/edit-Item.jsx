import React, { Component } from "react";
import PropTypes from 'prop-types';
import ProductService from "../product-service";
import LinearProgress from '@material-ui/core/LinearProgress';
import ErrorPage from './error-page';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    root:{
        margin: 15,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

class EditItem extends Component {

    state = {
        item: {},
        isLoaded: false,
    };
    componentDidMount() {
        const { id } = this.props.match.params;
        let service = ProductService.getInstance();
        service.getSingleProduct(id)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        item: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleChange = name => event => {
        var temp = this.state.item;
        temp[name] = event.target.value;
        this.setState({
            item: temp,
        });
    };

    render() {
        const { classes } = this.props;
        const { item, isLoaded, error } = this.state;
        if (!isLoaded) {
            return (
                <LinearProgress />
            )
        }
        else if (error != null) {
            return (
                <ErrorPage error={error} />
            )
        }
        else
            return (
                <div>
                <Paper className={classes.root} elevation={1}>
                    <form className={classes.container} autoComplete="off">
                        <TextField
                            id="standard-title"
                            label="Title"
                            className={classes.textField}
                            value={item.title}
                            onChange={this.handleChange('title')}
                            margin="normal"
                            variant="standard"
                        />
                        <TextField
                            id="standard-desc"
                            label="Description"
                            fullWidth
                            className={classes.textField}
                            value={item.desc}
                            onChange={this.handleChange('desc')}
                            margin="normal"
                            variant="standard"
                        />
                    </form>
                    </Paper>
                    {JSON.stringify(item, null, 4)}
                </div>
            );
    }
}

EditItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditItem);