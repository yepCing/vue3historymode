<template>
  <div class="home">this is the first release</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
import { exporter } from "@web3-storage/fast-unixfs-exporter";
import filetypeinfo from "magic-bytes.js";

import ReadRootCID from "@/utils/readRootCid";
export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      blockStory: null,
      url: null,
    };
  },
  created() {
    // this.initBlockStory();
    // this.getData();
    this.test();
  },
  methods: {
    initBlockStory() {
      this.blockStory = {
        get: async function (key) {
          const res = await fetch(
            "https://" + key.toString() + ".ipfs.dweb.link?format=raw"
          );
          const buffer = await res.arrayBuffer();
          return new Uint8Array(buffer);
        },
        has: async function (key) {
          return true;
        },
      };
    },
    async getData() {
      const result = await exporter(
        "bafybeihocove6lbx7k72cwt5ckkizml4hevtvbtbt577ysnwexxasy2oa4",
        this.blockStory,
        {
          blockReadConcurrency: 5,
        }
      );
      console.log(result);
      if (result.type == "directory") {
        for await (const chunk of result.content()) {
          if (chunk.type == "directory") {
          } else if (chunk.type == "file") {
            const cid = chunk.cid.toString();
            console.log(cid);
            const { headers } = await axios.head("https://ipfs.io/ipfs/" + cid);
            console.log(headers["content-type"]);
          } else if (chunk.type == "raw") {
            let buffer = new ArrayBuffer(chunk.size);
            const uint8array = new Uint8Array(buffer);
            uint8array.set(chunk.node);
            const mime = filetypeinfo(uint8array)[0];
            console.log(mime, "mime1");
          } else {
          }
        }
      } else if (result.type == "file") {
        let buffer = new ArrayBuffer(result.size);
        const uint8array = new Uint8Array(buffer);
        let index = 0;
        for await (const chunk of result.content()) {
          // console.log(chunk);
          uint8array.set(chunk, index);
          index += chunk.byteLength;
          // console.log(chunk.buffer, "buffer");
        }
        const { mime } = filetypeinfo(uint8array)[0];
        console.log(mime, "mime1");

        // const file = new File([buffer], "4.mp4", { type: "video/mp4" });
        // console.log(file);
        // console.log(buffer);

        // const blob = new Blob([buffer], { type: mime });
        // console.log(blob);
        // const url = URL.createObjectURL(blob);
        // console.log(url);
        // this.url = url;
      } else if (result.type == "raw") {
        console.log(result.node, "raw");
        console.log(result.cid.toString());
      } else {
      }

      // for await (const chunk of recursive(
      //   "bafybeiekzocg65akybpki52anmbret75z6u555nwwqt2qarcgmxoppqsdq",
      //   this.blockStory
      // )) {
      //   console.log(chunk);
      //   for await (const chunk1 of chunk.content()) {
      //     console.log(chunk1);
      //   }
      //   break;
      // }

      // let cidInstance = new ReadRootCID(
      //   "bafybeihocove6lbx7k72cwt5ckkizml4hevtvbtbt577ysnwexxasy2oa4/测试-中隐-李永威 2022-04-04 11.11.31.mp4"
      // );
      // await cidInstance.getResult();
      // console.log(cidInstance.url);
    },
    async test() {
      let cidInstance = new ReadRootCID(
        "QmdevvCn8P2inYfye5LyXMAa2D2EERJMZjyzGHaR9yNvkA"
      );
      await cidInstance.getResult();
      console.log(cidInstance);
    },
  },
};
</script>
