<template>

  <div class="main-menu">
    <div class="text-ex">
      <div class="header-menu">
        Информация о пробужденном
      </div>
    </div>
    <form @submit.prevent="InfoAwakener">
      <div class="input-row">
        <div>
          <div class="input-grid">
            <span class="p-float-label">
                <Dropdown class="my-drop" id="awakener" v-model="id_awakener_info" :options="awakeners"
                          option-value="id"
                          optionLabel="firstName"
                          :filter="true" filterPlaceholder="Введите данные"></Dropdown>
                <label for="awakener">Выберите пробужденного</label>
              </span>
          </div>
          <div>
            <Button id="button_force" type="submit" label="Получить информацию" icon="pi pi-check"
                    class="p-button-sm"></Button>
          </div>
        </div>
        <div class="scope-table">
          <!--          <table>-->
          <!--            <tr>-->
          <!--              <th>Имя</th>-->
          <!--              <th>Фамилия</th>-->
          <!--              <th>Опыт</th>-->
          <!--              <th>Страна</th>-->
          <!--              <th>Гильдия</th>-->
          <!--              <th>Ранг</th>-->
          <!--              <th>День рождения</th>-->
          <!--              <th>Время пробуждения</th>-->
          <!--            </tr>-->
          <!--            <tr>-->
          <!--              <td>{{info.firstName}}</td>-->
          <!--              <td>{{info.lastName}}</td>-->
          <!--              <td>{{info.experience}}</td>-->
          <!--              <td>{{info.countryId}}</td>-->
          <!--              <td>{{info.guildId}}</td>-->
          <!--              <td>{{info.rank}}</td>-->
          <!--              <td>{{birthDate}}</td>-->
          <!--              <td>{{awakeDateFormat}}</td>-->
          <!--            </tr>-->
          <!--          </table>-->
          <DataTable :value="mass" responsiveLayout="scroll">
            <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
          </DataTable>
        </div>

      </div>

      <!--        <button type="submit" class="send-button">Получить</button>-->
    </form>
  </div>


</template>

<script>
import axios from "axios";

export default {
  name: "InfoAboutAwakenerMenu",
  data() {
    return {
      columns: "",
      awakeners: null,
      id_awakener_info: null,
      showError: false,
      arrays: "",
      awakeDate: "",
      awakeDateFormat: "",
      birthDate: "",
      mass: []
    };
  },
  mounted() {
    this.columns = [
      {field: 'id', header: 'Id'},
      {field: 'firstName', header: 'Имя'},
      {field: 'lastName', header: 'Фамилия'},
      {field: 'experience', header: 'Опыт'},
      {field: 'countryName', header: 'Страна'},
      {field: 'rank', header: 'Ранг'},
      {field: 'birthday', header: 'Дата рождения'},
      {field: 'awakeTime', header: 'Дата пробуждения'}
    ];
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
    InfoAwakener: function () {
      let config = {
        headers: {}
      }

      axios.get(`http://localhost:` + this.myPort + `/getAwakenerInfo/` + this.id_awakener_info
          // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
          , config)
          .then(response => {
            console.log(response.data)
            this.arrays = response.data
            this.arrays.awakeTime = new Date(this.arrays.awakeTime).toLocaleDateString()
            this.arrays.birthday = new Date(this.arrays.birthday).toLocaleDateString()
            this.mass = []
            this.mass.push(this.arrays)
          }).catch(err => {
        console.log(err.toString())
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
  width: 49vw
}

#button_force .ui-button-text {
  line-height: 6120px;
  font-size: 20px;
}

.scope-table {
  margin-left: 2.6vw;
  width: 49.2vw;
}

table {
  width: 49.2vw;
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

td:first-child {
  background-color: rgba(74, 110, 180, 0.9);
  color: rgba(13, 26, 46, 1);
  padding: 10px 20px;
}
</style>