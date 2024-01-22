import React, { useState, useContext, useEffect } from "react"
import { urlContext, cityContext } from "./context";

export default function ContributeDelete({ displayedForm, allDates, cities, dateExamples, message, setMessage }) {
    return (
        <>
            {displayedForm === "deleteDateListForm" && <DeleteDateListForm allDates={allDates} message={message} setMessage={setMessage} />}
            {displayedForm === "deleteDateExampleForm" && <DeleteDateExampleForm dateExamples={dateExamples} message={message} setMessage={setMessage} />}
            {displayedForm === "deleteCityForm" && <DeleteCityForm message={message} setMessage={setMessage} cities={cities} />}
        </>
    )
}

function DeleteDateListForm({allDates, message, setMessage}) {
    const APIurl = useContext(urlContext)
    const [datetoDelete, setDatetoDelete] = useState(null)

    const deleteDateList = async (event) => {
    event.preventDefault()
    try { 
        const response = await fetch(`${APIurl}/dateList/${datetoDelete}` , {
            method: "DELETE",
        });
        setMessage("This date has been deleted!")
    } catch (error) {
        setMessage(error.message)
    }}

    return (
    <form name="deleteDateList" className="contributeform" onSubmit={deleteDateList}>
        <label> Which date would you like to delete?
        <select required name="deleteDate" onChange={(e) => { setDatetoDelete(e.target.value) }}>
                    <option value={""}> Select </option>
                    {allDates.map((date) => {
                        return (
                            <option value={date.dateId}> {date.name} </option>
                        )
                    })}
                </select>
        </label> <br/>
        <button type="submit"> Submit </button>
    </form> 
    )

}

function DeleteDateExampleForm({dateExamples, message, setMessage}) {
    const APIurl = useContext(urlContext)
    const [exampletoDelete, setExampletoDelete] = useState(null)

    const deleteDateExample = async (event) => {
    event.preventDefault()
    try { 
        const response = await fetch(`${APIurl}/dateExamples/${exampletoDelete}` , {
            method: "DELETE",
        });
        setMessage("This date has been deleted!")
    } catch (error) {
        setMessage(error.message)
    }}

    return (
        <form name="deleteDateExample" className="contributeform" onSubmit={(event) => { deleteDateExample(event) }}>
            <label> Which date would you like to delete?
                <select required name="deleteDateExample" onChange={(e) => { setExampletoDelete(e.target.value) }}>
                    <option value={""}> Select </option>
                    {console.log(dateExamples)}
                    {dateExamples.map((example) => {
                        return (
                            <option value={example.exampleId}> {example.name} </option>
                        )
                    })}
                </select>
            </label> <br />
            <button type="submit"> Submit </button>
            </form> 
    )
}

function DeleteCityForm({cities, message, setMessage}) {
    const APIurl = useContext(urlContext)
    const [citytoDelete, setCitytoDelete] = useState(null)

    const deleteCity = async (event) => {
    event.preventDefault()
    try { 
        const response = await fetch(`${APIurl}/cities/${citytoDelete}` , {
            method: "DELETE",
        });
        setMessage("This city has been deleted!")
    } catch (error) {
        setMessage(error.message)
    }}

    return (
            <form name="deleteCity" className="contributeform" onSubmit={(event)=>{deleteCity(event)}}>
                <label> Which city would you like to edit? 
                    <select required name="deleteCity" onChange={(e) => {setCitytoDelete(e.target.value)}}>
                        <option value={""}> Select </option>
                        {cities.map((city) => {
                                return (
                                    <option value={city.cityId}> {city.name}, {city.state} </option>
                                )
                            })}
                    </select>
                    </label> <br/> 
                    <button type="submit"> Submit </button>
                    </form> 
        
    )
}