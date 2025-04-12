export interface ApiResponse<T> {
    code: number;
    message: string;
    content: T;
}

