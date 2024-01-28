import { createApp, ref, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let productModal = null;
let delProductModal = null;

const app = createApp({
  setup() {
    const apiUrl = ref('https://ec-course-api.hexschool.io/v2');
    const apiPath = ref('hexschool_api');
    const products = ref([]);
    const tempProduct = ref({});
    const isNew = ref(false);
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
    async function updateProduct() {
      console.log(isNew.value)
      const url = isNew.value
        ? `${apiUrl.value}/api/${apiPath.value}/admin/product`
        : `${apiUrl.value}/api/${apiPath.value}/admin/product/${tempProduct.value.id}`;

      try {
        const method = isNew.value ? axios.post : axios.put;
        const response = await method(url, { data: tempProduct.value });

        alert(response.data.message);
        productModal.hide();
        getData();
      } catch (err) {
        alert(err.response.data.message);
      }
    }
    function openModal( type,item) {
      switch (type) {
        case "new":
          tempProduct.value = {
            imagesUrl: [],
          };
          isNew.value = true;
          break;
        case "edit":
          tempProduct.value = { ...item };
          isNew.value = false;
          break;
        case "delete":
          tempProduct.value = { ...item };
          delProductModal.show();
          break;
      }
      type !== 'delete' ? productModal.show() :  delProductModal.show();
    }

    function deleteProduct() {
      const url = `${apiUrl.value}/api/${apiPath.value}/admin/product/${tempProduct.value.id}`;

      axios.delete(url).then((response) => {
        alert(response.data.message);
        delProductModal.hide();
        getData();
      }).catch((err) => {
        alert(err.response.data.message);
      })
    }
    function createProduct() {
      tempProduct.value.imagesUrl = [];
      tempProduct.value.imagesUrl.push('');
    }

    function addNewImage (){
      tempProduct.value.imagesUrl = [];
      tempProduct.value.imagesUrl.push('');
    }

    function addMoreImage(){
      tempProduct.value.imagesUrl.push('');
    }

    onMounted(() => {
      productModal = new bootstrap.Modal(document.getElementById('productModal'), {
        keyboard: false
      });
  
      delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
        keyboard: false
      });
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;

      checkAdmin();
      
    });
    return {
      products, tempProduct, openProduct, updateProduct, openModal,deleteProduct,createProduct,addNewImage,addMoreImage
    }
  }
})
app.mount("#app");