import {FC} from "react";

export const Message:FC = (props:Message) => {
    if (props.isHeadMessage) {
        return <div className={'headMessage'}>
            <div>
                <h3>
                    {props.userName}
                </h3>
                <div>
                    {props.text}
                </div>
            </div>
        </div>
    } else {
        return <div className={'avgMessage'}>
            <span>
            </span>
            <div>
                {props.text}
            </div>
        </div>
    }
}