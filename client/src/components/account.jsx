import React, { useEffect, useContext, useState, createContext } from 'react'
import { urlContext, userContext, tokenContext, favoritesContext, selectedDateContext } from './context';
import Login from './login';
import Register from './register';
import DateList from './datelist';
import Example from './examplepage';
import '../styles/account.css'

function Account({ cities, favorites, setFavorites, user, setUser, setToken, selectedDate, setSelectedDate }) {
    const APIurl = useContext(urlContext)
    const userInfo = useContext(userContext)
    const myToken = useContext(tokenContext)
    const [cityInfo, setCityInfo] = useState({})
    const [newCityId, setNewCityId] = useState(null)
    const [message, setMessage] = useState("")

    const getCityById = async () => {
        if (cityInfo.name) { return cityInfo }
        console.log(user.city)
        try {
            const response = await fetch(`${APIurl}/cities/${user.city}`)
            const data = await response.json();
            console.log(data)
            setCityInfo(data)
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
                return result
            } catch (error) {
                console.log("getFavorites", error, error.message)
            }
        }
        getFavorites();
    }, [myToken])

    const deleteFavorites = async (id) => {
        console.log(id)
        console.log(user.userId)
        try {
            const response = await fetch(`${APIurl}/users/${user.userId}/favorites/`, {
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
        }
    }

    return (
        <div>
            <div className="login">
                {!myToken && <Login user={user} setUser={setUser} setToken={setToken} />}
                {!myToken && <Register user={user} setUser={setUser} setToken={setToken}/>}
            </div>
            <favoritesContext.Provider value={favorites}>
                {myToken &&
                    <div className="accountInfo">
                        <div className="account">
                            <p> Welcome &nbsp; </p> 
                            <p className="accountDetails"> {userInfo.name}! </p></div>
                        <div className="accountCity">
                        {!userInfo.city && <p> Please choose a city! </p>}
                        {userInfo.city && getCityById() &&
                            <div className="account"> 
                                <p> Your city is &nbsp; </p> 
                                <p className="accountDetails"> {cityInfo.name}, {cityInfo.state} </p> 
                            </div> }
                        <form id="chooseCity" className="contributeform" onSubmit={(event) => { changeCity(event) }}>
                            <label> Update your city: &nbsp; 
                                <select required name="editCity" onChange={(e) => { setNewCityId(parseInt(e.target.value)) }}>
                                    <option value={""}> Select </option>
                                    {cities.map((city) => {
                                        return (
                                            <option value={city.cityId}> {city.name}, {city.state} </option>
                                        )
                                    })}
                                </select>
                            </label> <br />
                            <button type="submit" className="submitButton"> Submit </button> <br />
                            {message}
                        </form>
                        </div>
                        <div className="favoritesList">
                            <p> Your favorite dates: </p>
                            {console.log(favorites)}
                            {!selectedDate && favorites.length === 0 && (<p> Go find some new date ideas! </p>) &&
                                <button href="/"> See All Dates </button>}
                            {!selectedDate && favorites.length > 0 && <DateList dates={favorites} setSelectedDate={setSelectedDate} selectedDate={selectedDate} />}
                            {selectedDate && <Example selectedDate={selectedDate} setSelectedDate={setSelectedDate} /> }
                        </div>

                    </div>}
            </favoritesContext.Provider>
        </div>

    )
}

export default Account; 