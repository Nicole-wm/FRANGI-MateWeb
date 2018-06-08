<template>
  <div>
    <div class="app-init">
      <router-view></router-view>
    </div>
    <footer class="footer clear">
      <router-link to="/home">
        <div class="footer-item">
          <p class="icon">
            <span class="fa fa-database"></span>
          </p>
          <p class="name">素材库</p>
        </div>
      </router-link>
      <router-link to="/matelist">
        <div class="footer-item">
          <p class="icon">
            <span class="fa fa-folder-o"></span>
          </p>
          <p class="name">全部素材</p>
        </div>
      </router-link>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import "./assets/css/public.css";
</style>