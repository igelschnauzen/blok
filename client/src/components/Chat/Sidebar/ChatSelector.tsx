import './Sidebar.scss'
import {useFindUserQuery} from "../../../API/loginApi";
import {FC} from "react";

export const ChatSelector:FC = (props:{id: string}) => {
    const {data: user, isFetching} = useFindUserQuery(props.id)

    if (isFetching) {
        return <></>
    }

    return <div className={'chat-selector'}>{user.name}</div>
}