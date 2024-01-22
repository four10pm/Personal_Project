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

    //TODO
    const datesFilterType = (e) => {
        e.preventDefault()
        console.log(allDates)
        console.log(searchTerm)
        const typeSearchResults = allDates.filter((date) => {
            return date.type.toLowerCase().includes(searchTerm)
        })
        setSearchResults(typeSearchResults);
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
                    {date.lastDone && <p className="lastdone"> The last time you did this was {date.newDoneDate } </p>}
                    {!date.atHome && myCity && <button className="dateButton" id={date.dateId} onClick={() => { setSelectedDate(date.dateId); setSearchTerm("") }}> In Your City </button>}
                    {!date.atHome && !myCity && <button className="dateButton" id={date.dateId} onClick={() => { setSelectedDate(date.dateId); setSearchTerm("") }}> See Examples </button>}
                </div>
            </>
            )
        })

    const datesFilterDone = () => { return }

    const datesFilterAtHome = () => { return }

    const dateSearchbar =
        (<>
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
                <button name="filterbutton" className="searchbutton" type="submit"> Filter </button>
            </form>
        </>)
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
                    {date.lastDone && <p className="lastdone"> The last time you did this was {date.newDoneDate } </p>}
                    <form className="doneform" onSubmit={(event) => {updateDoneDate(event)}} >
                        <label name="dateDone"> I did this on
                            <input type="date" onChange={(e)=>{setUpdatedDoneDate(e.target.value)}} /> 
                        </label> 
                        <button type="submit" onClick={()=>{setDatetoUpdate(date.dateId)}}> Save </button> 
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
        {searchResults.length === 0 && !selectedDate && <div className="dateListArea"> {allDatesList} </div>}
    </>)
}

export default DateList; 
