import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {store} from './store/store'
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from "react-router-dom";
import {Provider} from "react-redux";
import {Login, Registration} from "./components/LoginAndRegistration/LoginAndRegistration";
import {Chat} from "./components/Chat/Chat";
import {Users} from "./components/Users";


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route path="login" element={<Login/>}/>
        <Route path="registration" element={<Registration/>}/>
        <Route path='' element={<Chat/>}/>
        <Route path='users' element={<Users/>}/>
    </Route>))


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)