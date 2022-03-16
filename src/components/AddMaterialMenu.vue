<template>

  <div class="main-menu">
    <div class="text-ex">
      <div class="header-menu">
        Регистрация артефакта в системе
      </div>
    </div>
    <form @submit.prevent="addArtifact">
      <div class="input-row">
        <div>
          <div class="input-grid">
            <span class="p-float-label">
                <Dropdown @change="GetMonsters" class="my-drop" id="rift" v-model="rift" :options="rifts"
                          option-value="id"
                          optionLabel="coordinateX"
                          :filter="true" filterPlaceholder="Введите данные"></Dropdown>
                <label for="rift">Выберите разлом</label>
              </span>
          </div>
          <br>
          <div class="input-grid">
            <span class="p-float-label">
                <Dropdown class="my-drop" id="monster" v-model="monster" :options="monsters"
                          option-value="monsterId"
                          optionLabel="typeName"
                          :filter="true" filterPlaceholder="Введите данные"></Dropdown>
                <label for="monster">Выберите монстра</label>
              </span>
          </div>
          <br>
          <div class="input-grid">
            <span class="p-float-label">
        	<InputText id="name" class="my-drop" v-model="name"/>
	        <label for="name">Название материала</label>
            </span>
          </div>
          <br>
          <div style="" class="input-grid">
            <span class="p-float-label">
              <InputNumber id="price" class="my-drop" v-model="price"/>
              <label for="price">Цена</label>
            </span>
          </div>
        </div>
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

const app = createApp();
app.use(Toast, options);

export default {
  name: "AddArtifactMenu",
  data() {
    return {
      name: null,
      rift: null,
      monster: null,
      rifts: null,
      monsters: null,
      price: null,
      types: null,
      id_rift: "",
      id_type: "",
      showError: false
    };
  },
  mounted() {
    this.columns = [
      {field: 'name', header: 'Имя'},
      {field: 'materialId', header: 'Id'},
      {field: 'price', header: 'Цена'},
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
            this.rifts.forEach(monster => {
              monster.typeName = monster.monsterId + ': ' + monster.typeName
            })
          }).catch(err => {
        console.log(err.toString())
      })
    },
    addArtifact: function () {
      let config = {
        headers: {}
      }

      const userD = {
        monsterId: this.monster,
        price: this.price,
        name: this.name
      }

      console.log(userD)
      axios.post(`http://localhost:` + this.myPort + `/addMaterial`,
          userD                         // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
          , config)
          .then(response => {
            console.log(response.data)
            const toast = useToast();
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

<style scoped>
.block-dropdowns {
  display: flex;
  justify-content: space-between;
}

.my-drop {
  width: 49vw
}

.input-row-scroll {
  border-radius: 10px;
  height: 80vh;
  width: 50vw;
  overflow-y: auto;
  margin-left: 2.5vw;
  margin-top: 5vh;
}

.p-button-sm {
  margin-top: 30px;
}

.my-table {
  height: 60vh;
}

.input-row {
  height: 50vh;
  margin: 30px;
  margin-left: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>