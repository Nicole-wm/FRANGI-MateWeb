<template>
    <div class="typelist">
        <p>typelist</p>
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
export default {
    name: "home",
    data() {
        return {
            msg: "Welcome to typelist"
        };
    }
};
</script>

<style src='././assets/css/type_list.css' />