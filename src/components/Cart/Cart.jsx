import React from 'react'
import {Container, Typography,Grid,Button} from '@material-ui/core';
import useStyles from './styles';
import CartItem from './Cartitem/Cartitem';


const Cart = ({cart}) => {
    const classes= useStyles();

    const EmptyCart =()=>(
        <Typography variant="subtitle1">
            Your cart is Empty, go back pls.
        </Typography>
    );

    const FilledCart = () =>(
        <>
            <Grid container spacing ={3}>
                {cart.line_items.map((item) =>(
                    <Grid item xs ={12} sm={4} key={item.id}>
                        <div>
                            <CartItem item={item}/>
                        </div>
                    </Grid>  
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography>
                    subtotal={cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button     className={classes.emptyButton} size='large' type="button" variant="contained" color='secondary' >
                        Empty Cart
                    </Button>
                    <Button     className={classes.checkoutButton} size='large' type="button" variant="contained" color='primary' >
                        Checkout
                    </Button>
                </div>    
            </div>
        </>

    );
    
    if (!cart.line_items) return 'loading...';
    
    return (
        <Container>
            <div  className={classes.toolbar}/>
            <Typography className={classes.title} variant="h4" gutterBottom>
                Your Cart
            </Typography>
            { !cart.line_items.length ? <EmptyCart />:<FilledCart />}
        </Container>
    );
}

export default Cart
