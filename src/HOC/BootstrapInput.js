import InputBase from '@material-ui/core/InputBase'
import { withStyles, fade } from "@material-ui/core/styles";

export default withStyles((theme) => ({
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