export interface ProductCategory {
    code: number
    message: string
    content: Content
  }
  
  export interface Content {
    data: Category[]
    message: string
  }
  
  export interface Category {
    id: string
    title: string
    description: string
    alias: string
    icon: string
    parentId: any
    parentName: string
    isActive: boolean
    seoTitle: string
    seoDescription: string
    seoKeywords: string
    childCategories: ChildCategory[]
  }
  
  export interface ChildCategory {
    id: string
    title: string
    description: string
    alias: string
    icon: string
    parentId: string
    parentName: string
    isActive: boolean
    seoTitle: string
    seoDescription: string
    seoKeywords: string
    childCategories: ChildCategory2[]
  }
  
  export interface ChildCategory2 {
    id: string
    title: string
    description: string
    alias: string
    icon: string
    parentId: string
    parentName: string
    isActive: boolean
    seoTitle: string
    seoDescription: string
    seoKeywords: string
    childCategories: any[]
  }
  