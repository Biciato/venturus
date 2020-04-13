import React, { useEffect } from "react";
import { loadCSS } from "fg-loadcss";
import { Icon, Paper, Typography} from "@material-ui/core";

const iconStyle = { 
    color: 'mediumaquamarine', 
    fontSize: '65px',
}

const pStyle = {
    marginLeft: '1em',
    marginBlockStart: 0
}

export default function PaperContent(props) {
    useEffect(() => {
        loadCSS(
            "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
            document.querySelector("#font-awesome-css")
        );
    }, []);
    return (
        <Paper elevation={0}>
            <Typography variant="h5" style={{ color: 'mediumaquamarine' }}>{props.title}</Typography>
            <div style={{display: 'flex', marginTop: '1em'}}>
                <Icon className={props.icon} style={iconStyle} fontSize="large" />
                <p style={pStyle}>{props.message}</p>
            </div>
        </Paper>
    );
}
