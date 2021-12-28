import React from 'react';
import {Grid} from '@material-ui/core';

import Product from './product/product';


const Products = ({products, onAddToCart}) => {
    return(
    <main>
        <Grid container justify='center' spacing={4}>
            {products.map((product) =>(
                <Grid  item key = {product.id} xs={12} sm={10} md={4} ls={3}> 
                    <Product product={product} onAddToCart={onAddToCart} />
                </Grid>
            ))}
        </Grid>
    </main>)
}

export default Products;