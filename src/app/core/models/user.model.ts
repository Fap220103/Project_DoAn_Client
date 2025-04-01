export interface User {
    code: number
    message: string
    content: Content
  }
  
  export interface Content {
    accessToken: string
    refreshToken: string
    userId: string
    email: string
    mainNavigations: MainNavigation[]
    roles: string[]
  }
  
  export interface MainNavigation {
    name: string
    caption: string
    url: string
    isAuthorized: boolean
    children: Children[]
    index: number
    parentIndex: number
  }

  export interface Children {
    name: string
    caption: string
    url: string
    isAuthorized: boolean
    children: any[]
    index: number
    parentIndex: number
  }