// import Dygraph, { dygraphs } from 'dygraphs';

// // export type Dataset = [number, ...number[]][] | [Date, ...number[]][];
// export type GraphDataX = number | Date;
// export type GraphDataY = (null | number)[];
// export type GraphData = [GraphDataX, ...GraphDataY];

// export interface GraphSettings {
//     dataWindow: number;
// }

// export default class Graph {
//     private graph: Dygraph
//     private data: GraphData[];

//     private settings: GraphSettings = {
//         dataWindow: 50
//     };

//     constructor(htmlElement: HTMLElement, initialDataset: GraphData[] = [], dygraphSettings: dygraphs.Options = {}, settings: Partial<GraphSettings> = {}) {
//         if (settings.dataWindow)
//             this.settings.dataWindow = settings.dataWindow

//         this.data = [[new Date(), 2, 3, 4]]
//         this.data = initialDataset
//         this.data = [ ...initialDataset ]
//         this.graph = new Dygraph(htmlElement,
//             this.data,
//         {
//             errorBars: true,
//             color: 'red',
//             interactionModel: {}
//         });
//     }
    
//     public add(x: GraphDataX, y: GraphDataY) {
//         this.addList([[x, ...y]])
//     }

//     public addList(x: GraphData[]) {
//         this.data.push(...x)
//         if (this.data.length > this.settings.dataWindow) {
//             this.data.splice(0, this.data.length - this.settings.dataWindow);
//         }
//         this.graph.updateOptions( { 'file': this.data } );
//     }

//     public addInUnAltroModo(xs: GraphDataX[], ys: GraphDataY[]) {
//         const d = xs.map(((x, i) => [x, ...ys[i]] as GraphData))
//         this.addList(d)
//     }

//     public reset() {
//         this.data.splice(0, this.data.length)
//     }

// }