import { CSSProperties, FC, useEffect, useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Sidebar } from "./Sidebar/Sidebar"
import send from "../../assets/send.svg"
import { Message } from "./Message"
import { socket } from "../../socket"
import { useCreateMessageMutation } from "../../API/messageApi"

export const Chat: FC = () => {
    const { register, handleSubmit, watch } = useForm<MessageInput>()

    const [newChat, setNewChat] = useState(false)
    const [activeChat, setActiveChat] = useState<Chat>({ id: 0, index: 0, name: "", userId: "" })
    const [messageLength, setMessageLength] = useState("")
    const [doScroll, setDoScroll] = useState(false)
    const selection = useRef(false)
    const [messagesData, setMessagesData] = useState<Message[]>([])
    const inputRef = useRef<HTMLInputElement | null>(null)
    const messagesRef = useRef<HTMLDivElement>(null)
    const [createMessage] = useCreateMessageMutation()

    const onMouseDown = () => {
        setTimeout(() => {
            if (window.getSelection()!.type === "Range" && !newChat) {
                selection.current = true
            }
        }, 100)
    }
    const onClick = () => {
        if (window.getSelection()!.type !== "Range" && !newChat) {
            selection.current = false
            inputRef.current?.focus()
        }
    }

    const onConnect = () => {
        socket.emit("addNewUser", JSON.parse(localStorage.getItem("user")!)._id)
    }

    useEffect(() => {
        if (doScroll) {
            messagesRef.current?.scroll({ left: 0, top: messagesRef.current.scrollHeight, behavior: "smooth" })
        }
    }, [messagesData])

    useEffect(() => {
        socket.on("getOnlineUsers", (data) => {
            console.log("online users", data)
        })
    }, [socket])

    useEffect(() => {
        const onGetMessage = (message: Message) => {
            const properMessage: Message = { senderId: message.senderId, text: message.text, isHeadMessage: message.senderId !== messagesData[messagesData.length - 1]?.senderId, createdAt: "" } //created at?
            setMessagesData((prevState) => [...prevState, properMessage])
        }

        socket.on("getMessage", onGetMessage)

        return () => {
            socket.off("getMessage", onGetMessage)
        }
    }, [])

    const { ref, ...restRegister } = register("message", {
        required: true,
        onBlur: ({ target }) => {
            setTimeout(() => {
                if (!newChat && !selection.current) {
                    target.focus()
                }
            }, 300)
        },
    })

    const getStyle = (): CSSProperties => {
        if (messageLength) {
            return { transform: "scale(1)" }
        } else {
            return { transform: "scale(0)" }
        }
    }

    const onSubmit: SubmitHandler<MessageInput> = async (data) => {
        socket.emit("sendMessage", {
            text: data.message,
            recipientId: activeChat?.userId,
            senderId: JSON.parse(localStorage.getItem("user")!)._id,
            chatId: activeChat?.id,
        })
        const createMessageData = {
            chatId: activeChat?.id,
            senderId: JSON.parse(localStorage.getItem("user")!)._id,
            text: data.message,
        }
        const uiMessageData: Message = {
            senderId: JSON.parse(localStorage.getItem("user")!)._id,
            text: data.message,
            isHeadMessage: JSON.parse(localStorage.getItem("user")!)._id !== messagesData[messagesData.length - 1]?.senderId,
            createdAt: "", //created at?
        }
        setMessagesData((prevState) => [...prevState, uiMessageData])
        inputRef.current!.value = ""
        await createMessage(createMessageData)
        if (messagesRef.current!.scrollHeight - messagesRef.current!.scrollTop - messagesRef.current!.clientHeight > 100) {
            setDoScroll(false)
        } else {
            setDoScroll(true)
        }
    }

    watch((data) => setMessageLength(data.message!))

    return (
        <div className={"chat-page"}>
            {localStorage.getItem("user") && (
                <Sidebar inputRef={inputRef} newChat={newChat} setNewChat={setNewChat} activeChat={activeChat} setActiveChat={setActiveChat} onConnect={onConnect} setMessagesData={setMessagesData} onMouseDown={onMouseDown} onClick={onClick} />
            )}

            {activeChat ? (
                <div className={"chat-block"}>
                    <div className={"messages-block"} ref={messagesRef}>
                        {messagesData?.map((message, i) => {
                            return <Message key={i} senderId={message.senderId} text={message.text} isHeadMessage={message.isHeadMessage} createdAt={message.createdAt} />
                        })}
                    </div>
                    <div className={"chat-form"}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                autoFocus={true}
                                placeholder={`Message ${activeChat?.name}`}
                                {...restRegister}
                                name="message"
                                ref={(e) => {
                                    ref(e)
                                    inputRef.current = e
                                }}
                            />
                            <button>
                                <img style={getStyle()} src={send} alt={"send"} />
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className={"chat-block"}>
                    <div className={"select-chat"}>Select chat or create a new one</div>
                </div>
            )}
        </div>
    )
}
