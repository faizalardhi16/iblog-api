
export default class Logger{
    private date: Date = new Date();
    private modifyDate: (number | string)[] = [
        this.date.getDate() < 10 ? `0${this.date.getDate()}` : this.date.getDate(), 
        this.date.getMonth() + 1 < 10 ? `0${this.date.getMonth() + 1}` : this.date.getMonth() + 1,
        this.date.getFullYear(),
    ] 
    private modifyTime: (number | string)[] = [
        this.date.getHours() < 10 ? `0${this.date.getHours()}` : this.date.getHours(),
        this.date.getMinutes() < 10 ? `0${this.date.getMinutes()}` : this.date.getMinutes(),
        this.date.getSeconds() < 10 ? `0${this.date.getSeconds()}` : this.date.getSeconds()
    ]
    private modifyLog: string = this.modifyDate.join("/") + " " + this.modifyTime.join(":")


    error(item: string){
        const logInfo: string = `${this.modifyLog}: ${item}`

        console.error(logInfo);
    }

    log(item: string){
        const logInfo: string = `${this.modifyLog}: ${item}`

        console.log(logInfo);
    }
}