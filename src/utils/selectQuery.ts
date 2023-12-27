export const selectQuery = (Q: string[]) => {
    let obj: any;

    Q.forEach((t: string) => {
        obj = {...obj, [t]: true}
    })

    return obj
}