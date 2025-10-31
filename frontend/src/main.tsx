import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Details from './pages/Details'
import Checkout from './pages/Checkout'
import Result from './pages/Result'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='experience/:id' element={<Details />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='result' element={<Result />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
