import './App.css'
import {Link, Outlet} from "react-router-dom";
import logo from '../src/assets/logo.svg'
import {useForm, SubmitHandler} from "react-hook-form"
import {useState} from "react";
import {useRegisterUserMutation} from "./API/loginAPI";

type Inputs = {
    username: string
    password: string
    confirmPassword: string
}

function Header() {
    return <header className={'header'}></header>;
}

export function Login() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async ({username, password}) => {
        console.log(username, password)
    }

    return <div className={'login-page'}>
        <div className={'login-block'}>
            <img src={logo} alt={'logo'}/>
            <h1>Sign in to Blok</h1>
            {/*todo password or username error from server*/}
            <div className={'form-block'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <span>Username</span>
                        <input
                            className={errors.password && 'error-input'} {...register('username', {required: true})}/>
                        {errors.username && <span className={'error-text'}>This field is required</span>}
                    </div>
                    <div>
                        <span>Password</span>
                        <input
                            className={errors.password && 'error-input'} {...register('password', {required: true})}/>
                        {errors.password && <span className={'error-text'}>This field is required</span>}
                    </div>
                    <button>Sign in</button>
                    <span>Not registered yet? <Link to={'/registration'}>Create an account</Link></span>
                </form>
            </div>
        </div>
    </div>
}

export function Registration() {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Inputs>()
    const [usernameLengthError, setUsernameLengthError] = useState('')
    const [passwordLengthError, setPasswordLengthError] = useState('')
    const [passwordConfirmError, setPasswordConfirmError] = useState('')
    const registerUser = useRegisterUserMutation()

    const onSubmit: SubmitHandler<Inputs> = async ({username, password}) => {
        const registrationData = {name: username, password: password}
        const response = await registerUser(registrationData)
        console.log(response)
    }

    watch(data => {
        if (data.username.length < 2) {
            setUsernameLengthError('Minimum length is 2')
        } else if (data.username.length > 30) {
            setUsernameLengthError('Maximum length is 30')
        } else {
            setUsernameLengthError('')
        }

        if (data.password.length < 8 && data.password.length > 0) {
            setPasswordLengthError('Minimum length is 8')
        } else if (data.password.length > 1024) {
            setPasswordLengthError('Maximum length is 1024')
        } else {
            setPasswordLengthError('')
        }

        if (data.password !== data.confirmPassword) {
            setPasswordConfirmError('Password mismatch')
        } else {
            setPasswordConfirmError('')
        }
    })


    return <div className={'login-page'}>
        <div className={'login-block'}>
            <img src={logo} alt={'logo'}/>
            <h1>Sign up to Blok</h1>
            <div className={'form-block'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <span>Create username</span>
                        <input
                            className={(errors.username || usernameLengthError) && 'error-input'} {...register('username', {required: true})}/>
                        {
                            errors.username &&
                            <span className={'error-text'}>This field is required</span>
                            || usernameLengthError &&
                            <span className={'error-text'}>{usernameLengthError}</span>
                        }
                    </div>
                    <div>
                        <span>Create password</span>
                        <input
                            className={(errors.password || passwordLengthError) && 'error-input'} {...register('password', {required: true})}/>
                        {
                            errors.password &&
                            <span className={'error-text'}>This field is required</span>
                            || passwordLengthError &&
                            <span className={'error-text'}>{passwordLengthError}</span>
                        }
                    </div>
                    <div>
                        <span>Confirm password</span>
                        <input
                            className={(errors.confirmPassword || passwordConfirmError) && 'error-input'} {...register('confirmPassword', {required: true})}/>
                        {
                            errors.password &&
                            <span className={'error-text'}>This field is required</span>
                            || passwordConfirmError &&
                            <span className={'error-text'}>{passwordConfirmError}</span>
                        }
                    </div>
                    <button>Sign up</button>
                </form>
            </div>
        </div>
    </div>
}

function App() {

    return <>
        <Header/>
        <div className={'content'}>
            <main>
                <Outlet/>
            </main>
        </div>
    </>
}

export default App
