<template>

  <div class="main-menu">
    <div class="text-ex">
      <div class="header-menu">
        Регистрация монстра в системе
      </div>
    </div>
    <form @submit.prevent="addArtifact">
      <div class="input-row">
        <div class="block-dropdowns">
          <Dropdown class="my-drop" v-model="id_rift" :options="rifts" option-value="id" option-label="coordinateX"
                    placeholder="Разлом обнаружения"/>
          <Dropdown class="my-drop" v-model="id_type" :options="types" option-value="typeId" option-label="name"
                    placeholder="Вид монстра"/>
        </div>
        <span style="margin-bottom: 150px" class="p-float-label">
        	<InputNumber v-model="rank" id="price"/>
	        <label for="price">Ранг монстра </label>
        </span>
      </div>
      <div>
        <Button type="submit" class="send-button">Отправить</Button>
      </div>
    </form>
  </div>


</template>

<script>
const options = {};
import { createApp } from "vue";
import { useToast } from "vue-toastification";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const app = createApp();
app.use(Toast, options);
import axios from "axios";

export default {
  name: "AddMonsterMenu",
  data() {
    return {
      rifts: null,
      types: null,
      id_rift: null,
      id_type: null,
      rank: null,
      showError: false
    };
  },
  mounted() {
    let config = {
      headers: {}
    }
    axios.get(`http://localhost:` + this.myPort + `/getTypesMap/MONSTER`
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
        rank: this.rank
      }

      console.log(userD)
      axios.post(`http://localhost:` + this.myPort + `/addMonster`,
          userD                         // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
          , config)
          .then(response => {
            console.log(response.data)
            const toast = useToast();
            if(response.data.result === 'true') {
              toast.success("Успешно добавлено", {
                timeout: 2000
              });
            }else if (response.data.result === 'rank'){
              toast.error("Ранг разлома должен быть не меньше ранга монстра", {
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