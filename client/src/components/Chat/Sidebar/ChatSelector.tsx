import './Sidebar.scss'
import {useFindUserQuery} from "../../../API/loginApi";
import {Dispatch, FC, SetStateAction, useState} from "react";

export const ChatSelector:FC = (props:{id: string, index: number, setActiveChat: Dispatch<SetStateAction<number>>, activeChat: number}) => {
    const {data: user, isFetching} = useFindUserQuery(props.id)
    const getIsActiveChat = ():string => {
        if (props.index === props.activeChat) {
            return 'active-chat-selector'
        } else {
            return 'chat-selector'
        }
    }

    if (isFetching) {
        return <></>
    }

    return <div className={getIsActiveChat()} onClick={() => props.setActiveChat(props.index)}>{user.name}</div>
}