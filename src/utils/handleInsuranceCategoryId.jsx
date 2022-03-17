export function handleInsuranceCategoryId(pathname) {
    switch (pathname) {
        case "/app/bao-hanh":
            return 1;
        case "/app/chinh-sach-dai-ly":
            return 2;
        default:
            return -1;
    }
}