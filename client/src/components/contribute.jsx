import React, { useEffect, useState, useContext } from 'react'
import { urlContext, cityContext} from './context'
import ContributeNew from './contributenew'
import ContributeEdit from './contributeedit'
import ContributeDelete from './contributedelete'
import '../styles/contribute.css'


function Contribute({dateTypes, setDateType, cities, setCities, allDates, setAllDates, dateExamples, setDateExamples}) {
    
    const apiURL = useContext(urlContext)
    const myCity=useContext(cityContext)
    const [displayedForm, setDisplayedForm] = useState(null)
    const [message, setMessage] = useState("")

    return (
        <div className="contributions">
            {console.log(dateExamples)}
            <div className="options">
                <div>
                    <h2> Add more date ideas! </h2>
                    <button onClick={() => { setDisplayedForm("dateListForm") }}> Add a date idea </button>
                    <button onClick={() => { setDisplayedForm("dateExampleForm") }}> Add a date example </button>
                    <button onClick={() => { setDisplayedForm("cityForm") }}> Add a city </button>
                </div>
                {/* <div>
                    <h2> Edit something </h2>
                    <button onClick={() => { setDisplayedForm("editDateListForm") }}> Edit a date idea </button>
                    <button onClick={() => { setDisplayedForm("editDateExampleForm") }}> Edit a date example </button>
                    <button onClick={() => { setDisplayedForm("editCityForm") }}> Edit a city </button>
                </div> */}
                <div>
                    <h2> Delete something </h2>
                    <button onClick={() => { setDisplayedForm("deleteDateListForm") }}> Delete a date idea </button>
                    <button onClick={() => { setDisplayedForm("deleteDateExampleForm") }}> Delete a date example </button>
                    <button onClick={() => { setDisplayedForm ("deleteCityForm") }}> Delete a city </button>
                </div>
            </div>
            <div className="forms">
                <ContributeNew allDates={allDates} cities={cities} message={message} setMessage={setMessage} displayedForm={displayedForm}/> 
                {/* <ContributeEdit allDates={allDates} dateExamples={dateExamples} cities={cities} message={message} setMessage={setMessage} displayedForm={displayedForm}/>  */}
                <ContributeDelete allDates={allDates} dateExamples={dateExamples} cities={cities} message={message} setMessage={setMessage} displayedForm={displayedForm}/> 
                {message && <p> {message} </p>}
            </div>
        </div>
    )
}

export default Contribute; 