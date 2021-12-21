import React from 'react';
import {Grid} from '@material-ui/core';

import Product from './product/product';

const products=[
    {id:1 ,name:'shoes',description:'nike shoes',price:'$10',image:'revolt-164_6wVEHfI-unsplash.jpg'},
    {id:2,name:'macbook',description:'Apple macbook',price:'$10',image: 'dmitry-chernyshov-mP7aPSUm7aE-unsplash.jpg'},
    {id:3 , name:'basketball',description:'NBA basketball',price:'$3',image:'ruslan-ruslan-AhAMJgq5QPM-unsplash.jpg'},
];

const Products = () => {
    return(
    <main>
        <Grid container justify='center' spacing={4}>
            {products.map((product) =>(
                <Grid  item key = {product.id} xs={12} sm={10} md={4} ls={3}> 
                    <Product product={product} />
                </Grid>
            ))}
        </Grid>
    </main>)
}

export default Products;