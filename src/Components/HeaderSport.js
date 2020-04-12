import React from "react";
import { 
    Paper,
    Typography,
    Icon,
    Grid
} from '@material-ui/core'

// Types to use on Header
const types = [
    { subtitle: 'Sport type', type: 'Cycling', icon: 'fas fa-puzzle-piece' },
    { subtitle: 'Mode', type: 'Advanced', icon: 'fas fa-trophy' },
    { subtitle: 'Route', type: '30 miles', icon: 'fas fa-map-signs' }
]

// Styles
const headerSportStyle = {
    display: 'flex',
    backgroundColor: '#B1E5D4'
}

const paperStyle = {
    backgroundColor: '#B1E5D4',
    display: 'flex',
    margin: '2em',
    boxShadow: 'none'
}

const iconStyle = { 
    color: 'mediumaquamarine', 
    fontSize: '3em', 
    marginRight: '0.5em', 
    width: '100%' 
}
// End Styles

export default function HeaderSport(props) {
    return (
        <Grid style={headerSportStyle} container item xs={12}>
            {types.map((item, idx) =>
                <Grid item container key={idx} xs={2}>
                    <Paper style={paperStyle}>
                        <Grid item>
                            <Icon className={item.icon} style={iconStyle}/>
                        </Grid>
                        <Grid item>
                            <Typography variant="caption" color="textSecondary">
                                {item.subtitle}
                            </Typography>
                            <Typography component="h6" variant="h6" style={{ fontWeight: 700 }}>
                                {item.type}
                            </Typography>
                        </Grid>
                    </Paper>
                </Grid>
            )}
        </Grid>
    );
}
