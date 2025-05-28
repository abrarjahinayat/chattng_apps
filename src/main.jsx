import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import firebaseConfig from './firebase.config.js'

import { Provider } from 'react-redux'
import { store } from './Redux/store.js'

console.log(store.getState())

createRoot(document.getElementById('root')).render(
    <Provider store={store}>

        <App />

    </Provider>
  ,
  
)
