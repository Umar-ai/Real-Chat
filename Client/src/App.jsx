import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Contextprovider from './Context/Contextprovider'

function App() {
  return (
    <>
    <Contextprovider>

      <Header />
      <Outlet />
      <Footer />
    </Contextprovider>
    </>
  )
}

export default App
