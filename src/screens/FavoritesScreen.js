import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Message from '../components/Message';
import Product from '../components/Product';

export default function FavoritesScreen(props) {
    const [favorites, setFavorites] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    //const [category, setCategory] = useState('');
    const [user, setUser] = useState('');
    const params = useParams();
    const productId = params.id;
    console.log(productId)
    
    useEffect(() => {
        
        const loggedInUser = localStorage.getItem('user')
        if (loggedInUser) {
            //const foundUser = JSON.parse(loggedInUser);
            setUser(loggedInUser);
            console.log(loggedInUser)
        }
        
        const fetchData = async () => {

            try {
                // const config = {
                //     headers: {
                //         "Content-type": "application/json"
                //     }
                // }
               
                const {data} = await axios.get('https://mercaditobackend.herokuapp.com/api/users/favorites',
                {
                    user,
                    
                },
                //config
                );
                
                
                

                setFavorites(data.favorites)
                localStorage.setItem('favorites', data.favorites)
                console.log(data.favorites)
                
            } catch (err) {
                setError(err.message)
                
            }
            
        }

        fetchData()

    
       

    }, [])

   
    return (
        
        <div>

            
            
            
            {/* <div className="row center">
            {
                products.map(product => (
                <Product key = {product._id} product = {product}></Product>

                ))
            }
            
            </div>

            <div className="row left">
                <ul>
                    {
                        products.map(product => (
                            <li>{product.category}</li>
                        ))
                    }
                    
                    
                </ul>
            
            </div> */}
            {error ? (
                <Message variant="danger">{error}</Message>
            ) : (
            
                <div className="row center">
                    {
                        
                        favorites.map((info) => (
                            
                            <Product key = {info._id} product={info}></Product>
                        ))
                    }
                    
                    
                </div>
            )}
        </div>
    );

// //   const productId = props.match.params.id;
// //   const qty = props.location.search
// //     ? Number(props.location.search.split('=')[1])
// //     : 1;
//     return (
//         <div>
//         <h1>Favorites</h1>
//         <p>
//             ADD TO CART : ProductID: {productId}
//         </p>
//         </div>
//     );
}