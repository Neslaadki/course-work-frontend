<template>
  <div class="main-menu">
    <div class="text-ex">
      <div class="header-menu">
        Полная регистрация сотрудника в системе
      </div>
    </div>
    <form @submit.prevent="addEmployee">
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
    </form>

  </div>
</template>

<script>
import { createApp } from "vue";
import { useToast } from "vue-toastification";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const app = createApp();
const options = {
};
app.use(Toast, options);

import axios from 'axios'

export default {
  name: "AddHumanAndEmployeeMenu",
  data() {
    return {
      form: {
        name: "",
        surname: "",
        birthday: "",
        native_country: "",
        experience: "",
        access_level: "",
        login: "",
        password: "",
        position_id: "",
        guild_id: ""
      },
      showError: false
    };
  },
  methods: {
    addEmployee: function () {
      let config = {
        headers: {}
      }

      const date = new Date(this.birthday);
      console.log(date);
      console.log(this.birthday);
      console.log(this.birthday.value);
      const timestamp = date.getTime();

      const userD = {
        firstName: this.name,
        lastName: this.surname,
        birthday: timestamp,
        countryId: this.native_country,
        experience: this.experience,
        accessLevel: this.access_level,
        login: this.login,
        password: this.password,
        positionId: this.position_id,
        guild_id_country: this.guild_id
      }

      console.log(userD)
      axios.post(`http://localhost:8080/registration`,
          userD                         // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
          , config)
          .then(response => {
            console.log(response.data)
          })
    }
  }
}


</script>

<style>

/*.send-button{
  margin-top: 80px;
  width: 30vw;
}

.input-row{
  height: 40vh;
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

input{
  font-size: 24px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 10px;
  border-radius: 15px;
  color: aliceblue;
  background-color: #38393b;
  width: 20vw;
  height: 5vh;
}

.input-grid{
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.header-menu{
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
}

.main-menu{
  position: relative;
  margin: 10px;
  border-radius: 20px;
  background-color: rgba(235, 235, 243, 0.94);
  width: 60vw;
  height: 80vh;
}
.text-ex{

  position: relative;
  border-radius: 15px;
  background-color: #4c4d4d;
  margin-left: 3vw;
  margin-right: 3vw;
  margin-top: 3vh;
  font-size: 40px;
  height: 10vh;
}*/
</style>