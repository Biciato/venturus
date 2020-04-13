import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addUser } from "../redux/actions";
import clsx from "clsx";
import BootstrapInput from "../HOC/BootstrapInput";
import Alert from "../Components/Alert";
import PaperContent from "../Components/PaperContent";
import paperContents from "../resources/paper-content";
import { breadcrumbStyle, btnStyle, formLabels, useStyles } from "../CustomStyles/Styles";
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormControl,
    FormLabel,
    FormGroup,
    Grid,
    InputLabel,
    Radio,
    RadioGroup,
    Snackbar,
    Typography,
} from "@material-ui/core";
import BreadCrumb from "../Components/BreadCrumb";

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
        email: false,
    });
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
        if ([name, username, email].includes("")) {
            setErrors({
                username: username === "" ? true : false,
                name: name === "" ? true : false,
                email: email === "" ? true : false,
            });
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
            <Grid item xs={12} style={breadcrumbStyle}>
                <BreadCrumb />
            </Grid>
            <Grid
                className="header"
                container
                item
                xs={12}
                alignItems="center"
                spacing={10}
                style={{ marginTop: "0.5em" }}
            >
                <Grid xs={4} item>
                    <Typography variant="h3" style={{ fontWeight: 300 }}>
                        Registration
                    </Typography>
                </Grid>
                <Grid xs={8} item style={{ height: "3%", backgroundColor: "beige", padding: 0 }}></Grid>
            </Grid>
            <Grid container item xs={12} spacing={10} style={{ marginTop: "0.5em" }}>
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
                                <BootstrapInput
                                    id="username"
                                    required
                                    onChange={handleUsername}
                                    value={username}
                                    inputProps={{ "data-testid": "username-input" }}
                                />
                            </FormControl>
                            {errors.username && <Grid style={{ color: "red" }}>Username is required</Grid>}
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
                                <BootstrapInput
                                    id="name"
                                    required
                                    onChange={handleName}
                                    value={name}
                                    inputProps={{ "data-testid": "name-input" }}
                                />
                            </FormControl>
                            {errors.name && <Grid style={{ color: "red" }}>Name is required</Grid>}
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
                                                        <span
                                                            className={clsx(
                                                                classes.radioIcon,
                                                                classes.checkedRadioIcon
                                                            )}
                                                        />
                                                    }
                                                    icon={<span className={classes.radioIcon} />}
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
                                <BootstrapInput
                                    id="email"
                                    required
                                    onChange={handleEmail}
                                    value={email}
                                    inputProps={{ "data-testid": "email-input" }}
                                />
                            </FormControl>
                            {errors.email && <Grid style={{ color: "red" }}>E-mail is required</Grid>}
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
const mapStateToProps = (store) => store.users;

const mapDispatchToProps = (dispatch) => bindActionCreators({ addUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
