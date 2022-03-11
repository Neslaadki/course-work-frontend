<template>
  <div class="main-menu">
    <div class="text-ex">
      <div class="header-menu">
        Список пробужденных
      </div>
    </div>
    <div class="input-row-scroll">
      <table>
        <tr>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Опыт</th>
          <th>Страна</th>
          <th>Гильдия</th>
          <th>Ранг</th>
          <th>День рождения</th>
          <th>Время пробуждения</th>
        </tr>
        <tr v-for="info in arrays">
          <td>{{ info.firstName }}</td>
          <td>{{ info.lastName }}</td>
          <td>{{ info.experience }}</td>
          <td>{{ info.countryId }}</td>
          <td>{{ info.id_guild }}</td>
          <td>{{ info.rank }}</td>
          <td>{{ info.birthday }}</td>
          <td>{{ info.awakeTime }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "InfoAwakenerMenu",
  data() {
    return {
      form: {
        id_awakener: "",
      },
      showError: false,
      arrays: ""
    };
  },
  computed: {},
  methods: {},
  mounted() {
    let config = {
      headers: {}
    }
    axios.get(`http://localhost:38431/getEmployee/` + localStorage.getItem("country_id")
        // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
        , config)
        .then(response => {
          console.log(response.data)
          // this.arrays = response.data
          // this.arrays.forEach(array => {
          //   array.awakeTime = new Date(array.awakeTime).toLocaleDateString()
          //   array.birthday = new Date(array.birthday).toLocaleDateString()
          // })
        }).catch(err => {
      console.log(err)
      console.log("Твоя мама шлю")
      return Promise.reject(err)
    })
  }
}
</script>

<style>
/*
.send-button {
  margin-top: 80px;
  width: 30vw;
}

.input-row {
  height: 40vh;
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

input {
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

.input-grid {
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.header-menu {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
}

.main-menu {
  position: relative;
  margin: 10px;
  border-radius: 20px;
  background-color: rgba(235, 235, 243, 0.94);
  width: 60vw;
  height: 80vh;
}

.text-ex {

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