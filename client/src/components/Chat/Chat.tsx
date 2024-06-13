import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Sidebar} from "./Sidebar/Sidebar";
import './Chat.scss'

export const Chat: FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<MessageInput>()

    const onSubmit: SubmitHandler<MessageInput> = async (data) => {
        console.log(data)
    }

    return <div className={'chat'}>
        {localStorage.getItem('user') && <Sidebar/>}
        <div className={'chat-block'}>
            <div className={'messages-block'}></div>
            <div className={'chat-form'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input autoFocus={true} className={(errors.message) && 'error-input'}{...register('message', {onBlur: ({ target }) => target.focus()})}/>
                    <button>Send</button>
                </form>
            </div>
        </div>
    </div>
}