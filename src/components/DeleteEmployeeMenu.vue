<template>
  <form @submit.prevent="deleteEmployee">
    <div class="main-menu">
      <div class="text-ex">
        <div class="header-menu">
          Удаление пробужденного из системы
        </div>
      </div>
      <div class="input-row">
        <div class="input-grid">
          <input v-model="id_awakener" placeholder="Id сотрудника">
        </div>
      </div>
      <div >
        <button type="submit" class="send-button">Удалить</button>
      </div>
    </div>
  </form>

</template>

<script>
import axios from "axios";

export default {
  name: "DeleteAwakenerMenu",
  data() {
    return {
      form: {
        id_awakener: "",
      },
      showError: false
    };
  },
  methods: {
    deleteEmployee: function () {
      let config = {
        headers: {}
      }
      axios.delete(`http://localhost:`+ this.myPort +`/deleteEmployee/`+this.id_awakener
          // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
          , config)
          .then(response => {
            console.log(response.data)
          })
    }
  }
}
</script>

<style>

/*.send-button {
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