import { IToBack } from './IDataRol';

export interface IDataUser {
    name: string;
    lastname: string;
    email: string;
}

export interface ITokenRole {
    name: string;
    _id: string;
}

export interface IToken {
    toFront?: string[];
    _id: string;
    iat?: number;
    role: ITokenRole;
}