import './App.css'
import {Outlet, useNavigate, useLocation} from "react-router-dom";
import {FC, useEffect, useState} from "react"
import signOut from './assets/sign-out.svg'
import menu from './assets/menu.svg'
import logo from './assets/logo.svg'
import {Box, Drawer, List, ListItem, ListItemText} from "@mui/material";

const App:FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!localStorage.getItem('user') && location.pathname === '/') {
            navigate('login')
        }
    })

    return <>
        <Header/>
        <div className={'content'}>
            <main>
                <Outlet/>
            </main>
        </div>
    </>
}

const Header: FC = () => {
    const [open, setOpen] = useState(false)
    let DrawerList
    if (localStorage.getItem('user')) {
        DrawerList = (
            <Box>
                <Box sx={{padding: '16px'}}>
                    <h1>{JSON.parse(localStorage.getItem('user')).name}</h1>
                    <h2>id: {JSON.parse(localStorage.getItem('user'))._id}</h2>
                </Box>
                <Box sx={{width: 'auto', cursor: 'pointer', '&:hover': {bgcolor: 'rgba(48, 50, 49)',},}} role="presentation"
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
    }

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
