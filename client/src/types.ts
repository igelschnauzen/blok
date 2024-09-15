interface LoginAndRegistrationInputs {
    username: string
    password: string
    confirmPassword: string
}

interface MessageInput {
    message: string
}

interface UsersInput {
    users: string
}

interface NewChatInput {
    newChat: string
}

interface Chat {
    id: number
    index: number
    name: string
    userId: string
}

interface User {
    _id: string
    name: string
}

interface UserChat {
    createdAt: string
    members: string[]
    updatedAt: string
    __v: 0
    _id: number
}

interface Message {
    senderId: string
    text: string
    isHeadMessage: boolean
    createdAt: string
}

////Components Props Types////

interface MessageComponent {}
