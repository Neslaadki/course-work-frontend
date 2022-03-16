<template>
  <form @submit.prevent="deleteAwakener">
    <div class="main-menu">
      <div class="text-ex">
        <div class="header-menu">
          Удаление пробужденного из системы
        </div>
      </div>
      <div class="input-row">
        <span class="p-float-label">
                <Dropdown class="my-drop" id="country" v-model="id_awakener" :options="awakeners" option-value="id"
                          optionLabel="firstName"
                ></Dropdown>
                <label for="country">Выберите id пробужденного</label>
              </span>
      </div>
      <div>
        <button type="submit" class="send-button">Удалить</button>
      </div>
    </div>
  </form>

</template>

<script>
import axios from "axios";
const options = {};
import { createApp } from "vue";
import { useToast } from "vue-toastification";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const app = createApp();
app.use(Toast, options);
export default {
  name: "DeleteAwakenerMenu",
  data() {
    return {
      awakeners: null,
      id_awakener: null,
      showError: false
    };
  },
  mounted() {
    let config = {
      headers: {}
    }
    axios.get(`http://localhost:` + this.myPort + `/getAwakenersInfo/` + localStorage.getItem("country_id")
        // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
        , config)
        .then(response => {
          console.log(response.data)
          this.awakeners = response.data
          this.awakeners.forEach(array => {
            array.firstName = array.id + ': ' + array.firstName + ' ' + array.lastName
          })
        }).catch(err => {
      console.log(err)
      return Promise.reject(err)
    })
  },
  methods: {
    deleteAwakener: function () {
      let config = {
        headers: {}
      }
      console.log('HUI')
      axios.delete(`http://localhost:`+ this.myPort +`/deleteAwakener/`+this.id_awakener
          // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
          , config)
          .then(response => {

            const toast = useToast();
            console.log(response.data)
            if(response.data.result == 'true') {
              toast.success("Успешно удалено", {
                timeout: 2000
              });
            }else{
              toast.error("Ошибка удаления", {
                timeout: 2000
              });
            }
          })
      console.log('HUI2')
    }
  }
}
</script>

<style scoped>

.block-dropdowns {
  display: flex;
  justify-content: space-between;
}

.my-drop {
  width: 54.5vw
}
</style>