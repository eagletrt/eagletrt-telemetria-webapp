<template>
  <div class="wrapper">
    <div :id="chartId" class="graph" ref="graph"></div>
  </div>
</template>

<script lang="ts">
import Graph from "@/utils/chart/chart";
import { ChartData } from "@/types/chart-data";
import { defineComponent } from "vue";
import config from '../config'

export default defineComponent({
  name: "Chart",
  props: {
    chartId: String,
    title: String,
    activeLinesInput: Array
  },
  data() {
    return {
      chart: null as Graph | null,
      activeLines: [ ] as string[],
      searchLines: "",
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
        return this.linesNames.filter((x) => x.toLowerCase().includes(query));
      } else {
        return this.linesNames;
      }
    },
  },
  mounted() {
    this.chart = new Graph(this.graphEl, this.$props.title ?? '');
    // this.activeLines = JSON.parse(
    //   localStorage.getItem("activeLines") ?? "[]"
    // ) as string[];
    // this.activeLines = [ ...(this.$props.activeLinesInput as string[]) ]
    for (const l of (this.activeLinesInput as string[])) {
      this.activeLines.push(l)
    }
    this.activeLines.forEach((l) => this.toggleLine(l, true, true));

    // let i = 0;
    setInterval(() => {
      // console.log(this.$store.state.chartData);
      this.chart?.redraw();
      // this.graph?.update('pippo', [i, i+1, i+2], [4,5,6])
      // i += 3
    }, config.updateRate);
  },
  methods: {
    increment() {
      this.$store.commit("increment");
    },
    toggleLine(lineName: string, toggle: boolean, ignoreLocalStorage = false) {
      if (toggle) {
        this.chart?.addLine(lineName, {
          name: lineName,
          x: this.$store.state.chartData[lineName].dates,
          y: this.$store.state.chartData[lineName].values,
        });
      } else {
        this.chart?.removeLine(lineName);
      }

      if (!ignoreLocalStorage) {
        localStorage.setItem("activeLines", JSON.stringify(this.activeLines));
        console.log("SETTING ", lineName);
      }
    },
  },
});
</script>

<style scoped lang="scss">
</style>