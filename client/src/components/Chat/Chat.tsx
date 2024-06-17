import {CSSProperties, FC, useRef, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Sidebar} from "./Sidebar/Sidebar";
import send from '../../assets/send.svg'

export const Chat: FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<MessageInput>()

    const [newChat, setNewChat] = useState(false)
    const [activeChat, setActiveChat] = useState<{ id: number, name: string }>()
    const [messageLength, setMessageLength] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const {ref, ...restRegister} = register('message', {
        onBlur: ({target}) => {
            if (!newChat) {
                target.focus()
            }
        }
    })

    const getStyle = (): CSSProperties => {
        if (messageLength) {
            return {transform: 'scale(1)'}
        } else {
            return {transform: 'scale(0)'}
        }

    }

    const onSubmit: SubmitHandler<MessageInput> = async (data) => {
        console.log(data)
    }

    watch(data => setMessageLength(data.message)
    )

    return <div className={'chat-page'}>
        {localStorage.getItem('user') &&
            <Sidebar inputRef={inputRef} newChat={newChat} setNewChat={setNewChat} activeChat={activeChat}
                     setActiveChat={setActiveChat}/>}
        <div className={'chat-block'}>
            <div className={'messages-block'}></div>
            {activeChat ? <div className={'chat-form'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input autoFocus={true} placeholder={`Message ${activeChat?.name}`}
                           className={errors.message && 'error-input'} {...restRegister} name='message' ref={(e) => {
                        ref(e)
                        inputRef.current = e
                    }}/>
                    <button><img style={getStyle()} src={send} alt={'send'}/></button>
                </form>
            </div> : <div className={'select-chat'}>Select chat or create a new one</div>}

        </div>
    </div>
}