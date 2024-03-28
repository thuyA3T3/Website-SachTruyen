import { defineStore } from 'pinia'

export const homeMenu = defineStore('menuId', {

    state: () => ({
        selectedKeys: [],
        openKeys: [],
    }),

    actions: {
        onSelectedKeys(data) {
            this.selectedKeys = data;
        },
        onopenKeys(data) {
            this.openKeys = data;
        }
    }
})