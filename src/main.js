import { createApp } from "vue";
import App from "./App.vue";
import { VueMultiImageUpload } from "@zakerxa/vue-multiple-image-upload";

const app = createApp(App);
app.component("VueMultiImageUpload", VueMultiImageUpload);
app.mount("#app");