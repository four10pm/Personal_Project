import React, { useContext, useState, useEffect, createContext } from 'react';
import { urlContext, userContext, citiesContext } from './context';
import '../styles/cities.css'

function Cities() {
    const APIurl = useContext(urlContext)
    const user = useContext(userContext)
    const cities = useContext(citiesContext)
    const myCity = user.city
    const [city, setCity] = useState(myCity)
    const [cityDates, setCityDates] = useState([])
    const [message, setMessage] = useState("")
    const [exampletoUpdate, setExampletoUpdate] = useState(null)
    const [updateCheck, setUpdateCheck] = useState(null)

    async function getCityDates(e) {
        e.preventDefault()
        if (city === "") { setCityDates([]); setMessage("Please choose a city!") }
        try {
            const response = await fetch(`${APIurl}/dateExamples/cities/${city}`)
            const data = await response.json();
            setCityDates(data)
            if (data.length === 0) {
                setMessage("No dates available for this city yet!")
            } else { setMessage("") }
        } catch (error) {
            console.log(error.message)
        }
        getCityDates();
    }

    // Decided not to do this, but leaving in in case I want to add it later: 
    // const updateBeenThere = async (event) => {
    //     event.preventDefault()
    //     console.log(exampletoUpdate)
    //     console.log(updateCheck)
    //     try {
    //         const response = await fetch(`${APIurl}/dateExamples/${exampletoUpdate}`, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 beenThere: updateCheck,
    //             }),
    //         })
    //         const result = await response.json
    //         setMessage("Updated!")
    //     } catch (error) {
    //         setMessage(error.message)
    //     }
    // }

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
                <button name="filterbutton" className="searchButton" type="submit"> Filter </button>
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
                    {/* <form className="doneform" onSubmit={(event) => {updateBeenThere(event)}} >
                        <label name="dateDone"> Have you been here? 
                            <input type="checkbox" defaultChecked={date.beenThere} onChange={(e)=>{setUpdateCheck(e.target.checked)}} /> 
                        </label> 
                        <button type="submit" className="updateButton" onClick={()=>{setExampletoUpdate(date.exampleId)}}> Save </button> 
                    </form> */}
                    <a href={date.url} target="_blank"> Visit website </a>
                </div>
            )
        })

    return (
        <div className="cityArea">

            {<p> Please select a city </p> && cityFilter}
            {<div className="dateListArea"> {cityDatesList} </div>}
            {message && <div className="searchMessage"> {message} </div>}
            {/* {cityDates && cityDates.length === 0 && <p className="searchMessage"> No dates for this city yet! </p> } */}
        </div>
    )
}

export default Cities; 