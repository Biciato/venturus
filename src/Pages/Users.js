import React, { useState, useEffect } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { setUsers } from '../redux/actions';
import MaterialTable from "material-table";
import axios from 'axios'
import './Users.scss'
import UserDialog from '../Components/UserDialog'
import HeaderSport from "../Components/HeaderSport";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import Grid from '@material-ui/core/Grid'

// Style
const bredcrumbStyle = {
    padding: "0.5em 1em",
    backgroundColor: "beige",
};

function Users(props) {
    const { setUsers } = props
    // User selected
    const [userSelected, selectUser] = useState(null);
    // User selected
    const [openDialog, setOpenDialog] = useState(false);
    // Table Column names
    const columns = [
        'Username', 'Name', 'E-mail', 'City', 'Ride in group', 'Day of the week', 'Posts', 'Albums', 'Photos'
    ].map(item => ({
        title: item, field: item
    }))
    // Show Confirmation dialog
    const confirm = username => {
        selectUser(username)
        setOpenDialog(true)
    }
    // count items like Photos, Albums and Posts by user id
    const countItems = (arr, id) => 
        arr.filter(item => 
            (item.userId && item.userId === id) ||
            (item.albumId === id) )
            .length
    // Delete users if the accepted is true
    const handleDeleteUser = accepted => {
        if (accepted) {
            setUsers(props.users.filter(user => user.Username !== userSelected))
        }        
        setOpenDialog(false)
    }
    // get random ride in group data
    const getRideInGroupData = () => ['Always', 'Sometimes', 'Never'][3 * Math.random() | 0]
    // get day of the week
    const getDayOfTheWeek = id => 
        ['Every Day', 'Week Days', 'Mon, Wed, Fri', 'Weekends', 'Fri, Sun', 'Mon, Tue, Wed']
        [id > 4 ? (id > 8 ? (id - 5) : id - 3) : id]
    // Fetch Users, Photos, albums and posts from API
    useEffect(() => {
        const fetchUsers = () => 
            axios.all([
                axios.get('https://jsonplaceholder.typicode.com/users'),
                axios.get('https://jsonplaceholder.typicode.com/photos'),
                axios.get('https://jsonplaceholder.typicode.com/albums'),
                axios.get('https://jsonplaceholder.typicode.com/posts')
            ]).then(axios.spread((...response) => {
                const users = response[0].data.map(user => ({ 
                    Username: user.username,
                    Name: user.name,
                    'E-mail': user.email,
                    City: user.address.city,
                    'Ride in group': getRideInGroupData(),
                    'Day of the week': getDayOfTheWeek(user.id),
                    Posts: countItems(response[3].data, user.id),
                    Albums: countItems(response[2].data, user.id),
                    Photos: countItems(response[1].data, user.id)
                }))
                setUsers([...users])
            }))
        fetchUsers();
    }, [setUsers]);
    return (
        <Grid id="users" container justify="center">
            <Grid item xs={12} style={bredcrumbStyle}>
                <Breadcrumbs separator=">" aria-label="breadcrumb" style={{ backgroundColor: '#F5F5DC' }}>
                    <Link color="inherit" to="/">
                        <HomeIcon style={{ color: 'mediumaquamarine' }}/>
                    </Link>
                    <Typography color="textPrimary">User List</Typography>
                </Breadcrumbs>     
            </Grid>
            <Grid item xs={12}>
                <HeaderSport />
            </Grid>
            <Grid item xs={12}>
                <MaterialTable
                    columns={columns}
                    data={props.users}
                    title="Users"
                    options={{
                        actionsColumnIndex: -1,
                        paging: false,
                        headerStyle: {
                            border: 'none',
                            position: 'sticky'
                        }
                    }}
                    actions={[
                        {
                            icon: 'delete',
                            tooltip: 'Delete User',
                            onClick: (event, rowData) => confirm(rowData.Username)
                        }
                    ]}
                    localization={{ header: { actions: '#' } }}
                />
            </Grid>              
            <UserDialog onAccept={handleDeleteUser} open={openDialog}/>
        </Grid>
    );
}

const mapStateToProps = store => (store.users);

const mapDispatchToProps = dispatch =>
    bindActionCreators({ setUsers }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Users);
