import {
	createApp,
	defineAsyncComponent
} from 'vue';
import App from './App.vue';
import './theme.css';


const app = createApp(App);
app.component('AppButton', defineAsyncComponent(() => import('./components/AppButton.vue')));
app.component('AppAlert', defineAsyncComponent(() => import('./components/AppAlert.vue')));
app.component('AppLoader', defineAsyncComponent(() => import('./components/AppLoader.vue')));
app.mount('#app');