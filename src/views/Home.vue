<template>
  <div class="home">
    <div id="graph" class="graph" ref="graph"></div>
    <div class="select-line-template">
      <SelectLineTemplate class="select-line-template"></SelectLineTemplate>
    </div>
    <div>
      <h3>Lines</h3>
      <input type="text" v-model="searchLines" />
      <ul>
        <li v-for="lineName in filteredLinesNames" :key="lineName">
          <input type="checkbox" :value="lineName" :id="'chartcheckbox-' + lineName" @change="toggleLine(lineName, $event.target.checked)" v-model="activeLines">
          <label :for="'chartcheckbox-' + lineName">{{lineName}}</label>
          </li>
      </ul>
    </div>
    <div>
      <h3>Active</h3>
      <ul>
        <li v-for="lineName in activeLines" :key="lineName">
          <input type="checkbox" :value="lineName" :id="'chartcheckbox-' + lineName" @change="toggleLine(lineName, $event.target.checked)" v-model="activeLines">
          <label :for="'chartcheckbox-' + lineName">{{lineName}}</label>
          </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Graph from '@/utils/chart/chart';
import { defineComponent } from "vue";
import { ChartData } from '@/types/chart-data'
import config from '../config'
import SelectLineTemplate from '@/components/SelectLineTemplate.vue';


export default defineComponent({
  name: "Home",
  components: { SelectLineTemplate },
  props: {
  },
  data() {
    return {
      chart: null as Graph | null,
      activeLines: [] as string[],
      searchLines: ''
    };
  },
  computed: {
    graphEl(): HTMLDivElement {
      return this.$refs.graph as HTMLDivElement;
    },
    chartData(): ChartData {
      return this.$store.state.chartData;
    },
    linesNames(): string[] {
      return this.$store.state.keys;
    },
    filteredLinesNames(): string[] {
      if (this.searchLines.trim()) {
        const query = this.searchLines.trim().toLowerCase();
        return this.linesNames.filter(x => x.toLowerCase().includes(query))
      } else {
        return this.linesNames;
      }
    }
  },
  mounted() {
    this.chart = new Graph(this.graphEl, '');
    this.activeLines = JSON.parse(localStorage.getItem('activeLines') ?? '[]') as string[];
    this.activeLines.forEach(l => this.toggleLine(l, true, true));

    // let i = 0;
    setInterval(() => {
      // console.log(this.$store.state.chartData);
      this.chart?.redraw();
      // this.graph?.update('pippo', [i, i+1, i+2], [4,5,6])
      // i += 3
    }, config.updateRate)
  },
  methods: {
    increment() {
      this.$store.commit('increment')
    },
    toggleLine(lineName: string, toggle: boolean, ignoreLocalStorage = false) {
      if (toggle) {
          this.chart?.addLine(lineName, {
            name: lineName,
            x: this.$store.state.chartData[lineName].dates,
            y: this.$store.state.chartData[lineName].values
        });
      } else {
        this.chart?.removeLine(lineName);
      }
  
      if (!ignoreLocalStorage) {
        localStorage.setItem('activeLines', JSON.stringify(this.activeLines));
      }
    }
}
});
</script>

<style lang="scss" scoped>
.home {
  > .graph {
    width: 100vw;
    height: 500px;
  }
}

ul {
  list-style: none;
  padding: 0;
}

.select-line-template {
  width: 400px;
}
</style>
