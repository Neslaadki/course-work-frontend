<template>
  <form @submit.prevent="InfoAwakener">
    <div class="main-menu">
      <div class="text-ex">
        <div class="header-menu">
          Информация о пробужденном
        </div>
      </div>
      <div class="input-row">
        <div class="input-grid">
          <input v-model="id_awakener" placeholder="Id пробужденного">
        </div>
        <div class="scope-table">
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
            <tr>
              <td>{{info.firstName}}</td>
              <td>{{info.lastName}}</td>
              <td>{{info.experience}}</td>
              <td>{{info.countryId}}</td>
              <td>{{info.id_guild}}</td>
              <td>{{info.rank}}</td>
              <td>{{birthDate}}</td>
              <td>{{awakeDateFormat}}</td>
            </tr>
          </table>
        </div>

      </div>
      <div >
        <button type="submit" class="send-button">Получить</button>
      </div>
    </div>
  </form>

</template>

<script>
import axios from "axios";

export default {
  name: "InfoAboutAwakenerMenu",
  data() {
    return {
      form: {
        id_awakener: "",
      },
      showError: false,
      info: "",
      awakeDate: "",
      awakeDateFormat: "",
      birthDate: ""
    };
  },
  methods: {
    InfoAwakener: function () {
      let config = {
        headers: {}
      }
      axios.get(`http://localhost:38431/getAwakenerInfo/`+this.id_awakener
          // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
          , config)
          .then(response => {
            console.log(response.data)
            this.info = response.data
            this.awakeDate = new Date(this.info.awakeTime)
            this.awakeDateFormat = this.awakeDate.toLocaleDateString()
            this.birthDate = new Date(this.info.birthday).toLocaleDateString()
          }).catch(err => {
        console.log("Пошел нахуй")
      })
    }
  }
}
</script>

<style scoped>

.scope-table{
  margin-left: 2vw;
  width:  49.2vw;
}
table {
  width:  49.2vw;
  font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
  font-size: 14px;
  border-collapse: collapse;
  text-align: center;
}

th {
  background-color: rgba(82, 123, 203, 0.9);
  color: rgba(13, 26, 46, 1);
  padding: 10px 20px;

}
td {
  background-color: rgba(115, 151, 220, 0.9);
}
th:first-child, td:first-child {
  text-align: left;
}

td:first-child{
  background-color: rgba(74, 110, 180, 0.9);
  color: rgba(13, 26, 46, 1);
  padding: 10px 20px;
}
</style>