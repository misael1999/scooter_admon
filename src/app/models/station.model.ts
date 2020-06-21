import { User } from './user.model';

export class StationModel {

    constructor(
    public id: string,
    public user: User,
    public contact_person: string,
    public picture: string,
    public station_name: string,
    public station_verified: string,
    public document_verified: string,
    public assign_delivery_manually: string,
    public cancellation_policies: string,
    public allow_cancellations: string,
    public information_is_complete: string,
    public reputation: number,
    public total_orders: string,
    public total_clients: string,
    public total_delivery_man: string,
    public total_messages_support: string,
    ) {}

}
