<template>
    <div class="container-fluid">
     <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-5 mt-3 mb-5">
        <h5>Features</h5>
        <p class="">Preview, Resize, Remove, Add More, Drag & Drop, Limit File Size, File Upload Number and Image Type Limit</p>

         <div class="row">
           <div class="col-6 mt-3">
              <select @change="onChange($event)" class="form-select" aria-label="Default select example">
                <option selected value="6">Maximun 6</option>
                <option v-for="no in 10" :key="no.id" :value="no">Max Photo Upload {{no}}</option>
              </select>
            </div>
            <div class="col-6 mt-3">
              <select @change="onChangePreview($event)" class="form-select" aria-label="Default select example">
                <option selected value="2">Preview</option>
                <option value="1">50 x 50</option>
                <option value="2">100 x 100</option>
                <option value="3">100 x 200</option>
                <option value="4">200 x 350</option>
                <option value="5">200 x 400</option>
              </select>
            </div>
            <div class="col-6 mt-3">
              <select @change="onChangeFormat($event)" class="form-select" aria-label="Default select example">
                <option selected value="all">All Images</option>
                <option value="image/gif">Allow Gif Only</option>
                <option value="image/png">Allow PNG Only</option>
                <option value="image/jpeg">Allow JPEG Only</option>
                <option value="image/svg+xml">Allow SVG Only</option>
                <option value="image/webp">Allow Webp Only</option>
              </select>
            </div>
            <div class="col-6 mt-3">
              <select @change="onChangeSize($event)" class="form-select" aria-label="Default select example">
                <option selected :value="3e6">File Size</option>
                <option value="1e6">1MB</option>
                <option value="2e6">2MB</option>
                <option value="3e6">3MB</option>
                <option value="5e6">5MB</option>
                <option value="8e6">8MB</option>
              </select>
            </div>
         </div>
      </div>

      <h5>Vue Multiple Image Upload</h5>

      <div class="col-12 col-sm-10 col-md-8 col-lg-5 mt-3">
         <!-- Msg Box -->
         <div v-if="postAlert" :class="[alert.state ? 'alert-success' : 'alert-warning']" class="alert" role="alert">
          {{alert.msg}}
         </div>
          <!--  Vue Component -->
         <VueMultiImageUpload class="text-start"
         :max="max" 
         @data-image="images" 
         :preview="preview"
         :data-reset="vdata" 
         :options="options" 
         :image-size="size" 
         :accept="imageFormat"/>
      </div>

      <!-- Clear Button -->
      <div class="col-12 mb-4 pt-4">
        <button @click="upload()" class="btn btn-success fw-bold">Upload</button>
      </div>

      
     </div>
    <a class="position-fixed text-decoration-none text-dark" href="https://facebook.com/mm.zakerxa" style="right:10px;bottom:10px;">Facebook@ZinMinHtet</a>
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return {
      alert : {
        msg : "Successfully add new images.",
        state : true
      },
      alltype : ['image/png','image/jpeg','image/webp','image/gif','image/svg+xml'],
      imageFormat : ['image/png','image/jpeg','image/webp','image/gif','image/svg+xml'],
      preview : {h:100,w:100},
      vdata : { clear : false },
      inputImages : [],
      size  : 3e6,
      options : {
        max : "Maximun",
        ready : "Ready",
        select : "Selected"
      },
      max : 6,
      postAlert : false
    }
  },
  methods:{
    images(e){
      this.inputImages = e;
    },
    onChange(e){
      this.max = e.target.value;
    },
    onChangeSize(e){
       this.size = e.target.value;
    },
    onChangePreview(e){
      switch (e.target.value) {
        case "1": this.preview = {h:50,w:50};break;
        case "2": this.preview = {h:100,w:100};break;
        case "3": this.preview = {h:100,w:200};break;
        case "4": this.preview = {h:200,w:350};break;
        case "5": this.preview = {h:200,w:400};break;
        default: break;  
      }
    },
    onChangeFormat(e){
      this.imageFormat = [e.target.value];
      if(e.target.value == 'all') this.alltype.map(res=>this.imageFormat.push(res))
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
};
</script>


