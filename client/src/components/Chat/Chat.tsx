import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";

export const Chat: FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<MessageInput>()

    const onSubmit: SubmitHandler<MessageInput> = async (data) => {
        console.log(data)
    }

    return <div>
        <div className={'chat-form'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input className={(errors.message) && 'error-input'}{...register('message')}/>
                </div>

                <button>Send</button>
            </form>
        </div>
    </div>
}