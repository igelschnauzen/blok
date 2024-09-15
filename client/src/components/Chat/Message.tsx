import { FC } from "react"
import { useFindUserQuery } from "../../API/loginApi"

export const Message: FC<Message> = (props) => {
    const { data: user, isFetching } = useFindUserQuery(props.senderId)
    if (isFetching) {
        return <></>
    }

    if (props.isHeadMessage) {
        return (
            <div className={"headMessage"}>
                <div>
                    <h3>{user.name}</h3>
                    <div>{props.text}</div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={"avgMessage"}>
                <span></span>
                <div>{props.text}</div>
            </div>
        )
    }
}
