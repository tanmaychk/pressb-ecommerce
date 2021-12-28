import React ,{useState,useEffect} from 'react';
import {commerce} from './lib/commerce';
import {Products , Navbar , Cart} from './components';
import {BrowserRouter as router,Switch, Route, Router} from 'react-router-dom';
const App = () => {
    const [products,setProducts] = useState([]);
    const [cart,setCart]=useState({});
    
    const fetchProducts = async() =>{
        const {data} = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async()=>{
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async(productID, quantity) =>{
        const item = await commerce.cart.add(productID,quantity);
        setCart(item.cart);
    }

    useEffect(()=>{
        fetchProducts();
        fetchCart();
    },[]);

    console.log(cart);
    return (
        <Router>        
        <div>
            <Navbar  totalItems={cart.total_items}/>
            <Switch>
                <Route exact path='/'>

                </Route>

                <Route>
                    
                </Route>
            <Products products={products}  onAddToCart={handleAddToCart} />
            <Cart cart={cart}/>
            </Switch>
        </div>
        </Router>
    )
}

export default App
