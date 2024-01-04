<template>
  <router-view />

  <button @click="handleAbout">about</button>
</template>

<script>
export default {
  methods: {
    handleAbout() {
      this.$router.push("/about");
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
