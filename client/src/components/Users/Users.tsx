import { FC } from "react"
import { useGetUsersQuery } from "../../API/loginApi"
import { UsersList } from "./UsersList"

export const Users: FC = () => {
    const { data: usersData, isFetching } = useGetUsersQuery("")

    if (isFetching) {
        return <></>
    }

    return <UsersList usersData={usersData} />
}
