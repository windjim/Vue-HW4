import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const url = "https://vue3-course-api.hexschool.io/v2";
const path = "lovecorgi";

import pagination from "./components/pagination.js";
import productModal from "./components/productModal.js";
import deleteModal from "./components/deleteModal.js";

const app = createApp({
  components: { pagination, productModal, deleteModal },
  data() {
    return {
      products: [],
      displayProduct: {},
      addData: {
        imagesUrl: [],
      },
      confirmState: "",
      pages: {},
    };
  },
  methods: {
    checkUser() {
      axios
        .post(`${url}/api/user/check`)
        .then((res) => {
          this.productList();
        })
        .catch((err) => {
          alert(err.data.message);
          window.location.href = "login.html";
        });
    },
    productList(page = 1) {
      axios
        .get(`${url}/api/${path}/admin/products?page=${page}`)
        .then((res) => {
          const { products, pagination } = res.data;
          this.products = products;
          this.pages = pagination;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    showModel(state, item) {
      if (state === "edit") {
        this.addData = { ...item };
        if (!Array.isArray(this.addData.imagesUrl)) {
          this.addData.imagesUrl = [];
        }
        this.comfirmState = "put";
        // this.bsModel.show();
        this.$refs.controlModal.openModal();
      } else if (state === "new") {
        this.addData = {
          imagesUrl: [],
        };
        this.comfirmState = "post";
        // this.bsModel.show();
        this.$refs.controlModal.openModal();
      } else {
        this.addData = { ...item };
        this.comfirmState = "delete";
        this.$refs.deleteModal.openModal();
      }
    },
    comfirmBtn() {
      let apiUrl = `${url}/api/${path}/admin/product/`;
      if (this.comfirmState === "put") {
        apiUrl = `${url}/api/${path}/admin/product/${this.addData.id}`;
      }
      axios[`${this.comfirmState}`](apiUrl, {
        data: this.addData,
      })
        .then((res) => {
          this.$refs.controlModal.hideModal();
          this.productList();
        })
        .catch((err) => {
          alert(err.data.message.join());
        });
    },
    deleteBtn() {
      axios[`${this.comfirmState}`](
        `${url}/api/${path}/admin/product/${this.addData.id}`
      )
        .then((res) => {
          this.$refs.deleteModal.hideModal();
          this.productList();
        })
        .catch((err) => {
          alert(err.data.message.join());
        });
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)VueHW3Token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // console.log(token);
    axios.defaults.headers.common["Authorization"] = token;
    this.checkUser();
  },
});

app.mount("#app");
