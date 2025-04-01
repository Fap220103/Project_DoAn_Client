export const API_URLS = {
    BASE_URL: 'https://api.yourdomain.com',
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      PROFILE: '/auth/profile',
    },
    PRODUCT: {
      LIST: '/products',
      DETAIL: (id: number | string) => `/products/${id}`,
    },
    CART: {
      GET: '/cart',
      ADD: '/cart/add',
      REMOVE: '/cart/remove',
    },
    ORDER: {
      CREATE: '/order/create',
      HISTORY: '/order/history',
    }
  };
  