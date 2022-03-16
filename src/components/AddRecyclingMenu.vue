<template>

  <div class="main-menu">

    <div class="text-ex">
      <div class="header-menu">
        Регистрация центра переработки
      </div>
    </div>
    <form @submit.prevent="addRC">
      <div class="input-row">
        <div class="p-float-label">
          <InputText id="x" type="text" v-model="x"/>
          <label for="x">Широта</label>
        </div>
        <div  class="p-float-label">
          <InputText id="y" type="text" v-model="y"/>
          <label for="y">Долгота</label>
        </div>
        <div class="block-dropdowns">
          <span class="p-float-label">
                <Dropdown class="my-drop" id="country" v-model="country" :options="countries" option-value="id"
                          optionLabel="name"
                          :filter="true" filterPlaceholder="Фильтр"></Dropdown>
                <label for="country">Выберите страну</label>
              </span>
          <span class="p-float-label">
                <Dropdown class="my-drop" id="type" v-model="type" :options="types" option-value="typeId"
                          optionLabel="name"
                          :filter="true" filterPlaceholder="Фильтр"></Dropdown>
                <label for="type">Выберите тип</label>
              </span>
        </div>

        <span class="p-float-label">
        	<InputNumber min="0" id="access_level" type="text" v-model="access_level" mode="decimal"/>
	        <label for="access_level">Уровень доступа</label>
        </span>
      </div>
      <div>
        <button type="submit" class="send-button">Отправить</button>
      </div>
    </form>
  </div>

</template>

<script>
import axios from "axios";
const options = {};
import {createApp} from "vue";
import {useToast} from "vue-toastification";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const app = createApp();
app.use(Toast, options);

export default {
  name: "AddRecyclingMenu",
  data() {
    return {
      x: null,
      y: null,
      country: null,
      type: null,
      access_level: null,
      countries: null,
      types: null,
      showError: false
    };
  },
  mounted() {
    axios.get(`http://localhost:` + this.myPort + `/getCountryMap`
        // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
    )
        .then(response => {
          console.log(response.data)
          this.countries = response.data
        }).catch(err => {
      console.log("Пошел нахуй")
    })
    axios.get(`http://localhost:` + this.myPort + `/getTypesMap/RECYCLING`
        // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
        )
        .then(response => {
          console.log(response.data)
          this.types = response.data
        }).catch(err => {
      console.log(err)
      return Promise.reject(err)
    })
  },
  methods: {
    addRC: function () {
      let config = {
        headers: {}
      }
      const coordinateD = {
        latitude: this.x,
        longitude: this.y
      }
      const userD = {
        coordinateId: null,
        typeId: this.type,
        countryId: this.country,
        access_level: this.access_level
      }

      console.log(userD)
      axios.post(`http://localhost:` + this.myPort + `/addCoordinate`,
          coordinateD                         // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
      )
          .then(responseCoor => {
            userD.coordinateId = responseCoor.data.id
            console.log(userD)
            axios.post(`http://localhost:` + this.myPort + `/addRc`,
                userD                         // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
            )
                .then(response => {
                  console.log(response.data)
                  const toast = useToast();
                  // Use it!
                  if (response.data.result === 'true') {
                    toast.success("Успешно добавлено", {
                      timeout: 2000
                    });
                  } else {
                    toast.error("Ошибка добавления", {
                      timeout: 2000
                    });
                  }

                })
          })
    }
  }
}
</script>

<style>
.block-dropdowns {
  display: flex;
  justify-content: space-between;
}

.my-drop {
  width: 25vw
}
</style>