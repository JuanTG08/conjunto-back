export interface IToBack {
    path: string;
    method: string;
}

export interface IToDepend {
    id: string;
    name: string;
}

export interface IDataRol {
    name: string;
    description: string;
    toDepend: IToDepend;
    toBack: IToBack[];
    toFront: IToBack[];
    status: Boolean | undefined;
}