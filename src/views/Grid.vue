<template>
  <div class="home">
    <div class="select-line-template">
      <SelectLineTemplate class="select-line-template"></SelectLineTemplate>
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
