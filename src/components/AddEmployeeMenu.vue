<template>
  <div class="main-menu">
    <div class="text-ex">
      <div class="header-menu">
        Сокращенная регистрация сотрудника в системе
      </div>
    </div>
    <form @submit.prevent="addEmployeeEasy">
      <div class="input-row">
        <!--        <div class="input-grid">-->
        <span class="p-float-label">
                <Dropdown class="my-drop" id="human" v-model="human_id" :options="list_humans" option-value="id" optionLabel="firstName"
                          :filter="true" filterPlaceholder="Фильтр"></Dropdown>
                <label for="human">Выберите человека</label>
              </span>
        <span class="p-float-label">
                <Dropdown class="my-drop" id="positions" v-model="position_id" :options="list_positions" option-value="position_id"
                          optionLabel="position_name"
                          :filter="true" filterPlaceholder="Фильтр"></Dropdown>
                <label for="positions">Выберите должность</label>
              </span>


        <span class="p-float-label">
        	<InputNumber min="0" id="exp" type="text" v-model="experience" mode="decimal"/>
	        <label for="exp">Опыт (кол-во лет) </label>
        </span>
        <span class="p-float-label">
        	<InputNumber min="0" max="10" id="level" type="text" v-model="access_level" mode="decimal"/>
	        <label for="level">Уровень доступа (от 1 до 10)</label>
        </span>
        <!--        </div>-->
        <!--        <div class="input-grid">-->
        <span class="p-float-label">
        	<InputText min="1" id="login" type="text" v-model="login" mode="decimal"/>
	        <label for="login">Логин</label>
        </span>
        <span class="p-float-label">
        	<InputText min="1" id="password" type="password" v-model="password" mode="decimal"/>
	        <label for="password">Пароль</label>
        </span>
        <!--        </div>-->
      </div>
      <div>
        <Button class="send-button" type="submit">Отправить</Button>
      </div>
    </form>
  </div>
</template>

<script>
const options = {};
import {createApp} from "vue";
import {useToast} from "vue-toastification";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp();
app.use(Toast, options);

import axios from 'axios'

export default {
  name: "AddEmployeeMenu",
  data() {
    return {
      human_id: null,
      position_id: null,
      login: null,
      password: null,
      experience: null,
      access_level: null,
      countries: null,
      list_humans: null,
      list_positions: null,
      showError: false,
      form: {
        human_id: "",
        position_id: "",
        experience: "",
        access_level: "",
        login: "",
        password: "",
      },
    };
  },
  mounted() {
    axios.get(`http://localhost:` + this.myPort + `/getPositionsMap`
        // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
    )
        .then(response => {
          console.log(response.data)
          this.list_positions = response.data
        }).catch(err => {
      console.log("Пошел нахуй")
    })
    axios.get(`http://localhost:` + this.myPort + `/getHumansInfo/` + localStorage.getItem("country_id")
        // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
    )
        .then(response => {
          console.log(response.data)
          this.list_humans = response.data
          this.list_humans.forEach(human => {
            human.firstName = human.id + ': ' + human.firstName + ' ' + human.lastName
          })
        }).catch(err => {
      console.log("Пошел нахуй")
    })
  },
  methods: {
    addEmployeeEasy: function () {
      let config = {
        headers: {}
      }

      const userD = {
        id_human: this.human_id,
        positionId: this.position_id,
        experience: this.experience,
        accessLevel: this.access_level,
        countryId: localStorage.getItem('country_id'),
        login: this.login,
        password: this.password,
      }

      console.log(userD)
      axios.post(`http://localhost:` + this.myPort + `/registration`,
          userD                         // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
          , config)
          .then(response => {
            console.log(response.data)
            // Get toast interface
            const toast = useToast();
            // Use it!
            if (response.data.result == 'true') {
              toast.success("Успешно добавлено", {
                timeout: 2000
              });
            } else {
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
.my-drop{
  width: 54.5vw
}
</style>