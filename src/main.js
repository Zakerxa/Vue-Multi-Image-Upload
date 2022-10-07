import { createApp } from "vue";
import App from "./App.vue";
import { VueMultiImageUpload } from "vue-multi-image-upload";
import routes from "./routes";


const app = createApp(App);
app.use(routes);
app.component("VueMultiImageUpload", VueMultiImageUpload);
app.mount("#app");