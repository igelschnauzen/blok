import { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDebounce } from "../../hooks/useDebounce"
import copy from "../../assets/copy.svg"

export const UsersList: FC<{ usersData: User[] }> = (props) => {
    const { register, watch } = useForm<UsersInput>()

    const [displayedUsersData, setDisplayedUsersData] = useState<User[]>(props.usersData)

    const debouncedUserData = useDebounce(displayedUsersData, 300)

    useEffect(() => {
        watch((data) => {
            const searchUsers = props.usersData.filter((user: User) => user.name.includes(data.users!))
            setDisplayedUsersData(searchUsers)
        })
    }, [debouncedUserData])

    return (
        <div className={"users-page"}>
            <form className={"users-search"}>
                <input placeholder={"Search user..."} {...register("users")} />
            </form>
            {debouncedUserData.length === 0 ? (
                <div className={"no-users"}>no users found</div>
            ) : (
                debouncedUserData.map((user, index) => {
                    return (
                        <div className={"user"} key={index}>
                            <div style={{ fontWeight: "600" }}>
                                <div>{user.name}</div>
                            </div>
                            <div>
                                <div id={"otherId"}>
                                    {user._id}
                                    <img
                                        src={copy}
                                        alt={"copy"}
                                        onClick={() => {
                                            navigator.clipboard.writeText(document.getElementById("otherId")!.innerText)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    )
}
