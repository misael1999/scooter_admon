export class VehiclesModel {

    constructor(
        public id: number,
        public id_station: number,
        public alias: string,
        public model: string,
        public year: string,
        public plate: string,
        public status_id: string
    ) { }
}
