<template>
  <div class="main-menu">
    <div class="text-ex">
      <div class="header-menu">
        Список центров переработки
      </div>
    </div>
    <div class="input-row-scroll">
      <DataTable :value="arrays" responsiveLayout="scroll">
        <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "InfoRecyclingMenu",
  data() {
    return {
      showError: false,
      columns: null,
      arrays: null
    };
  },
  computed: {

  },
  methods: {
  },
  mounted() {

    this.columns = [
      {field: 'coordinateName', header: 'Координаты \n {широта;долгота}'},
      {field: 'typeName', header: 'Тип'},
      {field: 'countryName', header: 'Страна'},
      {field: 'accessLevel', header: 'Уровень доступа'}
    ];

    let config = {
      headers: {}
    }
    axios.get(`http://localhost:` + this.myPort + `/getRCsListByEmployeeId/` + localStorage.getItem("id")
        // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
        , config)
        .then(response => {
          console.log(response.data)
          this.arrays = response.data
          this.arrays.forEach(array => {
            array.awakeTime = new Date(array.awakeTime).toLocaleDateString()
            array.birthday = new Date(array.birthday).toLocaleDateString()
          })
        }).catch(err => {
      console.log(err)
      console.log("Твоя мама шлю")
      return Promise.reject(err)
    })
  }
}
</script>

<style>
</style>