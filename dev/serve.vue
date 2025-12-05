<template>
  <div id="app">
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT"
      crossorigin="anonymous"
    />

    <div class="container-fluid">
     <div class="row justify-content-center">
    
      <h5>Vue Multiple Image Upload With Preview</h5>

      <div class="col-12 col-sm-10 col-md-8 col-lg-5 mt-5 pt-5">
         <!-- Msg Box -->
         <div v-if="postAlert" :class="[alert.state ? 'alert-success' : 'alert-warning']" class="alert" role="alert">
          {{alert.msg}}
         </div>
          <!--  Vue Component -->
         <VueMultiImageUpload 
         :max="max" 
         @data-image="images" 
         :preview="preview"
         :data-reset="vdata" 
         :options="options" 
         :image-size="2e6" 
         :resize="{h:400,w:400}"
         :alert-timeout="5e3"
         :accept="imageFormat"/>
      </div>

      <!-- Clear Button -->
      <div class="col-4 mb-4 pt-4">
        <button @click="upload()" class="btn btn-success fw-bold">Upload</button>
      </div>

      <div class="col-4 mb-4 pt-4">
        <button @click="showData()" class="btn btn-primary fw-bold">Show</button>
      </div>

      <div class="col-4 mb-4 pt-4">
        <button @click="vdata.clear=true" class="btn btn-danger fw-bold">Reset</button>
      </div>

      <div class="col-12 col-sm-10 col-md-8 col-lg-5 mt-3 mb-5">
         <div class="row">
           <div class="col-6 mt-3">
              <select @change="onChange($event)" class="form-select" aria-label="Default select example">
                <option selected value="6">Default 6</option>
                <option v-for="no in 12" :key="no.id" :value="no">Max Photo Upload {{no}}</option>
              </select>
            </div>
            <div class="col-6 mt-3">
              <select @change="onChangePreview($event)" class="form-select" aria-label="Default select example">
                <option selected :value="{h:100,w:100}">Resize Preview</option>
                <option value="1">50 x 50</option>
                <option value="2">100 x 100</option>
                <option value="3">200 x 200</option>
                <option value="4">300 x 300</option>
              </select>
            </div>
            <div class="col-6 mt-3">
              <select @change="onChangeFormat($event)" class="form-select" aria-label="Default select example">
                <option selected :value="['image/png','image/jpeg','image/webp', 'image/gif']">Allow All Images</option>
                <option value="image/gif">Allow Gif Only</option>
                <option value="image/png">Allow PNG Only</option>
                <option value="image/jpeg">Allow JPEG Only</option>
                <option value="image/webp">Allow Webp Only</option>
              </select>
            </div>
         </div>
      </div>
      
     </div>
    <a class="position-fixed text-decoration-none text-dark" href="https://facebook.com/mm.zakerxa" style="right:10px;bottom:10px;">Facebook@ZinMinHtet</a>
  </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue'
// 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
// Uncomment import and local "components" registration if library is not registered globally.
import { VueMultiImageUpload } from '@/entry.esm'

export default defineComponent({
  name: 'ServeDev',
  data () {
    return {
      alert: {
        msg: 'Successfully add new images.',
        state: true
      },
      imageFormat: [
        'image/png',
        'image/jpeg',
        'image/webp',
        'image/gif',
        'image/svg+xml'
      ],
      preview: { h: 100, w: 100 },
      vdata: { clear: false },
      inputImages: [],
      options: {
        max: 'Maximun',
        ready: 'Ready',
        select: 'Choosed'
      },
      max: 6,
      postAlert: false
    }
  },
  components: {
    VueMultiImageUpload
  },
  methods: {
    images(e){
      this.inputImages = e;
      console.log(e)
    },
    showData(){
      this.inputImages.map(res=>console.log("Check File ,",res))
    },
    onChange(e){
      this.max = e.target.value;
    },
    onChangePreview(e){
      console.log(e.target.value)
      switch (e.target.value) {
        case "1": this.preview = {h:50,w:50};break;
        case "2": this.preview = {h:100,w:100};break;
        case "3": this.preview = {h:200,w:200};break;
        case "4": this.preview = {h:300,w:300};break;
        default:console.log(this.preview);
        break;  
      }
    },
    onChangeFormat(e){
      this.imageFormat = [];
      this.imageFormat.push(e.target.value)
      console.log(this.imageFormat)
    },
    inputFormData(){
      let formData = new FormData();
      // The way to append images to FormData.
      this.inputImages.map(img => formData.append('images[]',img));
      return formData;
    },
    upload() {
      if(this.inputImages.length > 0){
        this.vdata.clear = true;
        this.inputImages = [];
        this.alertMsg(true);
      }else this.alertMsg(false);
    },
    alertMsg(state){
      if(state) {
        this.alert.msg = "Successfully add new images.";
        this.alert.state = true;
      }
      else {
        this.alert.msg = "Please select image first.";
        this.alert.state = false;
      }
      this.postAlert = true;
      setTimeout(() => {
        this.postAlert = false;
      }, 1500);
    },
  }
})
</script>
