export interface IPaginationDTO<T extends object>  {
    totalCount:number,
    totalPages:number,
    list:T[]
}