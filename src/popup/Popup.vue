<template>
    <div class="popup">
        <div class="popup-input">
            <div>Modal Opening Delay (msec)</div>
            <b-form-input v-model="waitModalOpen" type="number" debounce="500"></b-form-input>
        </div>
        <div class="popup-input">
            <div>Modal Closing Delay (msec)</div>
            <b-form-input v-model="waitModalClose" type="number" debounce="500"></b-form-input>
        </div>
        <div class="toggle-show">
            <b-form-checkbox :value="showButton" name="check-button" :switch="true" @input="toggle" size="lg"/>
            <div class="toggle-label">Display Button</div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import LocalStore from '../localStore'

export default defineComponent({
    data() {
        return {
            showButton: true,
            waitModalOpen: '',
            waitModalClose: '',
        }
    },

    created() {
        this.getStore()
    },
    methods: {
        async getStore() {
            this.showButton = await LocalStore.getLocalShowButton()
            const waitModalOpen = await LocalStore.getLocalModalOpen()
            const waitModalClose = await LocalStore.getLocalModalClose()
            this.waitModalOpen = String(waitModalOpen)
            this.waitModalClose = String(waitModalClose)
        },
        toggle() {
            const toggleTo = !this.showButton
            this.showButton = toggleTo

            LocalStore.setLocalShowButton(toggleTo)
        }
    },
    watch: {
        waitModalOpen(value) {
            LocalStore.setLocalModalOpen(value)
        },
        waitModalClose(value) {
            LocalStore.setLocalModalClose(value)
        }
    }
})
</script>

<style scoped>
main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
}

h3 {
    color: #42b983;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 200;
    line-height: 1.2rem;
    margin: 2rem auto;
}

h6 {
    font-size: 0.5rem;
    color: #999999;
    margin: 0.5rem;
}

a {
    font-size: 0.5rem;
    margin: 0.5rem;
    color: #cccccc;
    text-decoration: none;
}

@media (min-width: 480px) {
    h3 {
        max-width: none;
    }
}

@media (prefers-color-scheme: light) {
    a:hover {
        color: #747bff;
    }

    h6 {
        color: #333333;
    }
}
</style>
