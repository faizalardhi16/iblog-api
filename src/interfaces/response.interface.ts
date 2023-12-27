export type IResponse<T> = {
    status: number;
    message: string;
    data: Data<T>
}

type Data<T> = T | null