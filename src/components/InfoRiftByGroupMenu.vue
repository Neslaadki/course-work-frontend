<template>

  <div class="main-menu">
    <div class="text-ex">
      <div class="header-menu">
        Информация о доступных разломах
      </div>
    </div>
    <form @submit.prevent="GetMonsters">
      <div class="input-row">
        <div>
          <div class="input-grid">
            <span class="p-float-label">
                <Dropdown class="my-drop" id="rift" v-model="rift" :options="groups"
                          option-value="id"
                          optionLabel="name"
                          :filter="true" filterPlaceholder="Введите данные"></Dropdown>
                <label for="rift">Выберите группу</label>
              </span>
          </div>
          <br>
          <div>
            <Button id="button_force" type="submit" label="Получить информацию" icon="pi pi-check"
                    class="p-button-sm"></Button>
          </div>
        </div>
        <div class="input-row-scroll">
          <DataTable :value="rifts" responsiveLayout="scroll">
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
const options = {};
import {createApp} from "vue";
import {useToast} from "vue-toastification";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const app = createApp();
app.use(Toast, options);

export default {
  name: "InfoArtifactMenu",
  data() {
    return {
      rift: null,
      monster: null,
      rifts: null,
      arrays: null,
      columns: null,
      groups: null
    };
  },
  mounted() {
    this.columns = [
      {field: 'coordinateX', header: 'Координаты'},
      {field: 'id', header: 'Id'},
      {field: 'countryName', header: 'Страна'},
      {field: 'rank', header: 'Ранг'},
      {field: 'reward', header: 'Награда'},
    ];
    let config = {
      headers: {}
    }
    axios.get(`http://localhost:` + this.myPort + `/getGroupsMap`
        // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
    )
        .then(response => {
          console.log(response.data)
          this.groups = response.data
        }).catch(err => {
          console.log(err)
          return Promise.reject(err)})
  },
  methods: {
    GetMonsters: function (){
      axios.get(`http://localhost:` + this.myPort + `/getListRiftByGroupAndCountry/` + this.rift + '/' + localStorage.getItem('country_id')
          // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
          )
          .then(response => {
            console.log(response.data)
            this.rifts = response.data

            this.rifts.forEach(rift_one => {
              rift_one.coordinateX = '{' + rift_one.coordinateX + ', ' + rift_one.coordinateY + '}'
            })

            // this.monsters.forEach(monster => {
            //   monster.typeName = monster.monsterId + ': ' + monster.typeName
            // })
          }).catch(err => {
        console.log(err.toString())
      })
    },
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