import { createApp } from "vue";
import App from "./App.vue";
import { VueMultiImageUpload } from "@zakerxa/vue-multiple-image-upload";
import routes from "./routes";


const app = createApp(App);
app.use(routes);
app.component("VueMultiImageUpload", VueMultiImageUpload);
app.mount("#app");