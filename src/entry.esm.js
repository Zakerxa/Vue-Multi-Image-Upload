// Import vue components
import { VueMultiImageUpload } from '@/lib-components/index';

// install function executed by Vue.use()
const install = function installVueMultiImageUpload(app) {
    Object.entries(VueMultiImageUpload).forEach(([componentName, component]) => {
        app.component(componentName, component);
    });
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/lib-components/index';