import { createStore } from 'vuex'

import { AppendDataPayload, ChartData } from '../types/chart-data'

export interface StoreState {
  chartData: ChartData;
  newChartData: ChartData;
  keys: string[];
}

function storeState(): StoreState {
  return {
    chartData: {},
    newChartData: {},
    keys: []
  }
}

let startTime = 0;

export default createStore({
  state: storeState(),
  mutations: {
    initChartData(state, keys: string[]) {
      for (const k of keys) {
        state.chartData[k] = {
          dates: [],
          values: []
        };
      }
      state.keys = keys;
      startTime = new Date().getTime();
    },
    appendData(state, payload: AppendDataPayload) {
      
      const WINDOW = 30000;
      const deleteBefore = (new Date().getTime() - startTime - WINDOW) / 1000;
      
      
      for (const fieldName in state.chartData) {
        const dataArr = state.chartData[fieldName];
        const toDelete = dataArr.dates.findIndex(x => x >= deleteBefore);
        dataArr.dates.splice(0, toDelete)
        dataArr.values.splice(0, toDelete)
      }
      for (const fieldName in payload) {
        state.chartData[fieldName].dates.push(...payload[fieldName].dates.map(d => (d - startTime) / 1000));
        state.chartData[fieldName].values.push(...payload[fieldName].values);
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
