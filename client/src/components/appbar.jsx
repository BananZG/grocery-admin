import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Dashboard from '@material-ui/icons/Dashboard';
import ListAlt from '@material-ui/icons/ListAlt';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link, withRouter } from 'react-router-dom';
import queryString from 'query-string'

const styles = theme => ({
  root: {
    width: '100%',
    top: 0,
    bottom: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimarySearchAppBar extends React.Component {
  state = {
    q: "",
    mobileMoreAnchorEl: null,
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  callRedirectTo = (url, q) => {
    // if has redirectTo text.
    let canHaveQ = this.canHaveQ(url);
    var tempq = "";
    if (q != null && q.length > 0 && canHaveQ !== -1) {
      tempq = "?q=" + q;
    }
    this.props.history.push(url + tempq);
  }

  handleSearch = event => {
    this.setState({
      q: event.target.value,
    });
    this.callRedirectTo(this.props.location.pathname, event.target.value)
  };
  componentDidMount() {
    const queries = queryString.parse(this.props.location.search)
    const tempq = queries.q;
    if (this.state.q !== tempq) {
      this.setState({ q: tempq });
    }
  }

  canHaveQ = e => {
    return ["/dashboard", "/listView"].includes(e);
  }

  render() {
    const { mobileMoreAnchorEl, q } = this.state;
    const { classes } = this.props;
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    let canHaveQ = this.canHaveQ(this.props.location.pathname);

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem component={Link} to="/dashboard" onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Dashboard />
          </IconButton>
          <p>Dashboard</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit" component={Link} to="/listView" onClick={this.handleMobileMenuClose}>
            <ListAlt />
          </IconButton>
          <p>List View</p>
        </MenuItem>
      </Menu>
    );
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Grocery Admin
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                disabled={!canHaveQ}
                placeholder="Search…"
                value={q}
                onChange={this.handleSearch}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit" onClick={() => this.callRedirectTo("/dashboard", q)}>
                <Dashboard />
              </IconButton>
              <IconButton color="inherit" onClick={() => this.callRedirectTo("/listView", q)}>
                <ListAlt />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PrimarySearchAppBar));
