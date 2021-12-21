import React from 'react'
import{Card,CardMedia,CardActions,CardContent,Typography,IconButton} from '@material-ui/core';
import { AddShoppingCart} from '@material-ui/icons';
import useStyle from './style'
const Product = ({product}) => {
    const classes= useStyle();
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image} title={product.title}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterbottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5" >
                        {product.price}
                    </Typography>
                </div>
                <Typography variant="body2" color='textSecondary'>{product.description}</Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label='Add to cart'>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>

            
        </Card>
    )
}

export default Product;
