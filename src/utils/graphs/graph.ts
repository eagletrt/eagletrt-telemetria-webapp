import Dygraph, { dygraphs } from 'dygraphs';

export type Dataset = [number, ...number[]][] | [Date, ...number[]][];

export interface GraphSettings {
    dataWindow: number
}

export default class Graph {
    private graph: Dygraph
    private data: [DataX, ...number[]][];

    private settings: GraphSettings = {
        dataWindow: 50
    };

    constructor(htmlElement: HTMLElement, initialDataset: Dataset, dygraphSettings: dygraphs.Options, settings: Partial<GraphSettings>) {
        for (const prop in settings) {
            this.settings[prop] = settings[prop]
        }

        this.data. = [new Date(), 2, 3, 4]

        this.data = [ ...initialData ]
        this.graph = new Dygraph(htmlElement, initialData, dygraphSettings);
    }
    
    public add(x: DataX, y: number) {
        this.data.push([x, y])
        if (this.data.length > this.settings.dataWidth) {
            this.data.splice(this.data.length - this.settings.dataWidth, this.settings.dataWidth);
        }
    }

    public reset() {
        this.data.splice(0, this.data.length)
    }

}