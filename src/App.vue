<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
  <home />
  <router-view></router-view>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
}
</style>