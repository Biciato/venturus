import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumbs, Typography } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

export default function BreadCrumb(props) {
    return (
        <Breadcrumbs separator=">" aria-label="breadcrumb">
            <Link to={props.to || '/'}>
                <HomeIcon style={{ color: "mediumaquamarine" }} />
            </Link>
            <Typography color="textPrimary">New User Form</Typography>
        </Breadcrumbs>
    )
}