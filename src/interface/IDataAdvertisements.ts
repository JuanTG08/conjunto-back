export interface IAdvertisementTransmitter {
    _id: string;
    nameTransmitter: string;
    role: string;   
}

export interface IDataAdvertisement {
    title: string;
    description: string;
    miniature: string;
    transmitter: IAdvertisementTransmitter;
    date_end: string;
    status: boolean;
}