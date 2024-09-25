export interface IAuth {
    id: string;
    role: string;
}

export interface IToken {
    accessToken: string;
    refreshToken: string;
}
