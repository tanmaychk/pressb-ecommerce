import React from 'react';
import {AppBar,Toolbar,IconButton,Badge,Typography} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/download.png';
import useStyles from "./styles"
import { Link,useLocation } from 'react-router-dom';

export const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location=useLocation();
    return (
        <>
            <AppBar position='fixed' className={classes.appbar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to="/" variant="h5" className={classes.title} color="inherit">
                        <img src ={logo} alt="commerce.js"  height ='40px' className={classes.image} />
                        Press B
                    </Typography>
                    <div classname={classes.grow}/>
                    {location.pathname ==='/' &&(
                    <div classname={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label='show cart items' color='inherit'>
                            <Badge badgeContent={totalItems} color='secondary'>
                                <ShoppingCart />
                            </Badge>

                        </IconButton>
                    </div>)}

                </Toolbar>
            </AppBar>   
        </>
    )
}

export default Navbar;
