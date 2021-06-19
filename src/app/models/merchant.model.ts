export class MerchantModel {
    constructor(
        public id: number,
        public email: string,
        public contact_person: string,
        public picture: string,
        public merchant_name: string,
        public phone_number: string,
        public is_delivery_by_store: boolean,
        public information_is_complete: boolean,
        public category: string,
        public total_grades: number,
        public subcategory: string,
        public reputation: number,
        public description: string,
        public approximate_preparation_time: string,
        public full_address: string,
        public is_open: boolean,
        public point: Point,
        public from_preparation_time: number,
        public to_preparation_time: number,
        public type_menu: number,
        public zone: null,
        public area: number,
        public delivery_rules: null,
        public merchant_level: number,
        public operational_zones_activated: boolean,
        public restricted_zones_activated: boolean,
        public accept_payment_online: boolean,
        public has_rate_operating: boolean,
        public increment_price_operating: number,
        public tags: string[],
        public promotions: any[],
    ) { }
}

export interface Point {
    type: string;
    coordinates: number[];
}
