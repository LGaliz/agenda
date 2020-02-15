export interface EventI {
    _id?: string;
    title: string;
    date?: Date;
    description?: string;
    user: string; // User id
    type: string;
}