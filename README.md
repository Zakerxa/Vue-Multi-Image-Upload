# Vue Component Multiple Image Upload

# Welcome

Hello Everyone,My name is **Zin Min Htet** and here is my [**Facebook account**](https://www.facebook.com/mm.zakerxa).

Now, I will show you how to Upload Multiple Image using vue-component.

There is also an image Preview & Remove features.

I hope this can help you a lot with your website.


# Live Demo

**Here is [Live Demo](https://vue-multi-image-upload.vercel.app).**


## Installation

```NPM
npm i @zakerxa/vue-multiple-image-upload
```

## Setup

**1 - Import the vue component locally in the script Tag**

```Vue
<script>
 import { VueMultiImageUpload } from '@zakerxa/vue-multiple-image-upload';

  export default {
    components:{
      VueMultiImageUpload
    }
  }
</script>
```

**OR**

**Global registration in your main.js file**

```Javascript

 import { VueMultiImageUpload } from '@zakerxa/vue-multiple-image-upload';
 const app = createApp(App);
 app.component("vue-multi-image-upload, VueMultiImageUpload");

```

**2 - In your Vue Template**

```Vue
<template>
    <vue-multi-image-upload @data-image="images" :max="4" :data-reset="vdata"/>
</template>
```

``How it works``

```text
1.Images methods can listen child input data from parent component.
2.We can also limit the number of images upload to maximun , :max="limitNumber".
3.If you want to reset child componet data,You can use :data-reset props to passing Object
```

`⇃⇃⇃⇃⇂⇂⇂⇂`

```Vue
<script>
export default {
    data(){
      return {
        component : {}
      },
    },
    methods:{
        images(e){
          e.map(res=>console.log(res))
        },
        clear(){
            this.component.clear = true;
        }
    }
}

</script>
```

## Usage

**That's all what you need**

```Vue
<template>
   <vue-multi-image-upload @data-image="images" :max="4" :data-reset="component" :options="options" :image-size="imageSize" :image-format="formatType"/>
   <button @click="component.clear = true">Clear</button>
</template>

<script>

import { VueMultiImageUpload } from '@zakerxa/vue-multiple-image-upload';

export default {
    data(){
        return {
          component : {},
          options : {},
          imageSize : 2000000, // 2MB
          formatType : ['image/jpeg', 'image/png', 'image/jpg']
        }
    },
    components:{
      VueMultiImageUpload
    },
    methods:{
      images(e){
        let images = [];
        e.map(res=> images.push(res));
        console.log(images);
      }
    },
    mounted(){
      // Options
      this.options.max = "Max";
      this.options.ready = "Ready";
      this.options.select = "Choosed";
    }
}
</script>

```
