import {useCreateChatMutation, useFindUserChatsQuery} from "../../../API/chatApi";
import {SubmitHandler, useForm} from "react-hook-form";
import {Dispatch, FC, SetStateAction, useState} from "react";
import {ChatSelector} from "./ChatSelector";

export const Sidebar: FC = (props: {
    newChat: boolean, setNewChat: Dispatch<SetStateAction<boolean>>,
    inputRef: HTMLInputElement, setActiveChat: Dispatch<SetStateAction<{ id: string, index: number, name: string }>>,
    activeChat: {id: string, index: number, name: string, userId: string}, onConnect: any, setMessagesData: any
}) => {
    const {
        register,
        handleSubmit,
        watch
    } = useForm<NewChatInput>()
    const [createNewChat] = useCreateChatMutation()
    const {data: data, refetch: refetchUserChats} = useFindUserChatsQuery(JSON.parse(localStorage.getItem('user'))._id)
    const chats: UserChat[] = data
    const [serverError, setServerError] = useState('')

    const onSubmit: SubmitHandler<NewChatInput> = async (formData) => {
        const newChatData = {firstId: JSON.parse(localStorage.getItem('user'))._id, secondId: formData.newChat}

        const response = await createNewChat(newChatData)
        if (response.error) {
            setServerError('Wrong id!')
        } else {
            props.setNewChat(false)
            props.inputRef.current.focus()
            await refetchUserChats()
        }
    }

    watch(() => setServerError(''))

    return <aside>
        {chats?.map((c, i) => {
            return <div key={i}>
                <ChatSelector index={i} setActiveChat={props.setActiveChat} activeChat={props.activeChat} chatId={c._id}
                              userId={(c.members[0] !== JSON.parse(localStorage.getItem('user'))._id) ? c.members[0] : c.members[1]}
                              onConnect={props.onConnect} setMessagesData={props.setMessagesData}/>
            </div>

        })}
        <div className={'start-new-dialog-block'}>
            <div onClick={() => {
                props.setNewChat(prevState => !prevState)
                props.inputRef.current.focus()
            }}>
                Start new dialog
            </div>
            {
                props.newChat && <form onSubmit={handleSubmit(onSubmit)}>
                    <input className={serverError && 'error-input'}
                           placeholder={'write id'} {...register('newChat', {required: true})}/>
                    {serverError && <div className={'error-text'}>{serverError}</div>}
                </form>
            }
        </div>
    </aside>;
}
