(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@/lib-components/index')) :
    typeof define === 'function' && define.amd ? define(['exports', '@/lib-components/index'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["vue-multi-image-upload"] = {}, global.index));
})(this, (function (exports, index) { 'use strict';

    // Import vue components

    // install function executed by Vue.use()
    const install = function installVueMultiImageUpload(app) {
      Object.entries(index.VueMultiImageUpload).forEach(([componentName, component]) => {
        app.component(componentName, component);
      });
    };

    exports["default"] = install;
    Object.keys(index).forEach(function (k) {
        if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
            enumerable: true,
            get: function () { return index[k]; }
        });
    });

    Object.defineProperty(exports, '__esModule', { value: true });

}));
