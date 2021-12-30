import React from 'react';
import {Typography,Card,Button,CardActions,CardContent,CardMedia} from '@material-ui/core';
import useStyles from './styles';

const CartItem = ({item,onUpdateCartQty,onRemoveFromCart}) => {
    const classes = useStyles();
    return (
        <Card >
           <CardMedia image={item.image.url} alt={item.name} className={classes.media}/>
           <CardContent className={classes.cardContent}>
                <Typography variant='h5'>
                    {item.name}
                </Typography>
                <Typography variant='h6'>
                    {item.line_total.formatted_with_symbol}
                </Typography>
           </CardContent>
           <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size='small' onClick={()=>onUpdateCartQty(item.id,item.quantity-1)}>
                        -
                    </Button>
                    <Typography>
                        {item.quantity}
                    </Typography>
                    <Button type="button" size='small' onClick={()=>onUpdateCartQty(item.id,item.quantity+1)}>
                        +
                    </Button>
                </div>
                <Button type='button' variant='contained' color='secondary' onClick={()=>onRemoveFromCart(item.id)}>Remove</Button>
           </CardActions>
        </Card>
    )
}

export default CartItem
