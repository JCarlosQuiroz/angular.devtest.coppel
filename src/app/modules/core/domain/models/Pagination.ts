export interface Pagination<T> {
    total: number;
    pages: number;
    page: number;
    data: Array<T>;
    perPage: number;
}