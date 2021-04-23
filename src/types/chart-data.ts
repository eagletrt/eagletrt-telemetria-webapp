export interface Data {
    values: number[];
    dates: number[];
}

export interface AppendDataPayload {
    [fieldName: string]: Data;
}

export type ChartData = { [id: string]: Data };
