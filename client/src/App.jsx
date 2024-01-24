import { useState, useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/navigation.jsx'
import Account from './components/account.jsx'
import DateList from './components/homepage.jsx'
import Contribute from './components/contribute.jsx'
import Example from './components/examplepage.jsx'
import Fetching from './fetching.js'
import { nameContext, urlContext } from './components/context.jsx'
import './App.css'
import Cities from './components/cities.jsx'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [token, setToken] = useState(null)
  const [allDates, setAllDates] = useState([])
  const [cities, setCities] = useState([])
  const [dateTypes, setDateTypes] = useState([])
  const [dateExamples, setDateExamples] = useState([])
  const myName = useContext(nameContext)
  const APIurl = useContext(urlContext)

  return (
    <>
    <Fetching setCities={setCities} cities={setCities} dateTypes={dateTypes} setDateTypes={setDateTypes} allDates={allDates} setAllDates={setAllDates} dateExamples={dateExamples} setDateExamples={setDateExamples} selectedDate={selectedDate} setSelectedDat={setSelectedDate} />
      <div className="pageTop" myName={myName}>
        <h1> Let's Plan a Date! </h1>
        
      </div>
      <div className="App" myName={myName}>
          <Navigation /> 
          <Routes> 
            <Route path="/" 
            element={<DateList allDates={allDates} setAlLDates={setAllDates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} dateExamples={dateExamples} setDateExamples={setDateExamples} token={token} dateTypes={dateTypes} cities={cities}  /> } 
            />
            <Route path="/cities" element={<Cities token={token} cities={cities} dateTypes={dateTypes} />} /> 
            <Route path ="/account" element={<Account token={token} setToken={setToken} cities={cities}/>}/>
            <Route path="/contribute" element={<Contribute token={token} allDates={allDates} cities={cities} setCities={setCities} dateTypes={dateTypes} setDateTypes={setDateTypes} dateExamples={dateExamples} setDateExamples={setDateExamples} />}/>
          </Routes>
      </div>
    </>
  )
}

export default App

