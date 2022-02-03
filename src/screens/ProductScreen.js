import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
//import Rating from '../components/Rating';
import data from '../data';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function ProductScreen(props) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false);
  const [favorites, setFavorites] = useState([])
  const [user, setUser] = useState([])
    //const product = data.products.find((x) => Number(x._id) === Number(props.match.params.id));
  //const product = data.products.find((x) => x._id === props.match.params.id);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
      if (loggedInUser) {
          setUser(loggedInUser);
          //console.log(loggedInUser)
      }
    
    
    const fetchData = async () => {
      try {
          const {data} = await axios.get('https://mercaditobackend.herokuapp.com/api/products', 
          {
            id
          });
          setProducts(data)
          
      } catch (err) {
          setError(err.message)
          
      }
    }
        
    
    fetchData()
  }, [])
  
  const { id } = useParams();
  console.log(id)
  const product = products.find((x) => x._id === id);
  if (!product) {
    return <div> Product Not Found </div>;
  }
  const addToFavoritesHandler = async (e) => {
    e.preventDefault();
        
      try {
        // const config = {
        //     headers: {
        //         "Content-type": "application/json"
        //     }
        // }

          

        const {data} = await axios.put('https://mercaditobackend.herokuapp.com/api/users/favorites',
        {
          user,
          id
        },
        //config
        )

        console.log(data)
        setFavorites(data)
        localStorage.setItem('favorites', data)
        navigate(`/favorites/${user}`)
        //console.log(data)
          
          
          
      } catch (e) {
          console.error(e); 
          
      }
    
  }
  return (
    <div>
      <Link to="/">Back to products</Link>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={product.image} alt={product.name}></img>
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            
            <li>
              Description:
              <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Price</div>
                  <div className="price">${product.price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Status</div>
                  <div>
                    {product.stock > 0 ? (
                      <span className="success">In Stock</span>
                    ) : (
                      <span className="danger">Unavailable</span>
                    )}
                  </div>
                </div>
              </li>
             
                {
                  product.stock > 0 && (
                    <>
                    <li> <button 
                    className="primary block"
                    onClick = {addToFavoritesHandler}
                    >Add to Favorites</button> </li>
                    </>
                  )
                }
                
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}