<template>

  <div class="main-menu">
    <div class="text-ex">
      <div class="header-menu">
        Информация о монстрах
      </div>
    </div>
    <form @submit.prevent="GetMonsters">
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
          <br>
          <div>
            <Button id="button_force" type="submit" label="Получить информацию" icon="pi pi-check"
                    class="p-button-sm"></Button>
          </div>
        </div>
        <div class="input-row-scroll">
          <DataTable :value="monsters" responsiveLayout="scroll">
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
  name: "InfoMonsterMenu",
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
      {field: 'typeName', header: 'Имя'},
      {field: 'monsterId', header: 'Id'},
      {field: 'rank', header: 'Ранг'},
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
            rift.coordinateX = 'Id: ' + rift.id + ' Coordinates: {' + rift.coordinateX + ', ' + rift.coordinateY + '}'
          })
        }).catch(err => {
      console.log(err)
      return Promise.reject(err)
    })
  },
  methods: {
    GetMonsters: function (){
      axios.get(`http://localhost:` + this.myPort + `/getListMonsters/` + this.rift
          // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
          )
          .then(response => {
            console.log(response.data)
            this.monsters = response.data
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