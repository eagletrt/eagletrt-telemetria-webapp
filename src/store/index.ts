import { createStore } from 'vuex'

import { Data, AppendDataPayload } from '../types/chart-data'

export interface StoreState {
  chartData: { [id: string]: Data[] };
}

function storeState(): StoreState {
  return {
    chartData: {},
  }
}

export default createStore({
  state: storeState(),
  mutations: {
    initChartData(state, keys: string[]) {
      for (const k of keys) {
        state.chartData[k] = []
      }
    },
    appendData(state, payload: AppendDataPayload) {
      const WINDOW = 30000;
      const deleteBefore = new Date().getTime() - WINDOW;

      for (const fieldName in state.chartData) {
        const dataArr = state.chartData[fieldName];
        const toDelete = dataArr.findIndex(x => x.date >= deleteBefore);
        dataArr.splice(0, toDelete)
      }
      for (const fieldName in payload) {
        state.chartData[fieldName].push(...payload[fieldName]);
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
