import './App.css'
import {Outlet, useNavigate, useLocation} from "react-router-dom";
import {FC, useEffect, useState} from "react"
import {Sidebar} from "./components/Chat/Sidebar/Sidebar";
import signOut from './assets/sign-out.svg'
import menu from './assets/menu.svg'
import logo from './assets/logo.svg'
import {Box, Drawer, List, ListItem, ListItemText} from "@mui/material";

const App = () => {
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if (!localStorage.getItem('user') && location.pathname === '/') {
            navigate('login')
        }
    })
    const fn = () => {
        if (localStorage.getItem('user')) {
            return {left: '400px'}
        } else {
            return {position: 'relative'}
        }
    }

    return <>
        <Header/>
        {localStorage.getItem('user') && <Sidebar/>}
        <div className={'content'} style={fn()}>
            <main>
                <Outlet/>
            </main>
        </div>
    </>
}

const Header: FC = () => {
    const [open, setOpen] = useState(false)
    const DrawerList = (
        <Box>
            <Box sx={{padding: '16px'}}>
                <h1>{localStorage.getItem('user')}</h1>
            </Box>
            <Box sx={{width: 250, cursor: 'pointer', '&:hover': {bgcolor: 'rgba(48, 50, 49)',},}} role="presentation"
                 onClick={() => setOpen(false)}>
                <List>
                    <ListItem onClick={() => {
                        localStorage.clear()
                        location.reload()
                    }}>
                        <img src={signOut} alt={''} style={{marginRight: '10px'}}/>
                        <ListItemText primary={'Sign out'}/>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );

    return <header className={'header'}>
        {localStorage.getItem('user') &&
            <>
                <button onClick={() => {
                    setOpen(prevState => !prevState)
                }} className={'menu-button'}>
                    <img src={menu} alt={''}/>
                </button>
                <img src={logo} alt={''} style={{width: '40px'}}/>
                <Drawer open={open} sx={{
                    '& .MuiDrawer-paper': {
                        bgcolor: 'rgba(20, 20, 20)',
                        color: 'rgba(243, 243, 243)',
                    },
                    '& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop': {
                        bgcolor: 'rgba(0, 0, 0, 0)',
                    },
                }} onClose={() => setOpen(false)}>
                    {DrawerList}
                </Drawer></>}
    </header>;
}

export default App
