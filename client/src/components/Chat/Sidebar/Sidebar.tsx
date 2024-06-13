import './Sidebar.scss'
import {useCreateChatMutation, useFindUserChatsQuery} from "../../../API/chatApi";
import {SubmitHandler, useForm} from "react-hook-form";
import {FC, useState} from "react";
import {ChatSelector} from "./ChatSelector";

export const Sidebar:FC = () => {
    const {
        register,
        handleSubmit,
    } = useForm<NewChatInput>()
    const [createNewChat] = useCreateChatMutation()
    const {data: data, refetch: refetchUserChats} = useFindUserChatsQuery(JSON.parse(localStorage.getItem('user'))._id)
    const chats: UserChat[] = data
    const [newChat, setNewChat] = useState(false)

    const onSubmit: SubmitHandler<NewChatInput> = async (formData) => {
        const newChatData = {firstId: JSON.parse(localStorage.getItem('user'))._id, secondId: formData.newChat}
        setNewChat(false)
        await createNewChat(newChatData)
        await refetchUserChats()
    }

    return <aside className={'sidebar'}>
        {chats?.map((c, i) => {
            return <ChatSelector key={i} id={(c.members[0] !== JSON.parse(localStorage.getItem('user'))._id) ? c.members[0] : c.members[1]}/>
        })}
        <div className={'start-new-dialog-block'}>
            <div onClick={() => {
                setNewChat(prevState => !prevState)
            }}>
                Start new dialog
            </div>
            {
                newChat && <form onSubmit={handleSubmit(onSubmit)}>
                    <input placeholder={'write id'} {...register('newChat', {required: true})}/>
                </form>
            }
        </div>
    </aside>;
}
