import { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import Message from '../components/Message';
//import data from '../data';

export default function HomeScreen(){
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');
    const [user, setUser] = useState([]);
    const categories = ['Shirts', 'Pants', 'Shoes']
    const conditions = ['new', 'used']
    
    useEffect(() => {

        const loggedInUser = localStorage.getItem('user')
        if (loggedInUser) {
            
            setUser(loggedInUser);
            console.log(loggedInUser)
        }
        const fetchData = async () => {
            try {
                const {data} = await axios.get('/api/products');
                setProducts(data)
                
            } catch (err) {
                setError(err.message)
                
            }
            
        }
        fetchData()
        console.log(category)
    }, [])

    
    return (
        
        <div>
            {/* <select
            //value={}
            onChange={(e) => { 
                setCondition(e.target.value) 
            }}
          >
            <option value="new">New</option>
            <option value="used">Used</option>
            {/* <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option> 
          </select> */}

          <h4> Categories </h4>
          <ul> 
              {
                  categories.map((category) => (
                    <li 
                    style = {{cursor: 'pointer'}}
                    key = {category}
                    onClick = {() => setCategory(category)} >{category}</li>
                  ))
              }
          </ul>
            
    
            {error ? (
                <Message variant="danger">{error}</Message>
            ) : (
            
                <div className="row center">
                    
                    
                    {/* {products.map((product) => (
                    
                    <Product key={product._id} product={product}></Product>
                    ))} */}
                    
                    {products.map((product, index) => {
                        if(category === ''){
                            return <Product key={product._id} product={product}></Product>
                        } else {
                            return category === product.category?(
                                <div key={index}>
                                    <Product key={product._id} product={product}></Product>
                                </div>
                            
                            ) : null
                        }
                            
                        })}
                </div>
            )}
        </div>
    );
}