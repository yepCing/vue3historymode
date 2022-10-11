<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>sdsdsdssdasdasd</h3>
    <h2>hahahahha</h2>
    <h3>sdsd</h3>
    <button @click="handleClick">按钮</button>
    <chart-map></chart-map>
  </div>
</template>
<script>
import chartMap from "@/components/map.vue";
export default {
  components: {
    chartMap,
  },
  methods: {
    handleClick() {
      this.$axios({
        methods: "get",
        url: "/test/2/users/1397852188097933316/followers",
        headers: {
          Authorization:
            "Bearer AAAAAAAAAAAAAAAAAAAAALdxhgEAAAAA4z0NpVl%2FC7sWqQppKDqqyhZvgcI%3DvdZwI7OukxUfIel5dSA7qxPk2KqRTSzB0RMBSFKfTPJCbgHbMx",
        },
      });
    },
  },
};
</script>