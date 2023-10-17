export class Task {

    constructor(
        public _id: string,
        public taskName: string,
        public taskStatus: string,
        public userId: string,
        public createdAt?: Date,
        public updatedAt?: Date){
    }
}
