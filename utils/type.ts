export type JWTPayload = {
    id: number;
    isAdmin: boolean | null;
    firstName: string;
    lastName: string;
    phone:string | null;
}
