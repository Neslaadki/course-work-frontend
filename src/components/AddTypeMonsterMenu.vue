<template>

  <div class="main-menu">
    <div class="text-ex">
      <div class="header-menu">
        Добавление нового вида монстра
      </div>
    </div>
    <form @submit.prevent="addTypeMonster">
      <div class="input-row">
        <div class="input-grid">
          <InputText v-model="name" placeholder="Название вида"/>
        </div>
        <Textarea style="height: 40vh" v-model="description" placeholder="Введите описание"/>
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
import {createApp} from "vue";
import {useToast} from "vue-toastification";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default {
  name: "AddTypeMonster",
  data() {
    return {
      name: null,
      description: null,
      showError: false
    };
  },
  methods: {
    addTypeMonster: function () {
      let config = {
        headers: {}
      }


      const userD = {
        name: this.name,
        description: this.description,
        classTypeName: "MONSTER"
      }

      console.log(userD)
      axios.post(`http://localhost:` + this.myPort + `/addArtifactOrMonsterType`,
          userD                         // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
          , config)
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