import React from 'react'
import{Card,CardMedia,CardActions,CardContent,Typography,IconButton} from '@material-ui/core';
import { AddShoppingCart} from '@material-ui/icons';
import useStyle from './style'
const Product = ({product,onAddToCart}) => {
    const classes= useStyle();
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image.url} title={product.title}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterbottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5" >
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html:product.description}} variant="body2" color='textSecondary'/>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label='Add to cart ' onClick={() => onAddToCart(product.id,1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>

            
        </Card>
    )
}

export default Product;
