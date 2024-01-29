import React, { useState, useContext } from 'react'
import { tokenContext, urlContext, userContext } from './context'
import ContributeNew from './contributenew'
import ContributeDelete from './contributedelete'
import '../styles/contribute.css'


function Contribute({ dateTypes, setDateType, cities, setCities, allDates, setAllDates, dateExamples, setDateExamples }) {

    const apiURL = useContext(urlContext)
    const userInfo = useContext(userContext)
    const myCity = userInfo.city
    const myToken = useContext(tokenContext)
    const [displayedForm, setDisplayedForm] = useState(null)
    const [message, setMessage] = useState("")

    const options =
        (<div className="contributions">
            <div className="optionsArea">
                <div className="options">
                    <h2> Add more date ideas! </h2>
                    <button className="contributeButton" onClick={() => { setDisplayedForm("dateListForm") }}> Add a date idea </button>
                    <button className="contributeButton" onClick={() => { setDisplayedForm("dateExampleForm") }}> Add a date example </button>
                    <button className="contributeButton" onClick={() => { setDisplayedForm("cityForm") }}> Add a city </button>
                </div>
                {/* <div className="options">
                    <h2> Edit something </h2>
                    <button onClick={() => { setDisplayedForm("editDateListForm") }}> Edit a date idea </button>
                    <button onClick={() => { setDisplayedForm("editDateExampleForm") }}> Edit a date example </button>
                    <button onClick={() => { setDisplayedForm("editCityForm") }}> Edit a city </button>
                </div> */}
                <div className="options">
                    <h2> Delete something </h2>
                    <button className="contributeButton" onClick={() => { setDisplayedForm("deleteDateListForm") }}> Delete a date idea </button>
                    <button className="contributeButton" onClick={() => { setDisplayedForm("deleteDateExampleForm") }}> Delete a date example </button>
                    <button className="contributeButton" onClick={() => { setDisplayedForm("deleteCityForm") }}> Delete a city </button>
                </div>
            </div>
            <div className="forms">
                <ContributeNew allDates={allDates} cities={cities} message={message} setMessage={setMessage} displayedForm={displayedForm} />
                {/* <ContributeEdit allDates={allDates} dateExamples={dateExamples} cities={cities} message={message} setMessage={setMessage} displayedForm={displayedForm}/>  */}
                <ContributeDelete allDates={allDates} dateExamples={dateExamples} cities={cities} message={message} setMessage={setMessage} displayedForm={displayedForm} />
                {message && <p> {message} </p>}
            </div>
        </div>)


    return (
        <div className="contribute">
            {!myToken && <h2> Please log in to contribute! </h2>}
            {myToken && options}
        </div>
    )
}

export default Contribute; 