import { User } from './user.model';

export class Station {

    constructor(
    public id: string,
    public user: User,
    public contact_person: string,
    public picture: string,
    public station_name: string,
    public reputation: number,
    public status: string,
    ) {}

}
