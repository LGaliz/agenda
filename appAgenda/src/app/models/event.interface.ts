export interface EventI {
    id?: string;
    title: string;
    date: string;   //ISO date
    description?: string;
    type: string;
    user: string; // User id
}
