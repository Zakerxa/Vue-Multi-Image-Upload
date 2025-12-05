# Vue Multiple Image Upload (v1.0.10)

# Welcome Back

Hello Everyone,My name is **Zin Min Htet** and here is my [**Facebook account**](https://www.facebook.com/mm.zakerxa).

Now, I will show you how to Upload Multiple Image using Vue-Component.

There is an image Preview, Resize, Remove, Add More, Drag & Drop features are included.

You can also limit the maximun number of file upload, the Image size , the Image type.

I add new feature alert Box, Resize Image, Preview also can be resize in version 1.0.8;


# Here is Live Demo

<img src="https://raw.githubusercontent.com/Zakerxa/Vue-Multi-Image-Upload/master/src/assets/preview.jpg" alt="preview" width="200" style="max-width:200px;"/>

**Watch Now [Live Demo](https://vue-multi-image-upload.vercel.app).**


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
**Global registration in your main.js**

```Javascript
 import { VueMultiImageUpload } from '@zakerxa/vue-multiple-image-upload';
 const app = createApp(App);
 app.component("vue-multi-image-upload", VueMultiImageUpload);

```

**2 - In your Vue Template**

```Vue
<template>
    <vue-multi-image-upload @data-image="images" :max="4" :data-reset="component"/>
</template>
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

## Props & Type

<table class="table">
  <thead>
    <tr>
      <th scope="col">Props</th>
      <th scope="col">Data Type</th>
      <th scope="col">Default</th>
      <th scope="col">Optional</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row">max</td>
      <td>Number</td>
      <td>6</td>
      <td>YES</td>
      <td>Upload File Limit</td>
    </tr>
    <tr>
      <td scope="row">Preview</td>
      <td>Object</td>
      <td>{ h:100, w:100 }</td>
      <td>YES</td>
      <td>Preview Size h => height</td>
    </tr>
    <tr>
      <td scope="row">Resize</td>
      <td>Object</td>
      <td>No Default</td>
      <td>YES</td>
      <td>{ h:500, w:500 , keepRatio: true}</td>
    </tr>
    <tr>
      <td scope="row">imageSize</td>
      <td>Number</td>
      <td>4e6</td>
      <td>YES</td>
      <td>Image File Size</td>
    </tr>
    <tr>
      <td scope="row">alertTimeout</td>
      <td>Number</td>
      <td>3e3 (3s)</td>
      <td>YES</td>
      <td>Alert TimeOut</td>
    </tr>
    <tr>
      <td scope="row">accept</td>
      <td>Array</td>
      <td>[image/png, image/jpg, image/gif]</td>
      <td>YES</td>
      <td>Image's Format Validate</td>
    </tr>
     <tr>
      <td scope="row">dataReset</td>
      <td>Object</td>
      <td>false</td>
      <td>No</td>
      <td>Reset the child component data.</td>
    </tr>
     <tr>
      <td scope="row">Options</td>
      <td>Object</td>
      <td>"Maximun","Ready","Selected"</td>
      <td>YES</td>
      <td>Input Box Message.</td>
    </tr>
  </tbody>
</table>

## Explanation of usage

**1.Images methods can listen child input data from parent the component.**
```
  @data-image="images"
  images(e){
   e.map(res=>console.log(res))
  }
```

**2.We can Resize the images by adding resize props**
```
:resize={ h:500, w:500 ,keepRatio:true}
h => max-height of the image
w => max-width of the image

keepRatio true can resize your image without losing distortion
keepRatio false can resize your image exactly width & height

Default is False
```


**3.We can limit the number of image to upload maximun**
```
:max="limitNumber"
```

**4.We can also limit the images size & type.**
```
:image-size="imageSize" :accept="imageType"

this.imageSize = 2e6; // 2MB
ImageSize only allow 2MB else We will show alert msg to user.

this.imageType = ['image/jpeg', 'image/png', 'image/gif'];
imageType should be inside an array
```

**5.And, There is one options.Options can change the message inputBox.**
```
:options="options"
this.options.max = "Max";
this.options.ready = "Ready";
this.options.select = "Choosed";
```

**6.If you want to reset child component data,You can use :data-reset props to passing Object**
```
:data-reset="components"
this.component.clear = true;
```

## Final State

**That's all what you need**

```Vue
<template>
   <vue-multi-image-upload 
     @data-image="images" 
     :max="4" 
     :image-size="4e6"  
     :alert-timeout="3e3" 
     :accept="imageType"
     :preview="{ h:100,w:100 }"
     :resize="{ h:500,w:500, keepRatio:true}" 
     :data-reset="component" 
     :options="options"  
    />
   <button @click="clear()">Clear</button>
</template>

<script>

import { VueMultiImageUpload } from '@zakerxa/vue-multiple-image-upload';

export default {
    data(){
        return {
          component : {},
          inputImages : [],
          imageType : ['image/jpeg', 'image/png', 'image/gif']
        }
    },
    components:{
      VueMultiImageUpload
    },
    methods:{
      images(e){
        this.inputImages = e;
      },
      inputFormData(){
        // The way to append images to FormData.
        let formData = new FormData();
        this.inputImages.map(img => formData.append('images[]',img));
        return formData;
      },
      clear(){
        this.component.clear = true;
      }
    }
}
</script>

```
