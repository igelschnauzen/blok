import {CSSProperties, FC, useEffect, useRef, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Sidebar} from "./Sidebar/Sidebar";
import send from '../../assets/send.svg'
import {Message} from "./Message";
import {socket} from "../../socket";
import {useCreateMessageMutation} from "../../API/messageApi";

export const Chat: FC = () => {
    const {
        register,
        handleSubmit,
        watch,
    } = useForm<MessageInput>()

    const [newChat, setNewChat] = useState(false)
    const [activeChat, setActiveChat] = useState<{ id: string, index: number, name: string, userId: string }>()
    const [messageLength, setMessageLength] = useState('')
    const selection = useRef(false)
    const [messagesData, setMessagesData] = useState<Message[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const [createMessage] = useCreateMessageMutation()

    useEffect(() => {
        const onMouseDown = () => {
            setTimeout(() => {
                if (window.getSelection().type === 'Range') {
                    selection.current = true
                }
            }, 100)
        }
        const onClick = () => {
            if (window.getSelection().type !== 'Range') {
                selection.current = false
                inputRef.current.focus()
            }
        }

        window.addEventListener("mousedown", onMouseDown)
        window.addEventListener("click", onClick)

        return () => {
            window.removeEventListener("mousedown", onMouseDown)
            window.removeEventListener("click", onClick)
        }
    }, [])

    const onConnect = () => {
        socket.emit('addNewUser', JSON.parse(localStorage.getItem('user'))._id)
    }

    useEffect(() => {
        socket.on('getOnlineUsers', (data) => {
            console.log('online users', data)
        })
    }, [socket]);

    useEffect(() => {
        const onGetMessage = (message) => {
            const properMessage: Message = {senderId: message.senderId, text: message.text, isHeadMessage: message.senderId !== messagesData[messagesData.length - 1]?.senderId}
            setMessagesData(prevState => [...prevState, properMessage])
        }

        socket.on('getMessage', onGetMessage)

        return () => {
            socket.off('getMessage', onGetMessage)
        }
    }, []);

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
        socket.emit('sendMessage', {
            text: data.message,
            recipientId: activeChat?.userId,
            senderId: JSON.parse(localStorage.getItem('user'))._id,
            chatId: activeChat?.id
        })
        const createMessageData = {
            chatId: activeChat?.id,
            senderId: JSON.parse(localStorage.getItem('user'))._id,
            text: data.message
        }
        const uiMessageData = {
            senderId: JSON.parse(localStorage.getItem('user'))._id,
            text: data.message,
            isHeadMessage: JSON.parse(localStorage.getItem('user'))._id !== messagesData[messagesData.length - 1]?.senderId
        }
        setMessagesData(prevState => [...prevState, uiMessageData])
        inputRef.current.value = ''
        await createMessage(createMessageData)
    }

    watch(data => setMessageLength(data.message))

    return <div className={'chat-page'}>
        {
            localStorage.getItem('user') &&
            <Sidebar inputRef={inputRef} newChat={newChat} setNewChat={setNewChat} activeChat={activeChat}
                     setActiveChat={setActiveChat} onConnect={onConnect} setMessagesData={setMessagesData}/>
        }

        {
            activeChat ? <div className={'chat-block'}>
                <div className={'messages-block'}>
                    {
                        messagesData?.map((message, i) => {
                            return <Message key={i} senderId={message.senderId} text={message.text}
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