import {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDebounce} from "../hooks/useDebounce";
import copy from "../assets/copy.svg"
import {useGetUsersQuery} from "../API/loginApi";

export const Users: FC = () => {
    const {
        register,
        watch,
    } = useForm<UsersInput>()
    const {data: usersData, isFetching} = useGetUsersQuery()

    const [displayedUsersData, setDisplayedUsersData] = useState<User[]>(usersData)
    const debouncedUserData = useDebounce(displayedUsersData, 300)

    useEffect(() => {
        watch(data => {
            const searchUsers = usersData.filter(user => user.name.includes(data.users))
            setDisplayedUsersData(searchUsers)
        })
    }, [debouncedUserData])

    if (isFetching) {
        return <></>
    }

    return <div className={'users-page'}>
        <form className={'users-search'}>
            <input placeholder={'Search user...'} {...register('users')}/>
        </form>
        {debouncedUserData.map((user, index) => {
            return <div className={'user'} key={index}>
                <div style={{fontWeight: '600'}}>
                    <div>{user.name}</div>
                </div>
                <div>
                    <div id={'_id'}>{user._id}<img src={copy} alt={'copy'} onClick={() => {
                        navigator.clipboard.writeText(document.getElementById('_id').innerText)
                    }
                    }/></div>

                </div>
            </div>
        })}
    </div>
}