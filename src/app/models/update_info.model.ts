export class UpdateInfoStationModel {

    constructor(
        public general?: General,
        public config?: Config,
        public schedules?: Array<Schedule>,
        public services?: Array<Service>,
        public address?: Address
    ) { }

}

interface Address {
    alias: string;
    street: string;
    suburb: string;
    postal_code: string;
    exterior_number: string;
    inside_number: string;
    references: string;
    point: Point;
}

interface Point {
    lat: number;
    lng: number;
}

interface Service {
    service_id: number;
    base_rate_price: number;
    price_kilometer: number;
    from_kilometer: number;
    to_kilometer: number;
}

interface Config {
    assign_delivery_manually: boolean;
    allow_cancellations: boolean;
    cancellation_policies: string;
}

interface General {
    picture: string;
}

interface Schedule {
    schedule_id: number;
    from_hour: string;
    to_hour: string;
}
