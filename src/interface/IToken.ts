import { IToBack } from './IDataRol';

export interface IDataUser {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    role: string;
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