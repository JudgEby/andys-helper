<template>
    <b-button v-show="showButton" pill class="helper-button" @click.prevent="clickHandler" :disabled="loading">
        <img :src="url" alt="Go" class="image">
    </b-button>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import {base64logo} from './logo'
import LocalStore from "../localStore";
import StorageChange = chrome.storage.StorageChange;

interface LocalStoreChangesI {
    [key: string]: StorageChange
}

export default defineComponent({
    data() {
        return {
            loading: false,
            showButton: false,
            waitModalOpen: 500,
            waitModalClose: 500,
            url: base64logo
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

            if (waitModalOpen) {
                this.waitModalOpen = waitModalOpen
            }

            if (waitModalClose) {
                this.waitModalOpen = waitModalClose
            }

            chrome.storage.onChanged.addListener(this.localChangeHandler);
        },
        localChangeHandler(changes: LocalStoreChangesI) {
            for (let [, {oldValue, newValue}] of Object.entries(changes)) {

                if (!oldValue) {
                    return
                }

                if (oldValue.showButton !== newValue.showButton) {
                    this.showButton = newValue.showButton
                }

                const waitModalOpen = newValue.waitModalOpen
                const waitModalClose = newValue.waitModalClose

                if (waitModalOpen && oldValue.waitModalOpen !== waitModalOpen) {
                    this.waitModalOpen = Number(waitModalOpen || 500)
                }

                if (waitModalClose && oldValue.waitModalClose !== waitModalClose) {
                    this.waitModalClose = Number(waitModalClose || 500)
                }
            }
        },
        async clickHandler() {
            this.loading = true

            const parent = document.querySelector<HTMLElement>('[data-id="111"]')

            if (parent) {
                parent.click()
            }


            await this.wait(this.waitModalOpen)
            const modal = document.querySelector<HTMLElement>('.modal-content')
            const compileButton = document.querySelector<HTMLElement>('a.btn-success[rel="compile"]')


            if (modal) {
                const form = modal.querySelector<HTMLInputElement>('textarea.form-control[name="code"]')
                const acceptButton = modal.querySelector<HTMLElement>('a.btn-success[rel="adjustables_apply"]')

                if (form && acceptButton && compileButton) {
                    form.value = await navigator.clipboard.readText();
                    acceptButton.click()
                    await this.wait(this.waitModalClose)
                    compileButton.click()

                    this.loading = false
                }
            }
        },
        wait(ms = 1000) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }
})

</script>

<style scoped>
.helper-button {
    position: fixed;
    z-index: 9000;
    top: 10vh;
    right: 10px;
    background-color: #c9ecec;
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 5px;
}

.image {
    width: 30px;
    height: 30px;
}
</style>
