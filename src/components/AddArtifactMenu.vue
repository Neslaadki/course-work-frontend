<template>

  <div class="main-menu">
    <div class="text-ex">
      <div class="header-menu">
        Регистрация артефакта в системе
      </div>
    </div>
    <form @submit.prevent="addArtifact">
      <div class="input-row">
        <div class="block-dropdowns">
          <Dropdown class="my-drop" v-model="id_rift" :options="rifts"  option-value="id" option-label="coordinateX" placeholder="Разлом обнаружения"/>
          <Dropdown class="my-drop" v-model="id_type" :options="types"  option-value="typeId"  option-label="name" placeholder="Вид артефакта"/>
        </div>
        <span style="margin-bottom: 150px" class="p-float-label">
        	<InputNumber v-model="price" id="price"/>
	        <label for="price">Цена артефакта </label>
        </span>
      </div>
      <div>
        <Button type="submit" class="send-button">Отправить</Button>
      </div>
    </form>
  </div>


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
  name: "AddArtifactMenu",
  data() {
    return {
      price: null,
      rifts: null,
      types: null,
      id_rift: "",
      id_type: "",
      showError: false
    };
  },
  mounted() {
    let config = {
      headers: {}
    }
    axios.get(`http://localhost:` + this.myPort + `/getTypesMap/ARTIFACT`
        // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
        , config)
        .then(response => {
          console.log(response.data)
          this.types = response.data
        }).catch(err => {
      console.log(err)
      return Promise.reject(err)
    })

    axios.get(`http://localhost:` + this.myPort + `/getListRifts/` + localStorage.getItem('country_id')
        // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
        , config)
        .then(response => {
          console.log(response.data)
          this.rifts = response.data
          this.rifts.forEach(rift => {
            rift.coordinateX = rift.id + ': {' +  rift.coordinateX + '; ' + rift.coordinateY + '}'
          })

        }).catch(err => {
      console.log(err)
      return Promise.reject(err)
    })
  },
  methods: {
    addArtifact: function () {
      let config = {
        headers: {}
      }

      const userD = {
        id_rift: this.id_rift,
        id_type: this.id_type,
        price: this.price
      }

      console.log(userD)
      axios.post(`http://localhost:` + this.myPort + `/addArtifact`,
          userD                         // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
          , config)
          .then(response => {
            console.log(response.data)
            const toast = useToast();
            if(response.data.result === 'true') {
              toast.success("Успешно добавлено", {
                timeout: 2000
              });
            }else{
              toast.error("Ошибка добавления", {
                timeout: 2000
              });
            }
          })
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
  width: 25vw
}
</style>