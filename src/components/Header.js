import React, { useEffect, useState } from 'react';

export default function Header(props) {
    //const {product} = props
    
    const [user, setUser] = useState('');
    useEffect(() => {
        
        const loggedInUser = localStorage.getItem('user')
        if (loggedInUser) {
            setUser(loggedInUser);
            console.log(loggedInUser)
        }
    }, [])

    const handleLogout = () => {
        setUser({});
        localStorage.clear();
    };

    if(user){
        return (
        
            <header className="row"> 
            
                <div>
                    <a className="logo" href="/">El Mercadito</a>
                </div>
                <div>
                    <a href="/favorites/:id">Favorites</a>
                    <a href="/" onClick={handleLogout}>Log Out</a>
                </div>
            </header>
            
        )

    } else {
        return (
        
            <header className="row"> 
            
                <div>
                    <a className="logo" href="/">El Mercadito</a>
                </div>
                <div>
                    
                    <a href="/login">Log In</a>
                </div>
            </header>
            
        )

    }
    
}


