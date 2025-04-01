export interface NavigationItem {
    name: string;
    caption: string;
    url: string;
    isAuthorized: boolean;
    children: NavigationItem[];
    index: number;
    parentIndex: number;
  }