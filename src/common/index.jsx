export const USER_TOKEN = 'USER_TOKEN';
export const USER_DEVICE_TOKEN = 'USER_DEVICE_TOKEN';

export const RESPONSE_STATUS = {
    FORBIDDEN: 401
};

export const ROLE = {
    ADMIN: 1,
    HUB_MANAGER: 2,
    SHIPPER: 3,
    CUSTOMER: 4
};

// export const host_url = 'https://image.webby.vn/uploads/';
export const host_url = 'http://localhost:8080/uploads/';

export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_PAGE_RANGE = [5, 10, 20, { value: -1, label: 'Tất cả' }];