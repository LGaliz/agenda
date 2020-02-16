export interface EventI {
    _id?: string;
    title: string;
    date: string;
    description?: string;
    type: string;
    user: string; // User id
}