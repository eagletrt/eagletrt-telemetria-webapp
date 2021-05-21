<template>
    <div class="header">
        <h3>Select chart</h3>
        <button>collapse</button>
    </div>
    <div class="list-wrapper" :class="{ soloNotSelected: !solo }">
        <ul>
            <li v-for="(value, name) in templateList" :key="name" :class="{ active: value, solo: solo === name }" @click="toggleSelected(name, value)">
                <p class="toggle-line show">V</p>
                <p class="toggle-line solo" @click="toggleSolo(name); $event.stopPropagation();">S</p>
                <p class="line-title">{{ name }}</p>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'SelectLineTemplate',
    data: () => {
        return {
            templateList: {'chart1': false, 'chart2': true, 'chart3': false } as { [id: string]: boolean },
            solo: undefined as undefined | string
        }
    },
    methods: {
        toggleSolo(name: string) {
            this.$data.solo = (name === this.$data.solo ? undefined : name);
        },
        toggleSelected(name: string, value: boolean) {
            if (!this.$data.solo) {
                this.$data.templateList[name] = !value
            }
        }
    }
});
</script>

<style scoped lang="scss">
.header {
    background-color: #333;
    color: white;
    display: flex;
    h3 {
        flex-grow: 1;
        padding: 0.5em;
    }
}
.list-wrapper {
    &.soloNotSelected li.active {
        background-color: #555;
    }
    background-color: #444;
    color: white;
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            display: flex;
            padding: 1em;
            align-content: center;
            cursor: pointer;

            > p {
                margin: 0;
                margin: 5px;
                line-height: 2em;
            }

            .line-title {
                font-weight: bold;
                padding-left: 1em;
            }


            .toggle-line {
                width: 2em;
                height: 2em;
                text-align: center;
                background-color: #888;
            }
            &.active {
                .toggle-line.show {
                    background-color: aqua;
                }
            }
            &.solo {
                background-color: #555;
                .toggle-line.solo {
                    background-color: red;
                }
            }
        }
    }
}
</style>