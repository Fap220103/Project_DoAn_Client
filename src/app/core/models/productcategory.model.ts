export interface ProductCategory {
  code: number;
  message: string;
  content: CategoryResult;
}

export interface CategoryResult {
  data: Category[];
  message: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  alias: string;
  icon: string;
  parentId: any;
  parentName: string;
  isActive: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  childCategories: ChildCategory[];
}

export interface ChildCategory {
  id: string;
  title: string;
  description: string;
  alias: string;
  icon: string;
  parentId: string;
  parentName: string;
  isActive: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  childCategories: ChildCategory2[];
}

export interface ChildCategory2 {
  id: string;
  title: string;
  description: string;
  alias: string;
  icon: string;
  parentId: string;
  parentName: string;
  isActive: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  childCategories: any[];
}

export interface CreateCategory {
  userId: string;
  title: string;
  alias: string;
  description: string;
  icon: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  parentId: string;
}
export interface ProductCategoryName {
  code: number;
  message: string;
  content: CategoryNameResult;
}
export interface CategoryNameResult {
  data: CategoryName[];
  message: string;
}

export interface CategoryName {
  id: string;
  title: string;
}
