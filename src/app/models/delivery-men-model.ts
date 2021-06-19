export class DeliveryMenModel {
    constructor(
        public id: number,
        public user: number,
        public station: number,
        public merchant: string,
        public status: string,
        public name: string,
        public last_name: string,
        public phone_number: string,
        public picture: string,
        public reputation: number,
        public location: Location,
        public delivery_status: string,
        public address: null,
        public vehicle_plate: string,
        public vehicle_model: string,
        public vehicle_year: string,
        public vehicle_color: string,
        public vehicle_type: number,
        public last_time_update_location: Date,
    ) { }
}

interface Location {
    type: string;
    coordinates: number[];
}
