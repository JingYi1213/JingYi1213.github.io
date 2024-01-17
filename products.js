import { createApp,ref ,onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// createApp({
//   data() {
//     return {
//       apiUrl: 'https://ec-course-api.hexschool.io/v2/',
//       apiPath: 'hexschool_api',
//       products: [],
//       tempProduct: {},
//     }
//   },
//   methods: {
//     checkAdmin() {
//       const url = `${this.apiUrl}/api/user/check`;
//       axios.post(url)
//         .then(() => {
//           this.getData();
//         })
//         .catch((err) => {
//           alert(err.response.data.message)
//           window.location = 'login.html';
//         })
//     },
//     getData() {
//       const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
//       axios.get(url)
//         .then((response) => {
//           this.products = response.data.products;
//         })
//         .catch((err) => {
//           alert(err.response.data.message);
//         })
//     },
//     openProduct(item) {
//       this.tempProduct = item;
//     }
//   },
//   mounted() {
//     // 取出 Token
//     const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
//     axios.defaults.headers.common.Authorization = token;

//     this.checkAdmin()
//   }
// }).mount('#app');

const app = createApp({
  setup(){
    const apiUrl = ref('https://ec-course-api.hexschool.io/v2/');
    const apiPath = ref('hexschool_api');
    const products = ref([]);
    const tempProduct = ref({});
    function checkAdmin() {
      const url = `${apiUrl.value}/api/user/check`;
      axios.post(url)
        .then(() => {
          getData();
        })
        .catch((err) => {
          alert(err.response.data.message)
          window.location = 'login.html';
        })
    }
    function getData() {
      const url = `${apiUrl.value}/api/${apiPath.value}/admin/products`;
      axios.get(url)
        .then((response) => {
          products.value = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    }
    function openProduct(item) {
      tempProduct.value = item;
    }

    onMounted(() => {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;
  
      checkAdmin()
    });
    return{
      products,tempProduct,openProduct
    }
  }
})
app.mount("#app");