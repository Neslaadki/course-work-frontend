<template>

  <div class="main-menu">
    <div class="text-ex">
      <div class="header-menu">
        Регистрация разлома в системе
      </div>
    </div>
    <form @submit.prevent="addRift">
      <div class="input-row">
          <div class="p-float-label">
        	<InputText id="x" type="text" v-model="x"/>
	        <label for="x">Широта</label>
          </div>
          <div  class="p-float-label">
        	<InputText id="y" type="text" v-model="y"/>
	        <label for="y">Долгота</label>
          </div>

        <span class="p-float-label">
        	<InputNumber id="reward" type="text" v-model="reward" mode="decimal"/>
	        <label for="reward">Награда</label>
        </span>
          <span class="p-float-label">
                <Dropdown class="my-drop" id="country" v-model="country" :options="countries" option-value="id"
                          optionLabel="name"
                          :filter="true" filterPlaceholder="Фильтр"></Dropdown>
                <label for="country">Выберите страну</label>
              </span>
        <span class="p-float-label">
        	<InputNumber min="0" id="access_level" type="text" v-model="access_level" mode="decimal"/>
	        <label for="access_level">Уровень доступа</label>
        </span>
        <span class="p-float-label">
        	<InputNumber min="1" max="10" id="rank" type="text" v-model="rank" mode="decimal"/>
	        <label for="rank">Выберите ранг (от 1 до 10)</label>
        </span>
      </div>
      <div>
        <Button class="send-button" type="submit">Отправить</Button>
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
  name: "AddRiftMenu",
  data() {
    return {
      countries: null,
      x: null,
      y: null,
      reward: null,
      country: null,
      access_level: null,
      rank: null,
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
    })
  },
  methods: {
    addRift: function () {
      let config = {
        headers: {}
      }
      const coordinateD = {
        latitude: this.x,
        longitude: this.y
      }

      const userD = {
        coordinateId: null,
        countryId: this.country,
        rank: this.rank,
        accessLevel: this.access_level,
        reward: this.reward
      }

      console.log(userD)
      axios.post(`http://localhost:` + this.myPort + `/addCoordinate`,
          coordinateD                         // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
          )
          .then(responseCoor => {
            userD.coordinateId = responseCoor.data.id
            console.log(userD)
            axios.post(`http://localhost:` + this.myPort + `/addRift`,
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

<style scoped>

.block-dropdowns {
  display: flex;
  justify-content: space-between;
}

.my-drop {
  width: 54.5vw
}
</style>