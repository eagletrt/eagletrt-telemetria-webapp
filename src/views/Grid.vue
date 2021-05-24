<template>
  <div class="home">
    <div class="select-line-template">
      <SelectLineTemplate class="select-line-template"></SelectLineTemplate>
    </div>
    <div class="grid col-3">
      <div>0</div>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SelectLineTemplate from '@/components/SelectLineTemplate.vue';


export default defineComponent({
  name: "Grid",
  components: { SelectLineTemplate },
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  }
});
</script>

<style lang="scss" scoped>

.col-1 {
  grid-template-columns: repeat(1, 1fr);
}
.col-2 {
  grid-template-columns: repeat(2, 1fr);
}
.col-3 {
  grid-template-columns: repeat(3, 1fr);
}
.col-4 {
  grid-template-columns: repeat(4, 1fr);
}

.home {
  display: flex;
  background-color: black;
  height: 100%;
  > .grid {
    color: white;
    display: grid;
    flex-grow: 1;
  }
  > .select-line-template {
    height: 100%;
  }

}

ul {
  list-style: none;
  padding: 0;
}

.select-line-template {
  width: 250px;
}
</style>
