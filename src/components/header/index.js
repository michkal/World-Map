import React from "react"
import {
    NavLink
} from 'react-router-dom';

import './index.scss'

const activeLinkStyle = {
    fontWeight: 700
};
export const Header = ({}) => {
    return (
        <div className='header-grid-container'>
            <div className='header-grid-row header-row1'>
                <div className='header-grid-col-1'>
                        <NavLink activeStyle={activeLinkStyle} exact to="/">
                            <button className='navBtn'>Main</button>
                        </NavLink>
                </div>
                <div className='header-grid-col-2'>
                        <NavLink activeStyle={activeLinkStyle} to='/game'>
                            <button className='navBtn'>Game </button>
                        </NavLink>
                </div>
                <div className='header-grid-col-3'>
                        <NavLink activeStyle={activeLinkStyle} to='/weather'>
                            <button className='navBtn'>Weather</button>
                        </NavLink>

                </div>
            </div>
        </div>


    )
};