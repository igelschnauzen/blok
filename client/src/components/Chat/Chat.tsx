import {CSSProperties, FC, useEffect, useRef, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Sidebar} from "./Sidebar/Sidebar";
import send from '../../assets/send.svg'
import {Message} from "./Message";

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
    const selection = useRef(false)
    const [messagesData, setMessagesData] = useState<Message[]>([{
        userName: 'User',
        text: 'Lorem ipsum dolor sit amet',
        isHeadMessage: true
    }, {userName: 'User', text: 'Lorem ipsum dolor sit amet', isHeadMessage: false}, {
        userName: 'User',
        text: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet',
        isHeadMessage: false
    },])
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        window.addEventListener("mousedown", () => {
            setTimeout(() => {
                if (window.getSelection().type === 'Range') {
                    selection.current = true
                }
            }, 100)
        })
        window.addEventListener("click", () => {
            if (window.getSelection().type !== 'Range') {
                selection.current = false
                inputRef.current.focus()
            }
        })
    }, [])

    const {ref, ...restRegister} = register('message', {
            required: true,
            onBlur: ({target}) => {
                setTimeout(() => {
                    if (!newChat && !selection.current) {
                        target.focus()
                    }
                }, 300)
            }
        }
    )
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

    watch(data => setMessageLength(data.message))

    return <div className={'chat-page'}>
        {
            localStorage.getItem('user') &&
            <Sidebar inputRef={inputRef} newChat={newChat} setNewChat={setNewChat} activeChat={activeChat}
                     setActiveChat={setActiveChat}/>
        }

        {
            activeChat ? <div className={'chat-block'}>
                <div className={'messages-block'}>
                    {
                        messagesData.map((message, i) => {
                            return <Message key={i} userName={message.userName} text={message.text}
                                            isHeadMessage={message.isHeadMessage}/>
                        })
                    }
                </div>
                <div className={'chat-form'}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input autoFocus={true} placeholder={`Message ${activeChat?.name}`}
                               {...restRegister} name='message'
                               ref={(e) => {
                                   ref(e)
                                   inputRef.current = e
                               }}/>
                        <button><img style={getStyle()} src={send} alt={'send'}/></button>
                    </form>
                </div>
            </div> : <div className={'chat-block'}>
                <div className={'select-chat'}>Select chat or create a new one</div>
            </div>
        }
    </div>
}