import { User } from './user.model';

export class Merchant {

    constructor(
    public id: string,
    public user: User,
    public contact_person_name: string,
    public contact_person_last_name: string,
    public picture: string,
    public config: MerchantConfig,
    public phone_number: string,
    public business_name: string,
    public merchant_verified: string,
    public document_verified: string,
    public reputation: number,
    public total_sales: number,
    public total_clients: number,
    public total_questions: number,
    public total_products: number,
    public status: string,
    ) {}

}

export class MerchantConfig {

    constructor(
        public id: number,
        public is_active_loyalty_program: boolean,
        public is_active_allow_questions: boolean,
        public default_points_loyalty: number,
        public complete_config: boolean
    ) {}
}

