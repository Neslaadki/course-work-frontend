<template>
  <div class="main-menu">
      <div class="text-ex">
        <div class="header-menu">
          Добавление пробужденного в группу
        </div>
      </div>
    <form @submit.prevent="addAwakenerInGroup">
      <div class="input-row">
        <div class="block-dropdowns">
          <span class="p-float-label">
                <Dropdown  @change="updateGroups" class="my-drop" id="awakener_id" v-model="id_awakener_in_group" :options="awakeners" option-value="id"
                          optionLabel="firstName"
                          :filter="true" filterPlaceholder="Фильтр"></Dropdown>
                <label for="awakener_id">Выберите пробужденного</label>
          </span>
          <span class="p-float-label">
                <Dropdown class="my-drop" id="group_id" v-model="id_group_to_add" :options="groups" option-value="id"
                          optionLabel="name"
                          :filter="true" filterPlaceholder="Фильтр"></Dropdown>
                <label for="group_id">Выберите группу</label>
          </span>
        </div>
      </div>

      <div>
        <Button class="send-button" type="submit">Добавить</Button>
      </div>
    </form>
  </div>
</template>

<script>

import axios from 'axios'
const options = {};
import { createApp } from "vue";
import { useToast } from "vue-toastification";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const app = createApp();
app.use(Toast, options);

export default {
  name: "AddAwakenerInGroupMenu",
  data() {
    return {
      final_groups: [],
      awakeners_in_group: null,
      groups: null,
      awakeners: null,
      id_awakener_in_group: null,
      id_group_to_add: null,
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
    updateGroups: function (){
      axios.get(`http://localhost:` + this.myPort + `/getGroupsMap`
          // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
          )
          .then(response => {
            console.log(response.data)
            this.groups = response.data
          }).catch(err => {
        console.log(err)
        return Promise.reject(err)
      })


      axios.get(`http://localhost:` + this.myPort + `/getAwakenersInGroupMap`
          // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
      )
          .then(response => {
            console.log(response.data)
            this.awakeners_in_group = response.data
          }).catch(err => {
        console.log(err)
        return Promise.reject(err)
      })
    },

    addAwakenerInGroup: function () {
      let config = {
        headers: {}
      }


      const userD = {
        human_id: this.id_awakener_in_group,
        group_id: this.id_group_to_add
      }


      axios.post(`http://localhost:` + this.myPort + `/addAwakenerToGroup`,
          userD
          , config)
          .then(response => {
            console.log(response)
            const toast = useToast();
            // Use it!
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