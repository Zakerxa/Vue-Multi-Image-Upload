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
         <VueMultiImageUpload :max="max" @data-image="images" :data-reset="vdata" :options="options" :image-size="5000000"/>
      </div>

      <!-- Clear Button -->
      <div class="col-12 mb-4 pt-4">
        <button @click="upload()" class="btn btn-success fw-bold">Upload</button>
      </div>

      <div class="col-12 col-sm-10 col-md-8 col-lg-5 mt-3">
        <select @change="onChange($event)" class="form-select" aria-label="Default select example">
          <option selected value="6">Max Photo Upload</option>
          <option v-for="no in 12" :key="no.id" :value="no">Max Photo Upload {{no}}</option>
        </select>
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
      vdata : { clear : false },
      inputImages : [],
      options : {
        max : "Max",
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
    inputFormData(){
      // In this project I will not use this function
      // This is only for real project
      // You can post by calling this.inputFormData() Function
      
      let formData = new FormData();
      // Append to the FormData.
      formData.append('name', "Zakerxa");
      formData.append('price', 1000);
      formData.append('details', "This is product Details");
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
    }
  }
};
</script>


