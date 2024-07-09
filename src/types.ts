export interface Todo {
    id: number;
    title: string;
    descriptions: string;
    isFait: boolean;
    statut: 'IMPORTANT' | 'MOYENNE' | 'FAIBLE';
    created_at?: string;
}
