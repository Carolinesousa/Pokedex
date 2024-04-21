import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import store from "@/store";

const app = createApp(App);

app.use(store);
app.mount("#app");
