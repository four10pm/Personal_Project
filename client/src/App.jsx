import { useState, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/navigation.js'
import Account from './components/account.js'
import Example from './components/examplepage.js'
import { NameContext } from './components/context.js'
import './App.css'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [token, setToken] = useState(null)
  const myName = useContext(NameContext)

  return (
    <>
      <div className="pageTop" myName={myName}>
        <h1> Let's Plan a Date! </h1>
        <h2> Hello {myName} </h2> 
      </div>
      <div className="App" myName={myName}>
          <Routes> 
            <Route path="/" 
            // element={<DateList selectedDate={selectedDate} setSelectedDate={setSelectedDate} token={token} /> } 
            />
            <Route path ="/account" element={<Account token={token} setToken={setToken} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>}/>
          </Routes>
      </div>
      <div myName={myName}> 
   
      </div> 
    </>
  )
}

export default App

