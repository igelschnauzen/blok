import './App.css'
import {Outlet, useNavigate, useLocation} from "react-router-dom";
import {FC, useEffect, useState} from "react"

const App = () => {
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if (!localStorage.getItem('user') && location.pathname === '/') {
            navigate('login')
        }
    })

    return <>
        <Header/>
        {localStorage.getItem('user') && <Sidebar/>}
        <div className={'content'}>
            <main>
                <Outlet/>
            </main>
        </div>
    </>
}

const Header: FC = () => {
    return <header className={'header'}>
        {/*{localStorage.getItem('user') &&}*/}
        <button onClick={() => {
            localStorage.clear()
            window.location.reload()
        }}>sign out
        </button>
    </header>;
}

export default App
