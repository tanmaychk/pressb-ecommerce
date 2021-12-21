import React from 'react';
mport {commerce} from './lib/commerce';
import {Products , Navbar} from './components';
const App = () => {
    const [products,setProducts] = useState([]);
    return (
        <div>
            <Navbar />
            <Products/>
        </div>
    )
}

export default App
