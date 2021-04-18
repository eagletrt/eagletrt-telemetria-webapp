export interface Data {
    value: number;
    date: number;
}

export interface AppendDataPayload {
    [fieldName: string]: Data[];
}

