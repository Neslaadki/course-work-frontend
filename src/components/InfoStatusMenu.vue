<template>

  <div class="main-menu">
    <div class="text-ex">
      <div class="header-menu">
        Информация о материалах
      </div>
    </div>
    <form @submit.prevent="InfoAwakener">
      <div class="input-row">
        <div>
          <div class="input-grid">
            <span class="p-float-label">
                <Dropdown class="my-drop" id="rift" v-model="rift" :options="rifts"
                          option-value="id"
                          optionLabel="coordinateX"
                          :filter="true" filterPlaceholder="Введите данные"></Dropdown>
                <label for="rift">Выберите разлом</label>
              </span>
          </div>
          <div>
            <Button id="button_force" type="submit" label="Получить информацию" icon="pi pi-check"
                    class="p-button-sm"></Button>
          </div>
        </div>
        <div class="input-row-scroll">
          <DataTable :value="arrays" responsiveLayout="scroll">
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
  name: "InfoStatusMenu",
  data() {
    return {
      rift: null,
      monster: null,
      rifts: null,
      monsters: null,
      arrays: null,
      columns: null
    };
  },
  mounted() {
    this.columns = [
      {field: 'time', header: 'Дата изменения'},
      {field: 'id', header: 'Id'},
      {field: 'groupName', header: 'Группа зачистки'},
      {field: 'openTime', header: 'Дата открытия'},
      {field: 'riftCondition', header: 'Состояние разлома'},
    ];
    let config = {
      headers: {}
    }
    axios.get(`http://localhost:` + this.myPort + `/getRiftMap`
        // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
        , config)
        .then(response => {
          console.log(response.data)
          this.rifts = response.data
          this.rifts.forEach(rift => {
            rift.coordinateX = rift.id + ': ' + rift.coordinateX + ', ' + rift.coordinateY
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

      axios.get(`http://localhost:` + this.myPort + `/getListRiftStatusesByRiftId/` + this.rift
          // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
          , config)
          .then(response => {
            console.log(response.data)
            this.arrays = response.data
            this.arrays.forEach(array => {
              array.time = new Date(array.time).toLocaleDateString()
              array.openTime = new Date(array.openTime).toLocaleDateString()
              if (array.riftCondition === false){
                array.riftCondition = 'Закрыт'
              } else {
                array.riftCondition = 'Открыт'
              }
            })
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

.input-row-scroll{
  border-radius: 10px;
  height: 80vh;
  width: 50vw;
  overflow-y: auto;
  margin-left: 2.5vw;
  margin-top: 5vh;
}
.p-button-sm{
  margin-top: 30px;
}

.my-table {
  height: 60vh;
}
.input-row{
  height: 60vh;
  margin: 30px;
  margin-left: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>