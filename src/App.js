import React ,{useState,useEffect} from 'react';
import {commerce} from './lib/commerce';
import {Products , Navbar , Cart,Checkout} from './components';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
const App = () => {
    const [products,setProducts] = useState({});
    const [cart,setCart]=useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    
    const fetchProducts = async() =>{
        const {data} = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async()=>{
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
    
        setCart(item.cart);
    };
    
    const handleUpdateCartQty = async (lineItemId, quantity) => {
        const response = await commerce.cart.update(lineItemId, { quantity });
    
        setCart(response.cart);
    };
    
    const handleRemoveFromCart = async (lineItemId) => {
        const response = await commerce.cart.remove(lineItemId);
    
        setCart(response.cart);
    };
    
    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();
    
        setCart(response.cart);
    };

    const handleCaptureCheckout = async (checkoutTokenId, newOrder)=>{
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder);

            setOrder(incomingOrder);
            refreshCart();

        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }
    
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
    
        setCart(newCart);
    };

    useEffect(()=>{
        fetchProducts();
        fetchCart();
    },[]);

    return (
        <Router>        
            <div>
                <Navbar  totalItems={cart.total_items}/>
                <Routes>
                    <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart}/>}/>
                    <Route path="/cart" element={<Cart cart={cart}
                    handleUpdateCartQty={handleUpdateCartQty}
                    handleEmptyCart={handleEmptyCart}
                    handleRemoveFromCart={handleRemoveFromCart}/>}/>
                    <Route path="checkout" element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} 
                     error={errorMessage}
                    /> }/>
                </Routes>
            </div>
        </Router>
    );
}

export default App
