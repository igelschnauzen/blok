import {FC, useRef, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Sidebar} from "./Sidebar/Sidebar";
import './Chat.scss'

export const Chat: FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<MessageInput>()

    const [newChat, setNewChat] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const {ref, ...restRegister} = register('message', {
        onBlur: ({target}) => {
            if (!newChat) {
                target.focus()
            }
        }
    })

    const onSubmit: SubmitHandler<MessageInput> = async (data) => {
        console.log(data)
    }

    return <div className={'chat'}>
        {localStorage.getItem('user') && <Sidebar inputRef={inputRef} newChat={newChat} setNewChat={setNewChat}/>}
        <div className={'chat-block'}>
            <div className={'messages-block'}></div>
            <div className={'chat-form'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input autoFocus={true}
                           className={errors.message && 'error-input'} {...restRegister} name='message' ref={(e) => {
                        ref(e)
                        inputRef.current = e
                    }}/>
                    <button>Send</button>
                </form>
            </div>
        </div>
    </div>
}