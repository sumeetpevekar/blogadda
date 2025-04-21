import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './store/auth.jsx'
import { ToastContainer } from 'react-toastify';
import {GoogleOAuthProvider} from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='713275010367-4juvroo63utdj4fbucs19iioe4mjr4s2.apps.googleusercontent.com'>
    <AuthProvider>
      <App></App>
      <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      bodyClassName="toastBody"
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
