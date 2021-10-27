import React from 'react';

const Navbar = ({userName}) => {
    return (
        <nav class="navbar navbar-dark bg-primary">
            <span class="navbar-brand">Пользователь: {userName}</span>
        </nav>
    )
}

export default Navbar