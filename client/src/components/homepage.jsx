import React, { useEffect, useContext, useState } from 'react'
import { nameContext, urlContext, cityContext } from './context'
import Example from './examplepage'
import '../styles/homepage.css'

function DateList({ selectedDate, setSelectedDate, cities, setCities, dateTypes, setDateTypes, allDates, setAllDates }) {
    const APIurl = useContext(urlContext)
    const myCity = useContext(cityContext)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [datetoUpdate, setDatetoUpdate] = useState(null)
    const [updatedDoneDate, setUpdatedDoneDate] = useState(null)
    const [message, setMessage] = useState("")
    const [searchMessage, setSearchMessage] = useState("")

    //TODO
    const datesFilterType = (e) => {
        e.preventDefault()
        console.log(searchTerm)
        const typeSearchResults = allDates.filter((date) => {
            return date.type.toLowerCase().includes(searchTerm)
        })
        setSearchResults(typeSearchResults);
      
        return searchResults;
    }

    const datesFilterDone = (e) => { 
        e.preventDefault()
        console.log(searchTerm)
        if (searchTerm === "true") {
            const doneSearchResults = allDates.filter((date) => {
                return date.lastDone
            })
            setSearchResults(doneSearchResults) 
        } else if (searchTerm === "false") {
            const doneSearchResults = allDates.filter((date) => {
                return !date.lastDone
            })
            setSearchResults(doneSearchResults) 
        }
        return searchResults;
    }

    const datesFilterAtHome = (e) => { 
        e.preventDefault()
        console.log(searchTerm)
        const atHomeSearchResults = allDates.filter((date) => {
            return date.atHome.toString() === searchTerm.toString()
        })
        setSearchResults(atHomeSearchResults);
        return searchResults;
    }

    const datesFilterPrice = (e) => { 
        e.preventDefault()
        console.log(searchTerm)
        const priceSearchResults = allDates.filter((date) => {
            return date.price.toLowerCase().includes(searchTerm)
        })
        setSearchResults(priceSearchResults);
        console.log(priceSearchResults)
        if (priceSearchResults.length === 0) {
           setSearchMessage("Sorry, your search didn't match any results!")
        }
        setSearchTerm("")
        return searchResults;
     }

    const searchResultsList =
        searchResults.map((date) => {
            return (<>
                <div className="date card">
                    <h3 className="title"> {date.name} </h3>
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
                    </form>
                    {!date.atHome && myCity && <button className="dateButton" id={date.dateId} onClick={() => { setSelectedDate(date.dateId); setSearchTerm("") }}> In Your City </button>}
                    {!date.atHome && !myCity && <button className="dateButton" id={date.dateId} onClick={() => { setSelectedDate(date.dateId); setSearchTerm("") }}> See Examples </button>}
                </div>
            </>
            )
        })

    const dateSearchbar =
        (<div className="searchBar">
            <form method="post" className="searchForm" onSubmit={datesFilterType}>
                <label> Filter by type <br />
                    <select name="typeFilter" onChange={(e) => { setSearchTerm(e.target.value) }}>
                        <option value={""}> Select </option>
                        {dateTypes.map((type) => {
                            return (
                                <option value={type.type}> {type.type} </option>
                            )
                        })}
                    </select>
                </label>
                <button className="searchButton" type="submit"> Filter </button>
            </form>
            <form method="post" className="searchForm" onSubmit={datesFilterAtHome}>
                <label> Filter by at home <br />
                    <select name="atHomeFilter" onChange={(e) => {setSearchTerm(e.target.value)}} >
                        <option value={""}> Select </option>
                        <option value={true}> At home dates only </option>
                        <option value={false}> Outside dates only </option>
                    </select>
                </label>
                <button className="searchButton" type="submit"> Filter </button>
            </form>
            <form method="post" className="searchForm" onSubmit={datesFilterPrice}>
                <label> Filter by price <br />
                    <select name="priceFilter" onChange={(e) => setSearchTerm(e.target.value)} >
                        <option value={""}> Select </option>
                        <option value="free-"> Free dates </option>
                        <option value="$-"> $ or more </option>
                        <option value="$$-"> $$ or more </option>
                        <option value="$$$-"> $$$ or more </option>
                        <option value="$$$$+"> $$$$ or more </option>
                    </select>
                </label>
                <button className="searchButton" type="submit"> Filter </button>
            </form>
            <form method="post" className="searchForm" onSubmit={datesFilterDone}>
                <label> Filter by done <br />
                    <select name="doneFilter" onChange={(e) => setSearchTerm(e.target.value)} >
                        <option value={""}> Select </option>
                        <option value={true}> Dates you've already done </option>
                        <option value={false}> Dates you haven't done </option>
                    </select>
                </label>
                <button className="searchButton" type="submit"> Filter </button>
            </form>
            <button className="resetButton" onClick={() => { setSearchTerm(null); setSearchResults([]) ; setMessage("") }}> See All Date Ideas </button>
        </div>)
    // TODO: add filter by price, by lastdone, by at home

    const updateDoneDate = async (event) => {
        event.preventDefault()
        console.log(datetoUpdate)
        console.log(updatedDoneDate)
        try {
            const response = await fetch(`${APIurl}/dateList/${datetoUpdate}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    lastDone: updatedDoneDate,
                }),
            })
            const result = await response.json
            setMessage("Updated!")
        } catch (error) {
            setMessage(error.message)
        }
    }


    const sanitize = () => {
        allDates.map((date) => {
            if (date.lastDone) {
                const d = new Date(date.lastDone)
                date.newDoneDate = d.toDateString()
                return date;
            }
        })
        return
    }

    const allDatesList =
        allDates.map((date) => {
            return (
                <div className="date card">
                    <h3 className="title"> {date.name} </h3>
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

    return (<>
        {sanitize()}
        <div className="dateSearchBar"> {dateSearchbar} </div>
        {allDates.length === 0 && <p> No dates available! Log in to add ideas </p>}
        {selectedDate && <Example selectedDate={selectedDate} setSelectedDate={setSelectedDate} />}
        {searchResults.length > 0 && !selectedDate &&
            <>
                <div className="dateListArea"> {searchResultsList} </div>
                <button className="resetButton" onClick={() => { setSearchTerm(null); setSearchResults([]) }}> See All Date Ideas </button>
            </>
        }
        {searchResults.length === 0 && searchMessage && <p> {searchMessage} </p>}
        {searchResults.length === 0 && !searchMessage && !selectedDate && <div className="dateListArea"> {allDatesList} </div>}
    </>)
}

export default DateList; 
