import { useFindUserQuery } from "../../../API/loginApi"
import { Dispatch, FC, SetStateAction } from "react"
import { useLazyGetMessagesQuery } from "../../../API/messageApi"

interface ChatSelectorComponent {
    userId: string
    chatId: number
    index: number
    setActiveChat: Dispatch<SetStateAction<Chat>>
    activeChat: Chat
    onConnect: () => void
    setMessagesData: Dispatch<SetStateAction<Message[]>>
}

export const ChatSelector: FC<ChatSelectorComponent> = (props) => {
    const { data: user, isFetching } = useFindUserQuery(props.userId)
    const [getMessages] = useLazyGetMessagesQuery()

    const getIsActiveChat = (): string => {
        if (props.index === props.activeChat?.index) {
            return "active-chat-selector"
        } else {
            return "chat-selector"
        }
    }

    if (isFetching) {
        return <></>
    }

    return (
        <div
            className={getIsActiveChat()}
            onClick={async () => {
                props.onConnect()
                props.setActiveChat({ id: props.chatId, index: props.index, name: user.name, userId: props.userId })
                const mData = await getMessages(props.chatId)
                const initialMessagesData = mData.data.map((message: Message, i: number) => {
                    return {
                        senderId: message.senderId,
                        text: message.text,
                        isHeadMessage: message.senderId !== mData.data[i - 1]?.senderId,
                        createdAt: message.createdAt,
                    }
                })
                props.setMessagesData(initialMessagesData)
            }}
        >
            {user.name}
        </div>
    )
}
