export const getPagination = (page, size) => {
    const limit = size > 0 ? +size : 10;
    const offset = page > 0 ? (page - 1) * limit : 0;

    return { limit, offset };
}