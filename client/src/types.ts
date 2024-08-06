interface LoginAndRegistrationInputs {
    username: string
    password: string
    confirmPassword: string
}

interface MessageInput {
    message: string
}

interface NewChatInput {
    newChat: string
}

interface Chat {
    id: number
    name: string
}

interface User {
    _id: number
    name: string
    token: string
}

interface UserChat {
    createdAt: string
    members: string[]
    updatedAt: string
    __v: 0
    _id: string
}

interface Message {
    senderId: string
    text: string
    isHeadMessage: boolean
    createdAt: string
}