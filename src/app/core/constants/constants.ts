export const Constants = {
  ApiResources: 'https://localhost:7190/',
  Color: {
    Resource: 'api/Color'
  },
  Size: {
    Resource: 'api/Size'
  },
  Setting: {
    Resource: 'api/Setting'
  },
  Product: {
    LIST: '/products',
    DETAIL: (id: number | string) => `/products/${id}`
  },
  Cart: {
    GET: '/cart',
    ADD: '/cart/add',
    REMOVE: '/cart/remove'
  },
  Order: {
    CREATE: '/order/create',
    HISTORY: '/order/history'
  }
};
