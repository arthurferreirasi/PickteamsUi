export class Player{
    name: string = '';
    isSeed: Boolean = false;

    constructor(n: string, key: boolean){
        this.name = n;
        this.isSeed = key;
    }
}