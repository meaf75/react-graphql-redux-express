export const handle = <T> (promise : Promise<T>) : Promise<any[] | (T | undefined)[]> => {
    return promise
        .then((data : T) => ([data, undefined]))
        .catch((error : any) => Promise.resolve([undefined, error]));
}