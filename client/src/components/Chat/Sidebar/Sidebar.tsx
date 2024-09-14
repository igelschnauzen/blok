import { useCreateChatMutation, useFindUserChatsQuery } from "../../../API/chatApi"
import { SubmitHandler, useForm } from "react-hook-form"
import { Dispatch, FC, RefObject, SetStateAction, useEffect, useState } from "react"
import { ChatSelector } from "./ChatSelector"

interface SidebarComponent {
    newChat: boolean
    setNewChat: Dispatch<SetStateAction<boolean>>
    inputRef: RefObject<HTMLInputElement>
    setActiveChat: Dispatch<SetStateAction<Chat>>
    activeChat: Chat
    onConnect: () => void
    setMessagesData: Dispatch<SetStateAction<Message[]>>
    onMouseDown: () => void
    onClick: () => void
}

export const Sidebar: FC<SidebarComponent> = (props) => {
    const { register, handleSubmit, watch } = useForm<NewChatInput>()
    const [createNewChat] = useCreateChatMutation()
    const { data: data, refetch: refetchUserChats } = useFindUserChatsQuery(JSON.parse(localStorage.getItem("user")!)._id)
    const chats: UserChat[] = data
    const [serverError, setServerError] = useState("")

    const addFocusEventListeners = () => {
        window.addEventListener("mousedown", props.onMouseDown)
        window.addEventListener("click", props.onClick)
    }

    const removeFocusEventListeners = () => {
        window.removeEventListener("mousedown", props.onMouseDown)
        window.removeEventListener("click", props.onClick)
    }

    const onAddNewDialogClick = () => {
        if (props.newChat) {
            addFocusEventListeners()
        } else {
            removeFocusEventListeners()
        }
        props.setNewChat((prevState) => !prevState)
        props.inputRef.current!.focus()
    }

    useEffect(() => {
        return () => {
            removeFocusEventListeners()
        }
    }, [])

    const onSubmit: SubmitHandler<NewChatInput> = async (formData) => {
        const newChatData = { firstId: JSON.parse(localStorage.getItem("user")!)._id, secondId: formData.newChat }

        const response = await createNewChat(newChatData)
        if (response.error) {
            setServerError("Wrong id!")
        } else {
            props.setNewChat(false)
            props.inputRef.current!.focus()
            await refetchUserChats()
            location.reload()
        }
    }

    watch(() => setServerError(""))

    return (
        <aside>
            {chats?.map((chat, i) => {
                return (
                    <div key={i}>
                        <ChatSelector
                            index={i}
                            setActiveChat={props.setActiveChat}
                            activeChat={props.activeChat}
                            chatId={chat._id}
                            userId={chat.members[0] !== JSON.parse(localStorage.getItem("user")!)._id ? chat.members[0] : chat.members[1]}
                            onConnect={props.onConnect}
                            setMessagesData={props.setMessagesData}
                        />
                    </div>
                )
            })}
            <div className={"start-new-dialog-block"}>
                <div onClick={onAddNewDialogClick}>Start new dialog</div>
                {props.newChat && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input className={serverError && "error-input"} placeholder={"write id"} {...register("newChat", { required: true })} />
                        {serverError && <div className={"error-text"}>{serverError}</div>}
                    </form>
                )}
            </div>
        </aside>
    )
}
