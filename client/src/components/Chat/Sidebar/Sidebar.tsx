import './Sidebar.scss'

export const Sidebar = () => {
    const chats: Chat[] = [{name: 'firstPerson'}, {name: 'secondPerson'}, {name: 'thirdPerson'}]
    return <aside className={'sidebar'}>
        {chats.map((c, i) => {
            return <div key={i} className={'chat-selector'}>
                {c.name}
            </div>
        })}
    </aside>;
}
