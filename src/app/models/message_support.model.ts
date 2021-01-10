export class MessageSupportModel {

    constructor(
        public sender_by: string,
        public receiver_by: string,
        public text: string,
        public created: Date,
        public id?: string,
        public support?: string,
        public viewed?: string,
        public viewed_date?: string
    ) {}

}