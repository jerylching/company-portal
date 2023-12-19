import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './provider/UserProvider'
import { InventoryProvider } from './provider/InventoryProvider'
import { SalesProvider } from './provider/SalesProvider'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <InventoryProvider>
          <SalesProvider>
            <App />
          </SalesProvider>
        </InventoryProvider>
      </UserProvider>
    </BrowserRouter>  
  </React.StrictMode>
);