import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addUser } from "../redux/actions";
import Grid from "@material-ui/core/Grid";
import PaperContent from "../Components/PaperContent";
import paperContents from "../resources/paper-content";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles, withStyles, fade } from "@material-ui/core/styles";
import clsx from "clsx";

// Alert Component
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Styles
const btnStyle = { margin: "0.5em 0.5em 0", color: "white", textTransform: "none" };

const formLabels = {
    width: "100%",
    color: "black",
    fontWeight: 700,
    fontSize: "1.2em",
};

const bredcrumbStyle = {
    padding: "0.5em 1em",
    backgroundColor: "beige",
};
// End Styles

// Custom Input Component
const BootstrapInput = withStyles((theme) => ({
    root: {
        "label + &": {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: "relative",
        backgroundColor: theme.palette.common.white,
        border: "1px solid #ced4da",
        fontSize: 16,
        width: "100%",
        padding: "10px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        "&:focus": {
            boxShadow: `${fade("#66CDAA", 0.25)} 0 0 0 0.2rem`,
            borderColor: "mediumaquamarine",
        },
    },
}))(InputBase);

// Material Ui Style Setup
const useStyles = makeStyles({
    root: {
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    icon: {
        borderRadius: 3,
        width: 16,
        height: 16,
        boxShadow: "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
        backgroundColor: "#f5f8fa",
        backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
        "$root.Mui-focusVisible &": {
            outline: "2px auto rgba(19,124,189,.6)",
            outlineOffset: 2,
        },
        "input:hover ~ &": {
            backgroundColor: "#ebf1f5",
        },
        "input:disabled ~ &": {
            boxShadow: "none",
            background: "rgba(206,217,224,.5)",
        },
    },
    checkedIcon: {
        backgroundColor: "mediumaquamarine",
        backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
        "&:before": {
            display: "block",
            width: 16,
            height: 16,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
        "input:hover ~ &": {
            backgroundColor: "mediumaquamarine",
        },
    },
});

function NewUser(props) {
    // Input fields
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [radioValue, setRadioValue] = useState("always");
    const [checkboxArr, setCheckboxArr] = useState([]);
    // End Input fields
    // State for handle SnackBar
    const [openSnack, setSnackStatus] = useState(false);
    // State for Handle Errors
    const [errors, setErrors] = useState({
        username: false,
        name: false,
        email: false
    })
    // Store action
    const { addUser } = props;
    // Material Ui Custom styles
    const classes = useStyles();
    // TODO: clean form after save user
    const clearForm = () => null;
    // Input Change Handlers
    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        console.log(event.target.name);
        let arr = checkboxArr;
        const idx = checkboxArr.indexOf(event.target.name);
        arr.length > 0 && arr.includes(event.target.name) ? arr.splice(idx, 1) : arr.push(event.target.name);
        setCheckboxArr([...arr]);
    };

    const handleCloseSnack = () => setSnackStatus(false);

    const handleUsername = (event) => setUsername(event.target.value);
    const handleName = (event) => setName(event.target.value);
    const handleEmail = (event) => setEmail(event.target.value);
    const handleCity = (event) => setCity(event.target.value);
    // End Input Change Handlers
    // Save user in the store
    const saveUser = () => {
        if ([name, username, email].includes('') ) {
            setErrors({
                username: username === '' ? true : false,
                name: name === '' ? true : false,
                email: email === '' ? true : false
            })
        } else {
            addUser({
                name,
                username,
                email,
                city,
                ride_in_group: radioValue,
                days_of_week: checkboxArr,
            });
            setSnackStatus(true);
        }
    };

    return (
        <Grid id="newUser" container justify="center">
            <Grid item xs={12} style={bredcrumbStyle}>
                <Breadcrumbs separator=">" aria-label="breadcrumb">
                    <Link to="/">
                        <HomeIcon style={{ color: "mediumaquamarine" }} />
                    </Link>
                    <Typography color="textPrimary">New User Form</Typography>
                </Breadcrumbs>
            </Grid>
            <Grid className="header" container item xs={12} alignItems="center" spacing={10}  style={{ marginTop: '0.5em' }}>
                <Grid xs={4} item>
                    <Typography variant="h3" style={{ fontWeight: 300 }}>
                        Registration
                    </Typography>
                </Grid>
                <Grid xs={8} item style={{ height: "3%", backgroundColor: "beige", padding: 0 }}></Grid>
            </Grid>
            <Grid container item xs={12} spacing={10} style={{ marginTop: '0.5em' }}>
                <Grid container item>
                    {paperContents.map((item, idx) => (
                        <Grid item xs={4} key={idx}>
                            <PaperContent title={item.title} message={item.message} icon={item.icon} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid xs={9} item>
                <Divider variant="middle" style={{ height: "2px", margin: "3em 0" }} />
            </Grid>
            <Grid xs={9} container item>
                <form>
                    <Grid container item xs={12} spacing={6}>
                        <Grid item xs={6}>
                            <FormControl className={classes.margin} style={{ width: "100%" }}>
                                <InputLabel shrink htmlFor="username" style={formLabels}>
                                    Username
                                </InputLabel>
                                <BootstrapInput id="username" required onChange={handleUsername} value={username} />
                            </FormControl>
                            {errors.username && <Grid style={{ color: 'red' }}>Username is required</Grid>}
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className={classes.margin} style={{ width: "100%" }}>
                                <InputLabel shrink htmlFor="city" style={formLabels}>
                                    City (Optional)
                                </InputLabel>
                                <BootstrapInput id="city" onChange={handleCity} value={city} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className={classes.margin} style={{ width: "100%" }}>
                                <InputLabel shrink htmlFor="name" style={formLabels}>
                                    Name
                                </InputLabel>
                                <BootstrapInput id="name" required onChange={handleName} value={name} />
                            </FormControl>
                            {errors.name && <Grid style={{ color: 'red' }}>Name is required</Grid>}
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl component="fieldset" style={{ width: "100%" }}>
                                <FormLabel component="legend" style={{ ...formLabels, fontSize: "0.9em" }}>
                                    Ride in group?
                                </FormLabel>
                                <RadioGroup
                                    aria-label="rideInGroup"
                                    name="rideInGroup"
                                    value={radioValue}
                                    onChange={handleRadioChange}
                                    style={{ flexDirection: "row" }}
                                >
                                    {["always", "sometimes", "never"].map((item, idx) => (
                                        <FormControlLabel
                                            value={item}
                                            control={
                                                <Radio
                                                    className={classes.root}
                                                    disableRipple
                                                    color="default"
                                                    checkedIcon={
                                                        <span className={clsx(classes.icon, classes.checkedIcon)} />
                                                    }
                                                    icon={<span className={classes.icon} />}
                                                    label={item}
                                                />
                                            }
                                            key={idx}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className={classes.margin} style={{ width: "100%" }}>
                                <InputLabel shrink htmlFor="email" style={formLabels}>
                                    E-mail
                                </InputLabel>
                                <BootstrapInput id="email" required onChange={handleEmail} value={email} />
                            </FormControl>
                            {errors.email && <Grid style={{ color: 'red' }}>E-mail is required</Grid>}
                        </Grid>
                        <Grid item xs={6} style={{ paddingRight: 0 }}>
                            <FormControl component="fieldset" style={{ width: "108%" }}>
                                <FormLabel component="legend" style={{ ...formLabels, fontSize: "0.9em" }}>
                                    Days of the week
                                </FormLabel>
                                <FormGroup style={{ flexDirection: "row" }}>
                                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((item, idx) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={handleCheckboxChange}
                                                    name={item}
                                                    className={classes.root}
                                                    disableRipple
                                                    color="default"
                                                    checkedIcon={
                                                        <span className={clsx(classes.icon, classes.checkedIcon)} />
                                                    }
                                                    icon={<span className={classes.icon} />}
                                                />
                                            }
                                            label={item}
                                            key={idx}
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                style={{ ...btnStyle, backgroundColor: "mediumaquamarine" }}
                                disableElevation
                                onClick={saveUser}
                            >
                                Save
                            </Button>
                            <Button
                                variant="contained"
                                disableElevation
                                style={{ ...btnStyle, color: "darkgray" }}
                                onClick={clearForm}
                            >
                                Discard
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleCloseSnack}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnack} severity="success">
                    User Added!
                </Alert>
            </Snackbar>
        </Grid>
    );
}
const mapStateToProps = store => (store.users);

const mapDispatchToProps = (dispatch) => bindActionCreators({ addUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
