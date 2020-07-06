export default {
    state: {
        //标签页
        mainTabs: [],

        //当前标签页
        mainTabsActiveName: ''
    },

    mutations: {
        updateMainTabs(state, tabs) {
            state.mainTabs = tabs
        },

        updateMainTabsActiveName(state, name) {
            state.mainTabsActiveName = name
        }
    }
}