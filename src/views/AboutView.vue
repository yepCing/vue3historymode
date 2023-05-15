<template>
  <div class="about">
    <h1>This is and2323232asdasd about page</h1>
    <h3>sdsdsdssdasdasd</h3>
    <h2>hahahahha</h2>
    <h3>sdsd</h3>

    <button @click="handleClick">按钮</button>
    88888
  </div>
</template>
<script>
const semver = require("semver");
import { multiaddr } from "@multiformats/multiaddr";

export default {
  data() {
    return {
      origin: "123",
    };
  },
  components: {},
  async created() {
    const version = this.matchNodeVersion(
      ["14.21.1", "16.18.1", "18.12.1"],
      ">=17.10.3 <19"
    );
    console.log(version);

    // try {
    //   const addr = multiaddr("/ip4/127.0.0.1/tcp/4001");
    //   console.log(addr);
    //   const addr1 = multiaddr("/ip23/124");
    //   console.log(addr1);
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      const data = await this.validOrigin();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    validOrigin() {
      return new Promise((resolve, reject) => {
        try {
          const addr = multiaddr(this.origin);
          resolve(true);
        } catch (error) {
          reject(false);
        }
      });
    },

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
    matchNodeVersion(supportedNodeList, userNodeVersion) {
      for (const node of supportedNodeList) {
        console.log(node, userNodeVersion);
        console.log(semver.satisfies(node, userNodeVersion));
        if (semver.satisfies(node, userNodeVersion)) return node.split(".")[0];
      }
      return undefined;
    },

    handleClick() {
      //  post
      gtag("event", "apiError", {
        event_category: "Videos",
        event_label: "Fall Campaign",
      });

      gtag("event", "apiError", {
        name: "ylq",
        age: 18,
      });
    },
  },
};
</script>