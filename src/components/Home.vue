<template>
    <div class="container-fluid">
     <div class="row justify-content-center">
    
      <!-- Hero Image  -->
      <img alt="Vue logo" style="width:170px" src="../assets/logo.png" />
      <h5>Vue Multiple Image Upload With Preview</h5>

      <div class="col-12 col-sm-10 col-md-8 col-lg-5 mt-3">
         <!-- Msg Box -->
         <div v-if="postAlert" :class="[alert.state ? 'alert-success' : 'alert-warning']" class="alert" role="alert">
          {{alert.msg}}
         </div>
          <!--  Vue Component -->
         <VueMultiImageUpload 
         :max="max" 
         @data-image="images" 
         :preview="{h:100,w:100}"
         :data-reset="vdata" 
         :options="options" :image-size="3e6" 
         :image-format="imageFormat"/>
      </div>

      <!-- Clear Button -->
      <div class="col-12 mb-4 pt-4">
        <button @click="upload()" class="btn btn-success fw-bold">Upload</button>
      </div>

      <div class="col-12 col-sm-10 col-md-8 col-lg-5 mt-3 mb-5">
         <div class="row">
           <div class="col-12 mt-3">
              <select @change="onChange($event)" class="form-select" aria-label="Default select example">
                <option selected value="6">Default 6</option>
                <option v-for="no in 12" :key="no.id" :value="no">Max Photo Upload {{no}}</option>
              </select>
            </div>
            <!-- <div class="col-6 mt-3">
              <select @change="onChangeFormat($event)" class="form-select" aria-label="Default select example">
                <option selected :value="['image/png','image/jpeg','image/webp', 'image/gif']">Allow All Images</option>
                <option :value="['image/gif']">Allow Gif Only</option>
                <option :value="['image/png']">Allow PNG Only</option>
                <option :value="['image/jpeg']">Allow JPEG Only</option>
                <option :value="['image/webp']">Allow Webp Only</option>
              </select>
            </div> -->
         </div>
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
      imageFormat : ['image/png','image/jpeg','image/webp','image/gif'],
      vdata : { clear : false },
      inputImages : [],
      options : {
        max : "Maximun",
        ready : "Ready",
        select : "Choosed"
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
    onChangeFormat(e){
      this.imageFormat = e.target.value;
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


