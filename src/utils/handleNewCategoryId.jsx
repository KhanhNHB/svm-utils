export function handleNewCategoryId(pathname) {
    switch (pathname) {
        case "/app/tin-khuyen-mai":
            return 1;
        case "/app/tin-san-pham":
            return 2;
        case "/app/tin-su-kien":
            return 3;
        default:
            return -1;
    }
}