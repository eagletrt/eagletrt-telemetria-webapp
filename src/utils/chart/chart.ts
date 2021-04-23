import * as Plotly from 'plotly.js';


// export type Dataset = [number, ...number[]][] | [Date, ...number[]][];
export type ChartDataX = number | Date;
export type ChartDataY = (null | number)[];
export type ChartData = [ChartDataX, ...ChartDataY];

export interface ChartSettings {
    dataWindow: number;
}

export default class Chart {
    private chart: Plotly.PlotlyHTMLElement | null = null;
    private data: Plotly.Data[];
    private elementId: string;
    private tracesNameMap: { [id: string]: number } = {}
    private traceValues: { x: number[][]; y: number[][] } = { x: [], y: []};

    private settings: ChartSettings = {
        dataWindow: 10
    };

    constructor(htmlElement: HTMLElement, settings: Partial<ChartSettings> = {}) {

        this.data = [];
        this.elementId = htmlElement.id;
        Plotly.newPlot(this.elementId, this.data).then(g => { this.chart = g });

        if (settings.dataWindow) {
            this.settings.dataWindow = settings.dataWindow
        }
    }

    public redraw() {
        Plotly.redraw(this.elementId);
    }
    
    public addLine(name: string, data: Plotly.Data) {
        this.tracesNameMap[name] = this.data.length;
        this.data.push(data)
        Plotly.redraw(this.elementId)
        this.traceValues.x.push([])
        this.traceValues.y.push([])
    }

    public async update(name: string, x: number[], y: number[]) {
        const i = this.tracesNameMap[name];
        this.traceValues.x[i].push(...x)
        this.traceValues.y[i].push(...y)

        if (this.traceValues.x[i].length > this.settings.dataWindow) {
            this.traceValues.x[i].splice(0, this.traceValues.x[i].length - this.settings.dataWindow);
        }
        if (this.traceValues.y[i].length > this.settings.dataWindow) {
            this.traceValues.y[i].splice(0, this.traceValues.y[i].length - this.settings.dataWindow);
        }

        // console.log(this.traceValues.x[i].length);
        // console.log(this.traceValues.y[i].length);
        

        await Plotly.update(this.elementId, this.traceValues, {}, [0]);
    }

    public reset() {
        this.data.splice(0, this.data.length)
    }

}