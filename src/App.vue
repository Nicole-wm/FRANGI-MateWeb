<template>
  <div class="page-content">
    <div class="app-init clear">
      <router-view></router-view>
    </div>
    <footer class="footer clear" v-bind:class="{ 'leave': !$route.meta.navShow }">
      <router-link to="/home" tag="div">
        <div class="footer-item">
          <p class="icon">
            <span class="fa fa-database"></span>
          </p>
          <p class="name">素材库</p>
        </div>
      </router-link>
      <router-link to="/matelist/all/all" tag="div">
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

<style>
@import "./assets/css/public.css";
</style>