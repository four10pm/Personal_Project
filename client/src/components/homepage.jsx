import React, { useContext, useState } from 'react'
import { tokenContext, userContext, favoritesContext, selectedDateContext, searchTermContext } from './context'
import Example from './examplepage'
import '../styles/homepage.css'
import { sanitize, addFavorites, deleteFavorites } from '../fetching'
import DateList from './datelist'


function HomePage({ dateTypes, allDates, selectedDate, setSelectedDate }) {
    const myToken = useContext(tokenContext)
    const userInfo = useContext(userContext)
    const favorites = useContext(favoritesContext)
    const myCity = userInfo.city
    const myName = userInfo.name
    const [searchTerm, setSearchTerm] = useState("")
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [message, setMessage] = useState("")
    const [searchMessage, setSearchMessage] = useState("")
    
    const datesFilter = (e, search) => {
        e.preventDefault()
        console.log(search)
        console.log(searchTerm)
        if (search === "type") {
            const typeSearchResults = allDates.filter((date) => {
                return date.type.toLowerCase().includes(searchTerm)
            })
            setSearchResults(typeSearchResults);
            console.log(typeSearchResults)
        }
        if (search === "done") {
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
        }
        if (search === "atHome") {
            const atHomeSearchResults = allDates.filter((date) => {
                return date.atHome.toString() === searchTerm.toString()
            })
            setSearchResults(atHomeSearchResults);
        }
        if (search === "price") {
            const priceSearchResults = allDates.filter((date) => {
                return date.price.includes(searchTerm)
            })
            setSearchResults(priceSearchResults)
        }

        return searchResults;
    }

    const dateSearchbar =
        ( 
        <div className="searchBar">
            <form method="post" className="searchForm" onSubmit={(e) => { datesFilter(e, "type")}}>
                <label> Filter by type <br />
                    <select name="typeFilter" onChange={(e) => { setSearchTerm(e.target.value)}}>
                        <option value={""}> Select </option>
                        {dateTypes.map((type) => {
                            return (
                                <option value={type.type} name="type"> {type.type} </option>
                            )
                        })}
                    </select>
                </label>
                <button className="searchButton" type="submit"> Filter </button>
            </form>
            <form method="post" className="searchForm" onSubmit={(e) => {datesFilter(e, "atHome")}}>
                <label> Filter by at home <br />
                    <select name="atHomeFilter" onChange={(e) => { setSearchTerm(e.target.value)}} >
                        <option value={""}> Select </option>
                        <option value={true}> At home dates only </option>
                        <option value={false}> Outside dates only </option>
                    </select>
                </label>
                <button className="searchButton" type="submit"> Filter </button>
            </form>
            <form method="post" className="searchForm" onSubmit={(e) => {datesFilter(e, "price")}}>
                <label> Filter by price <br />
                    <select name="priceFilter" onChange={(e) => { setSearchTerm(e.target.value)}} >
                        <option value={""}> Select </option>
                        <option value="Free"> Free dates </option>
                        <option value="$-"> $ or more </option>
                        <option value="$$-"> $$ or more </option>
                        <option value="$$$-"> $$$ or more </option>
                        <option value="$$$$+"> $$$$ or more </option>
                    </select>
                </label>
                <button className="searchButton" type="submit"> Filter </button>
            </form>
            <button className="resetButton" onClick={() => { setSearchTerm(null); setSearchResults([]); setSearch(""); setMessage("") }}> See All Date Ideas </button>
        </div>
        )

    // DECIDED NOT TO DO LAST DONE DATE 
    // const [datetoUpdate, setDatetoUpdate] = useState(null)
    // const [updatedDoneDate, setUpdatedDoneDate] = useState(null)
    // const updateDoneDate = async (event) => {
    //     event.preventDefault()
    //     console.log(datetoUpdate)
    //     console.log(updatedDoneDate)
    //     try {
    //         const response = await fetch(`${APIurl}/dateList/${datetoUpdate}`, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 lastDone: updatedDoneDate,
    //             }),
    //         })
    //         const result = await response.json
    //         setMessage("Updated!")
    //     } catch (error) {
    //         setMessage(error.message)
    //     }
    // }

{console.log(search)}
{console.log(searchTerm)}
{console.log(searchResults)}

    return (<>
    <selectedDateContext.Provider value={selectedDate}>
            {<div className="dateSearchBar"> {dateSearchbar} </div> }
            {allDates.length === 0 && <p> No dates available! Log in to add ideas </p>}
            {selectedDate && <Example selectedDate={selectedDate} setSelectedDate={setSelectedDate} />}
            {!selectedDate && !!searchResults.length && searchResults.length === 0 && <p className="searchMessage"> Sorry, your search didn't return any results! </p>}
            {!selectedDate && !searchResults.length && <DateList dates={allDates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} message={message} setMessage={setMessage}/> }
            {!!searchResults.length && <DateList dates={searchResults} selectedDate={selectedDate} setSelectedDate={setSelectedDate} message={message} setMessage={setMessage}/>}
            {message}
    </selectedDateContext.Provider>
       
    </>)
}

export default HomePage; 
