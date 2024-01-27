import React, { useEffect, useContext, useState, createContext } from 'react'
import { urlContext, userContext, tokenContext, favoritesContext, searchTermContext, selectedDateContext } from './context';
import { addFavorites, deleteFavorites } from '../fetching';

export default function DateList({dates, selectedDate, setSelectedDate, message, setMessage}) {
    const myToken = useContext(tokenContext)
    const userInfo=useContext(userContext)
    const favorites=useContext(favoritesContext)
    const APIurl = useContext(urlContext)
    const favs = []
    const myCity= userInfo.city    
        return (
            <div className="dateListArea">
                {dates.map((date) => {
                    return (   
                        <div className="date card" id={date.dateId}>
                            {date.dateName && <h3 className="title"> {date.dateName} </h3>}
                            {date.name && <h3 className="title"> {date.name} </h3> }
                            {myToken && date.name && 
                                favorites.map((favorite) => {
                                    if (favorite.dateId === date.dateId) (favs.push(date.dateId))
                                })}
                            {myToken && date.name && favs.includes(date.dateId) ?
                                <button className="favoritebutton" id={date.dateId} onClick={() => { deleteFavorites(date.dateId, userInfo, APIurl, setMessage) }}> Remove from favorites </button> :
                                myToken && date.name && <button className="favoritebutton" id={date.dateId} onClick={() => { addFavorites(date.dateId, userInfo, APIurl, setMessage) }}> Add to favorites </button>}
                            <p className="datetype"> {date.type} </p>
                            <img className="dateimage" src={date.imgUrl} />
                            <p className="datedescription"> {date.description} </p>
                            <p className="price"> {date.price} </p>
                            {!date.atHome && <button className="dateButton" id={date.dateId} onClick={() => { setSelectedDate(date.dateId) ; console.log(selectedDate)}}> See Examples </button>}
                        </div>      
                    )
                })}
            </div>
            )
    }

