const Status = {
    WATCHED: 'WATCHED',
    WATCHING: 'WATCHING',
    FOR_WATCH: 'FOR_WATCH',
}

const StatusList = [
    { value: Status.WATCHED, label: 'Assistido' }, 
    { value: Status.WATCHING, label: 'Assistindo' },
    { value: Status.FOR_WATCH, label: 'Para Assistir' },
]

const Mode = {
    INFO: 'INFO',
    EDIT: 'EDIT'
}

export {
    StatusList,
    Status,
    Mode
}