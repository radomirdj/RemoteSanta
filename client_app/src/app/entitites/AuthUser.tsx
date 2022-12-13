export interface AuthUser {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly accessToken?: string;
}
