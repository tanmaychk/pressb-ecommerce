import React from 'react';
import {AppBar,Toolbar,IconButton,Badge,MenuItem,Menu,Typography} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/1f976.svg';
import useStyles from "./styles"

export const Navbar = () => {
    const classes = useStyles();
    return (
        <>
            <AppBar position='fixed' className={classes.appbar} color='inherit'>
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <img src ={logo} alt="commerce.js"  height ='25px' className={classes.image} />
                        The Drip Store
                    </Typography>
                    <div classname={classes.grow}/>
                    <div classname={classes.button}>
                        <IconButton aria-label='show cart items' color='inherit'>
                            <Badge badgeContent={3} color='secondary'>
                                <ShoppingCart />
                            </Badge>

                        </IconButton>
                    </div>

                </Toolbar>
            </AppBar>   
        </>
    )
}

export default Navbar;
