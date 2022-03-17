export function handleInstructionsCategoryId(pathname) {
    switch (pathname) {
        case "/app/tinh-nang":
            return 1;
        case "/app/lap-dat":
            return 2;
        default:
            return -1;
    }
}