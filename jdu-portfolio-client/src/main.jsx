import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './services/api.js'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/index.js'
import './index.scss'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
