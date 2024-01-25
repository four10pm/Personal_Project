import React, { useEffect, useContext, useState } from 'react'
import { urlContext, nameContext } from './context';
import Login from './login';
import Register from './register';

function Account({ token, setToken, cities, favorites, setFavorites, user, setUser }) {
    const APIurl = useContext(urlContext)
    const myName = useContext(nameContext)
    const [myCity, setMyCity] = useState({})
    const [newCityId, setNewCityId] = useState(null)
    const [message, setMessage] = useState("")

    const getCityById = async () => {
        if (myCity.name) { return myCity }
        console.log(user.city)
        try {
            const response = await fetch(`${APIurl}/cities/${user.city}`)
            const data = await response.json();
            console.log(data)
            setMyCity(data)
            return data;
        } catch (error) {
            console.log(error.message)
        }
    }

    const changeCity = async (e) => {
        e.preventDefault()
        console.log(newCityId)
        try {
            const response = await fetch(`${APIurl}/users/${user.userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    city: newCityId,
                }),
            })
            const result = await response.json()
            setMessage("Your city has been changed! Please log out to see updates")
            return result;
        } catch (error) {
            console.log("change City", error, error.message)
        }
    }

    useEffect(() => {
        async function getFavorites() {
            console.log(favorites)
            console.log(user.userId)
            try {
                const response = await fetch(`${APIurl}/users/${user.userId}/favorites`)
                const result = await response.json()
                console.log(result)
                setFavorites(result)
                setFavs(true)
                return result
            } catch (error) {
                console.log("getFavorites", error, error.message)
            }
        }
        getFavorites();
    }, [token])

    const deleteFavorites = async (id) => {
        console.log(id)
        console.log(user.userId)
        try { 
            const response = await fetch(`${APIurl}/users/${user.userId}/favorites/` , {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.userId,
                    dateId: id
                })
            });
            setMessage("Removed from favorites!")
        } catch (error) {
            setMessage(error.message)
        }}

    const favoritesList =
    favorites.map((date) => {
        return (
            <div className="date card">
                <h3 className="title"> {date.dateName} </h3>
                <button className="favoritebutton" id={date.dateId} onClick={()=>{deleteFavorites(date.dateId)}}> Remove from favorites </button>
                <p className="datetype"> {date.type} </p>
                <img className="dateimage" src={date.imgUrl} />
                <p className="datedescription"> {date.description} </p>
                <p className="price"> {date.price} </p>
                {date.lastDone && <p className="lastdone"> The last time you did this was {date.newDoneDate} </p>}
                <form className="doneform" onSubmit={(event) => { updateDoneDate(event) }} >
                    <label name="dateDone"> I did this on
                        <input type="date" onChange={(e) => { setUpdatedDoneDate(e.target.value) }} />
                    </label>
                    <button type="submit" className="updateButton" onClick={() => { setDatetoUpdate(date.dateId) }}> Save </button>
                    {message && <p> {message} </p>}
                </form>
                {!date.atHome && myCity && <button className="dateButton" id={date.dateId} onClick={() => { setSelectedDate(date.dateId); setSearchTerm("") }}> In Your City </button>}
                {!date.atHome && !myCity && <button className="dateButton" id={date.dateId} onClick={() => { setSelectedDate(date.dateId); setSearchTerm("") }}> See Examples </button>}
            </div>
        )
    })

    return (
        <div>
            <div>
                <Login setToken={setToken} token={token} user={user} setUser={setUser} setMyCity={setMyCity} myCity={myCity} />
                <Register setToken={setToken} token={token} user={user} setUser={setUser} />
            </div>
            {token &&
                <div>
                    <p> Welcome {myName}! </p>
                    {getCityById() && <p> Your city is {myCity.name}, {myCity.state} </p>}
                    <form name="chooseCity" className="contributeform" onSubmit={(event) => { changeCity(event) }}>
                        <label> Would you like to change it?
                            <select required name="editCity" onChange={(e) => { setNewCityId(parseInt(e.target.value)) }}>
                                <option value={""}> Select </option>
                                {cities.map((city) => {
                                    return (
                                        <option value={city.cityId}> {city.name}, {city.state} </option>
                                    )
                                })}
                            </select>
                        </label> <br />
                        <button type="submit"> Submit </button> <br />
                        {message}
                    </form>
                    <div className="favoritesList">
                        <p> Your favorite dates: </p>
                        {favorites.length === 0 && (<p> Go find some new date ideas! </p>)}
                        {favorites.length > 0 && favoritesList}
                    </div>
                </div>}
        </div>

    )
}

export default Account; 