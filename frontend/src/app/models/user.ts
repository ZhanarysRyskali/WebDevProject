export interface User {
    id: number;
    username: string;
    email: string;
    password?: string; // не возвращаем на фронт
    token?: string;

}
