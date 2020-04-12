import React from "react";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import Typography from '@material-ui/core/Typography'

const iconStyle = { 
    color: 'mediumaquamarine', 
    fontSize: '65px',
}

const pStyle = {
    marginLeft: '1em',
    marginBlockStart: 0
}

export default function PaperContent(props) {
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
