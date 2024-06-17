import {useFindUserQuery} from "../../../API/loginApi";
import {Dispatch, FC, SetStateAction} from "react";

export const ChatSelector:FC = (props:{id: string, index: number, setActiveChat: Dispatch<SetStateAction<{id: number, name: string}>>, activeChatId: number}) => {
    const {data: user, isFetching} = useFindUserQuery(props.id)
    const getIsActiveChat = ():string => {
        if (props.index === props.activeChatId) {
            return 'active-chat-selector'
        } else {
            return 'chat-selector'
        }
    }

    if (isFetching) {
        return <></>
    }

    return <div className={getIsActiveChat()} onClick={() => props.setActiveChat({id: props.index, name: user.name})}>{user.name}</div>
}