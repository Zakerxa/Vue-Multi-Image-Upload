<template>
  <div class="container-fluid">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <div class="row justify-content-center">

      <!-- Hero Image  -->
      <img alt="Vue logo" style="width:200px" src="./assets/logo.png" />
      <h5>Vue Multiple Image Upload With Preview</h5>

      <!-- Clear Button -->
      <div class="col-12 mb-4 pt-4">
        <button @click="vdata.clear=true" class="btn btn-danger fw-bold">Image Reset</button>
      </div>

      <!--  Vue Component -->
      <VueMultiImageUpload class="col-12 col-sm-10 col-md-8 col-lg-5 mt-3" :max="max" @data-image="images" :data-reset="vdata" :options="options" />

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
  name: "App",
  data(){
    return {
      vdata : {},
      options : {},
      max : 6
    }
  },
  methods:{
    images(e){
        let images = [];
        e.map(res=> images.push(res));
        console.log(images);
    },
    onChange(e){
      this.max = e.target.value;
    }
  },
  mounted(){
    // Options
    this.options.max = "Max";
    this.options.ready = "Ready";
    this.options.select = "Choosed";
  }
};
</script>

<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
}
</style>
