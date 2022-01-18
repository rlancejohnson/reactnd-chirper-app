import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'New Tweet', path: '/new' },
    ]
    return (
        <nav className='nav'>
            <ul>
                {navItems.map(({ name, path }) => (
                    <li key={name}>
                        <NavLink to={path} className={isActive => isActive ? 'active' : ''}>{name}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}