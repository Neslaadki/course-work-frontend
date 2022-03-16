<template>
  <div class="main-menu">
    <div class="text-ex">
      <div class="header-menu">
        Полная регистрация сотрудника в системе
      </div>
    </div>

    <form @submit.prevent="addEmployee">
      <div class="input-row">
        <!--        <div class="input-grid">-->
        <span class="p-float-label">
        	<InputText  id="name" type="text" v-model="name" mode="decimal"/>
	        <label for="name">Имя</label>
        </span>
        <span class="p-float-label">
        	<InputText  id="lastName" type="text" v-model="lastName" mode="decimal"/>
	        <label for="lastName">Фамилия</label>
        </span>
        <div class="block-dropdowns" >
          <span class="p-float-label">
          <Calendar class="my-drop" id="birthday" v-model="birthday" dateFormat="dd-mm-yy" />
	        <label for="birthday">Выберите дату рождения</label>
        </span>
          <span class="p-float-label">
                <Dropdown class="my-drop" id="country" v-model="country" :options="countries" option-value="id" optionLabel="name"
                          :filter="true" filterPlaceholder="Фильтр"></Dropdown>
                <label for="country">Выберите страну</label>
              </span>
          <span class="p-float-label">
                <Dropdown class="my-drop" id="positions" v-model="position_id" :options="list_positions" option-value="position_id"
                          optionLabel="position_name"
                          :filter="true" filterPlaceholder="Фильтр"></Dropdown>
                <label for="positions">Выберите должность</label>
              </span>
        </div>
        <span class="p-float-label">
        	<InputNumber min="0" id="exp" type="text" v-model="experience" mode="decimal"/>
	        <label for="exp">Опыт (кол-во лет) </label>
        </span>
        <span class="p-float-label">
        	<InputNumber min="1" max="7" id="level" type="text" v-model="access_level" mode="decimal"/>
	        <label for="level">Уровень доступа (от 1 до 7)</label>
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



<!--    <form @submit.prevent="addEmployee">
      <div class="input-row">
        <div class="input-grid">
          <input v-model="name" placeholder="Имя">
          <input v-model="surname" placeholder="Фамилия">
        </div>
        <div class="input-grid">
          <input type="date" v-model="birthday" placeholder="День рождения">
          <input v-model="native_country" placeholder="Страна рождения">
        </div>
        <div class="input-grid">
          <input v-model="experience" placeholder="Опыт работы">
          <input v-model="access_level" placeholder="Уровень доступа">
        </div>
        <div class="input-grid">
          <input v-model="login" placeholder="Логин">
          <input v-model="password" placeholder="Пароль">
        </div>
        <div class="input-grid">
          <input v-model="position_id" placeholder="ID Должности">
          <input v-model="guild_id" placeholder="ID Гильдии">
        </div>
      </div>
      <div >
        <button class="send-button" type="submit">Отправить</button>
      </div>
    </form>-->

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
      country: null,
      birthday: null,
      name: null,
      lastName: null,
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
    })
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
    addEmployee: function () {
      let config = {
        headers: {}
      }

      const date = new Date(this.birthday);
      let birthday_date = date.getTime();
      const userD = {
        firstName: this.name,
        lastName: this.lastName,
        birthday: birthday_date,
        countryId: this.country,
        positionId: this.position_id,
        experience: this.experience,
        accessLevel: this.access_level,
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
    }
  }
}


</script>

<style scoped>
.block-dropdowns{
  display: flex;
  justify-content: space-between;
}
.my-drop{
  width: 18vw
}
</style>