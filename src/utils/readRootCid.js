import { exporter } from "@web3-storage/fast-unixfs-exporter";
import filetypeinfo from "magic-bytes.js";
import axios from "axios";
class ReadRootCID {
  path;
  gateway;
  dir = [];
  extension;
  blockStory;
  self;
  constructor(path, gateway = "https://ipfs.io/ipfs/") {
    this.path = path;
    this.gateway = gateway;
    this.blockStory = {
      get: async function (key) {
        const res = await fetch(gateway + key.toString() + "?format=raw");
        const buffer = await res.arrayBuffer();
        return new Uint8Array(buffer);
      },
      has: async function (key) {
        return true;
      },
    };
  }
  async getResult() {
    const result = await exporter(this.path, this.blockStory);
    this.extension = this.#fileExtension(result.name);
    this.self = result;
    if (result.type == "directory") {
      const files = [];
      for await (const chunk of result.content()) {
        if (chunk.type == "directory") {
        } else if (chunk.type == "file") {
          const cid = chunk.cid.toString();
          const { headers } = await axios.head(this.gateway + cid);
          chunk.mimeType = headers["content-type"];
          chunk.extension = this.#fileExtension(chunk.name);
        } else if (chunk.type == "raw") {
          let buffer = new ArrayBuffer(chunk.size);
          const uint8array = new Uint8Array(buffer);
          uint8array.set(chunk.node);
          const mime = filetypeinfo(uint8array)[0];
          chunk.mimeType = mime;
          chunk.extension = this.#fileExtension(chunk.name);
        } else {
        }
        files.push(chunk);
        this.dir = files;
      }
    } else if (result.type == "file") {
      const cid = result.cid.toString();
      const { headers } = await axios.head(this.gateway + cid);
      result.mimeType = headers["content-type"];
      this.extension = this.#fileExtension(result.name);
    } else if (result.type == "raw") {
      let buffer = new ArrayBuffer(result.size);
      const uint8array = new Uint8Array(buffer);
      uint8array.set(result.node);
      const mime = filetypeinfo(uint8array)[0];
      result.mimeType = mime;
    } else {
    }
  }
  #fileExtension(name) {
    if (name && typeof name == "string") {
      let nameArr = name.split(".");
      console.log(nameArr);
      if (nameArr.length == 1) return;
      let extension = nameArr[nameArr.length - 1];
      return extension;
    }
  }
}
export default ReadRootCID;
