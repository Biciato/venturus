import React, { useState, useEffect } from "react";
import "./App.scss";
import { Switch, Route, useLocation, useHistory, Link } from "react-router-dom";
import Users from "./Pages/Users";
import NewUser from "./Pages/NewUser";
import Avatar from "@material-ui/core/Avatar";
import { ChevronRight, KeyboardArrowDown } from "@material-ui/icons";
import { 
    AppBar, 
    Divider, 
    Icon, 
    makeStyles, 
    MenuItem, 
    Menu, 
    Toolbar, 
    Typography, 
    withStyles 
} from "@material-ui/core";

// Mock User
const user = {
    name: "Jason Bourne",
    email: "jasonbourne@example.com",
    getInitials: (name) =>
        name
            .split(" ")
            .map((name) => name[0])
            .join(""),
};

// Material Ui Style Setup
const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1, height: "100%", backgroundColor: "white" },
    appName: {
        flexGrow: 1,
        backgroundColor: "white",
        color: "black",
        cursor: "pointer",
        fontSize: "1.3em",
        fontWeight: "500",
        textDecoration: "none",
    },
    userMenu: {
        backgroundColor: "white",
        color: "black",
        cursor: "pointer",
    },
}));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        padding: "1em 1.5em",
        "&:hover": {
            color: "aquamarine",
        },
    },
}))(MenuItem);
// End Material Ui Style Setup
// Styles
const iconStyle = { color: "mediumaquamarine", marginRight: "0.5em" };

const avatarStyle = { backgroundColor: "white", color: "black", border: "1px solid black", marginRight: "0.5em" };

const menuItems = ["Friends List", "Saved Items", "Notifications", "User Preferences"];
// End Styles

export default function App() {
    // Material Ui styles
    const classes = useStyles();
    // set login menu
    const [loginStatus, setLoginStatus] = useState(false);
    // select chevron icon
    const [ChevronIcon, setChevronIcon] = useState(ChevronRight);
    // getting url location to be used to set Login Icon
    const location = useLocation();
    let history = useHistory();
    // states to handle dropdown Login Icon menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    // Dropdown shows on open set to true
    const open = Boolean(anchorEl);
    // Setting Login Icon if user's inside /users page
    useEffect(() => {
        let status = false;
        if (location.pathname === "/") {
            history.replace("/users");
        } else if (location.pathname === "/users") {
            status = true;
        } else {
            status = false;
        }
        setLoginStatus(status);
    }, [location.pathname, history]);

    // open menu dropdown
    const handleMenu = (event) => {
        setChevronIcon(KeyboardArrowDown);
        setAnchorEl(event.currentTarget);
    };

    // close menu dropdown
    const handleClose = () => {
        setChevronIcon(ChevronRight);
        setAnchorEl(null);
    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.root}>
                    <Icon className="fas fa-running" style={iconStyle} />
                    <Link to="/" className={classes.appName}>
                        Venturus Sports
                    </Link>
                    {loginStatus && (
                        <div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Avatar
                                    style={avatarStyle}
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                >
                                    {user.getInitials(user.name)}
                                </Avatar>
                                <Typography className={classes.userMenu} onClick={handleMenu}>
                                    {user.name}
                                </Typography>
                                <ChevronIcon style={{ color: "black" }} />
                            </div>

                            <Menu
                                id="menu-appbar"
                                getContentAnchorEl={null}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                }}
                                open={open}
                                onClose={handleClose}
                                style={{ top: "1em" }}
                            >
                                {menuItems.map((item, idx) => (
                                    <StyledMenuItem onClick={handleClose} key={idx}>
                                        {item}
                                    </StyledMenuItem>
                                ))}
                                <Divider />
                                <StyledMenuItem onClick={handleClose}>Logout</StyledMenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Switch>
                <Route path="/users">
                    <Users />
                </Route>
                <Route path="/user/new">
                    <NewUser />
                </Route>
            </Switch>
        </div>
    );
}
