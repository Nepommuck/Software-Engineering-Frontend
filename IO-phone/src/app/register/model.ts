export enum LobbyEventStatus {
    SUCCESS,
    SESSION_STARTED,
    FAILED,
    DUPLICATE_USER,
    USER_KICKED,
    UNKNOWN_ERROR
}

export const LobbyEventMessages = {
    SUCCESS: "registered successfully",
    START: "start",
    USER_KICKED: "removed from lobby",
} as const;

export interface RegistrationFormValue {
    name: string;
}


export interface LobbyEvent {
    readonly status: LobbyEventStatus
}