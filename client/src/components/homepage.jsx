import React, { useEffect, useContext, useState } from 'react'
import { nameContext, urlContext, cityContext } from './context'
import Example from './examplepage'
import '../styles/homepage.css'

function DateList({selectedDate, setSelectedDate}) {
    const APIurl =useContext(urlContext) 
    const myCity = useContext(cityContext)
    const [allDates, setAllDates] = useState([]);
    const [dateTypes, setDateTypes] = useState([]);
    const [searchTerm, setSearchTerm] = useState([])
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        async function getAllDates() {
            try {
                const response = await fetch(`${APIurl}/dateList`)
                const data = await response.json();
                setAllDates(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getAllDates();
    }, [])

    useEffect(() => {
        async function getDateTypes() {
            try {
                const response = await fetch(`${APIurl}/dateList/types`)
                const data = await response.json();
                setDateTypes(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getDateTypes();
    }, [])

    //TODO
    const datesFilterType = (e)=> { 
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const typeSearchResults = allDates.filter((date) => {
            return date.type.toLowerCase().includes(searchTerm)
        })
        setSearchResults(typeSearchResults);
        return searchResults;
    }

    const datesFilterPrice = () => { return }

    const datesFilterDone = () => { return }

    const datesFilterAtHome = () => { return }

    const dateSearchbar = 
            (<>
                <form method="post" className="searchForm" onSubmit={datesFilterType}>
                    <label> Filter by type <br/> 
                        <select name="typeFilter" value={searchTerm} defaultValue={""}>
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

    const allDatesList =
        allDates.map((date) => {
            return (
                <div className="date card">
                    <h3 className="title"> {date.name} </h3>
                    <p className="datetype"> {date.type} </p>
                    <img className="dateimage" src={date.imgUrl} />
                    <p className="datedescription"> {date.description} </p>
                    <p className="price"> {date.price} </p>
                    <p className="lastdone"> {date.lastdone} </p>
                    {!date.atHome && myCity && <button className="dateButton" id={date.dateId} onClick={()=> {setSelectedDate(date.dateId); setSearchTerm("")}}> In Your City </button>}
                    {!date.atHome && !myCity && <button className="dateButton" id={date.dateId} onClick={()=> {setSelectedDate(date.dateId); setSearchTerm("")}}> See Examples </button>}
                </div>
            )
        })

    return (<>
        <div className="dateSearchBar"> {dateSearchbar} </div>
        {allDates.length === 0 && <p> No dates available! Log in to add ideas </p>}
        {selectedDate && <Example selectedDate={selectedDate} setSelectedDate={setSelectedDate} /> }
        {searchResults.length > 0 && !selectedDate && <div className="dateListArea"> {searchResults} </div>}
        {searchResults.length === 0 && !selectedDate && <div className="dateListArea"> {allDatesList} </div>}
    </>)
}

export default DateList; 
