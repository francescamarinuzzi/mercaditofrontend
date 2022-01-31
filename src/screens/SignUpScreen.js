import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function SignUpScreen(){
    const navigate = useNavigate();
    const [user, setUser] = useState()
    const [name, setName] = useState('');
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

           

            const {data} = await axios.post('/api/users/signup', 
            {
                name,
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
          <h1>Sign Un</h1>
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
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
            Sign Up
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?{' '}
            <Link to="/login">
                Log in
            </Link>
          </div>
        </div>
      </form>
    </div>
    )
}