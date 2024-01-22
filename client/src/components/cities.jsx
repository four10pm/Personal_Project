import React, {useContext, useState, useEffect, createContext} from 'react';
import { urlContext, cityContext} from './context';
import '../styles/cities.css'

function Cities({cities}) {
    const APIurl = useContext(urlContext)
    const myCity = useContext(cityContext)
    const [city, setCity] = useState(myCity)
    const [cityDates, setCityDates] = useState([])
    
    async function getCityDates(e) {
        e.preventDefault()
        console.log(city)
            try {
                const response = await fetch(`${APIurl}/dateExamples/cities/${city}`)
                const data = await response.json();
                setCityDates(data)
            } catch (error) {
                console.log(error.message)
            }
        getCityDates();
    }

    const cityFilter =
        (<>
            <form method="post" className="searchForm" id="citysearch" onSubmit={getCityDates}>
                <label> Choose a city <br />
                    <select name="cityFilter" defaultValue={myCity} onChange={(e) => { setCity(e.target.value) }}>
                        <option value={""}> Select </option>
                        {cities.map((city) => {
                            return (
                                <option value={city.cityId}> {city.name}, {city.state} </option>
                            )
                        })}
                    </select>
                </label>
                <button name="filterbutton" className="searchbutton" type="submit"> Filter </button>
            </form>
        </>)
     
     const cityDatesList =
        cityDates.map((date) => {
            return (
                <div className="date example card">
                    <h3 className="title"> {date.name} </h3>
                    <p className="address"> {date.address} </p>
                    <p className="city"> {date.city}, {date.state} </p>
                    <img className="dateimage" src={date.imgUrl} />
                    <p className="datedescription"> {date.description} </p>
                    <p className="price"> {date.price} </p>
                    <p className="beenThere"> {date.beenThere} </p>
                    <a href={date.url} target="_blank"> Visit website </a>
                </div>
            )
        })

    return (
        <> 
            {myCity &&  <p> Your city is {myCity.name}, {myCity.state} </p>}
            {<p> Please select a city </p> && cityFilter }
            {<div className="dateListArea"> {cityDatesList} </div> }
        </>
    )
}

export default Cities; 