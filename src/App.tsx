import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Header from './components/Header'
import Products from './components/Pages/Products'
import Cart from './components/Pages/Cart'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<div className="bg-white p-8"><h1 className="text-3xl font-bold">Welcome to Our Store</h1></div>} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
