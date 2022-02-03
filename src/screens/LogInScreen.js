import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function LogInScreen(){
    const navigate = useNavigate();
    const [user, setUser] = useState()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const submitHandler = async (e) => {
        e.preventDefault();
        //console.log(email, password)
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

           

            const {data} = await axios.post('https://mercaditobackend.herokuapp.com/api/users/login', 
            {
                email,
                password
            },
            config
            )

            //console.log(data)
            setUser(data)
            localStorage.setItem('user', data._id)
            navigate("/");
            console.log(data)
           
            
            
        } catch (e) {
            console.error(e); 
            
        }
    };
    
    return (
        <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Log In</h1>
        </div>
        
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Log In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer?{' '}
            <Link to="/signup">
              Create your account
            </Link>
          </div>
        </div>
      </form>
    </div>
    )
}