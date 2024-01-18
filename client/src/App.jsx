import { useState, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/navigation.jsx'
import Account from './components/account.jsx'
import DateList from './components/homepage.jsx'
import Contribute from './components/contribute.jsx'
import Example from './components/examplepage.jsx'
import { nameContext } from './components/context.jsx'
import './App.css'
import Cities from './components/cities.jsx'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [token, setToken] = useState(null)
  const myName = useContext(nameContext)

  return (
    <>
      <div className="pageTop" myName={myName}>
        <h1> Let's Plan a Date! </h1>
      </div>
      <div className="App" myName={myName}>
          <Navigation /> 
          <Routes> 
            <Route path="/" 
            element={<DateList selectedDate={selectedDate} setSelectedDate={setSelectedDate} token={token} /> } 
            />
            <Route path="/cities" element={<Cities token={token} />} /> 
            <Route path ="/account" element={<Account token={token} setToken={setToken} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>}/>
            <Route path="/contribute" element={<Contribute token={token}/>}/>
          </Routes>
      </div>
    </>
  )
}

export default App

