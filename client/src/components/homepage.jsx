import React, { useEffect, useContext, useState } from 'react'
import { NameContext } from './context'
import '../styles/homepage.css'

function DateList() {
    const APIurl = 'http://localhost:8080/api'
    const [allDates, setAllDates] = useState([]);
    const [dateTypes, setDateTypes] = useState([]);
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
    const datesFilterType = () => { return }

    const datesFilterPrice = () => { return }

    const datesFilterDone = () => { return }

    const datesFilterAtHome = () => { return }

    const dateSearchbar = 
            (<>
                <form name="typeFilter" method="post" className="searchForm" onSubmit={datesFilterType}>
                    <label> Filter by type <br/> 
                        <select>
                            {dateTypes.map((type) => {
                                return (
                                    <option> {type.type} </option>
                                )
                            })}
                        </select>
                    </label>
                    <button name="filterbutton" className="searchbutton"> Filter </button>
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
                    {!date.atHome && <button className="dateButton" > In Your City </button>}
                </div>
            )
        })

    return (<>
        {allDates.length === 0 && <p> No dates available! Log in to add ideas </p>}
        <div className="dateSearchBar"> {dateSearchbar} </div>
        {searchResults.length > 0 && <div className="dateListArea"> {searchResults} </div>}
        {searchResults.length === 0 && <div className="dateListArea"> {allDatesList} </div>}
    </>)
}

export default DateList; 
