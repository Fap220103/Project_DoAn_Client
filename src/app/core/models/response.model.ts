export interface ResponseCreate {
    code: number
    message: string
    content: Content
}


export interface Content {
    id: string
    message: string
}
