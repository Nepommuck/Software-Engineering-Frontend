export enum LobbyEventStatus {
    SUCCESS,
    SESSION_STARTED,
    FAILED,
    DUPLICATE_USER,
    USER_KICKED,
    UNKNOWN_ERROR
}

export interface Student {
    id?: number;
    name: string;
}


export interface LobbyEvent {
    readonly status: LobbyEventStatus
}