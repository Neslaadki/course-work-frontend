<template>

  <div class="main-menu">
    <div class="text-ex">
      <div class="header-menu">
        Обновление состояния разлома
      </div>
    </div>
    <form @submit.prevent="addRift">
      <div class="input-row">
        <span class="p-float-label">
                <Dropdown class="my-drop" id="rift" v-model="rift" :options="rifts"
                          option-value="id"
                          optionLabel="coordinateX"
                          :filter="true" filterPlaceholder="Введите данные"></Dropdown>
                <label for="rift">Выберите разлом</label>
        </span>

        <span class="p-float-label">
                <Dropdown class="my-drop" id="group_id" v-model="id_group_to_add" :options="groups" option-value="id"
                          optionLabel="name"
                          :filter="true" filterPlaceholder="Фильтр"></Dropdown>
                <label for="group_id">Выберите группу</label>
          </span>
        <div style="display: flex; justify-content: center;">
          <div style="background-color: white; width: 30vw; height: 9vh; border-radius: 9px">
            <label style="color:#4c4d4d; font-size: 20px" for="selectButton">Выберите состояние разлома</label>
            <SelectButton id="selectButton" v-model="selectCondition" :options="booleanCheck" optionLabel="name" option-value="result" />
          </div>
        </div>
        <span class="p-float-label">
          <Calendar class="my-drop" id="awakeTime" v-model="openTime" dateFormat="dd-mm-yy"/>
	        <label for="awakeTime">Выберите дату открытия разлома</label>
        </span>
      </div>
      <div>

        <Button class="send-button" type="submit">Отправить</Button>
      </div>
    </form>
  </div>
</template>

<script>
const options = {};
import {createApp} from "vue";
import {useToast} from "vue-toastification";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const app = createApp();
app.use(Toast, options);
import axios from "axios";

export default {
  name: "AddRiftMenu",
  data() {
    return {
      booleanCheck: [{name: 'Открыт', result: 'false'},{name: 'Закрыт', result: 'true'}],
      id_group_to_add: null,
      countries: null,
      x: null,
      y: null,
      reward: null,
      country: null,
      access_level: null,
      rank: null,
      showError: false,
      rifts: null,
      rift: null,
      groups: null,
      group_id: null,
      selectCondition: null,
      openTime: null
    };
  },
  mounted() {
    axios.get(`http://localhost:` + this.myPort + `/getRiftMap`
        // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
        )
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
    axios.get(`http://localhost:` + this.myPort + `/getGroupsMap`
        // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
    )
        .then(response => {
          console.log(response.data)
          this.groups = response.data
        }).catch(err => {
      console.log(err)
      return Promise.reject(err)
    })
  },

  methods: {
    addRift: function () {
      let config = {
        headers: {}
      }

      const userD = {
        riftId: this.rift,
        groupId:this.id_group_to_add,
        firstCondition: this.selectCondition,
        openTime: this.openTime,
        result: this.selectCondition

      }
      if(userD.result === 'true'){
        userD.result = 'false'
      } else {
        userD.result = 'true'
      }
      console.log(userD)
      axios.post(`http://localhost:` + this.myPort + `/addRiftStatus`,
          userD                         // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
          , config)
          .then(response => {
            console.log(response.data)
            const toast = useToast();
            if (response.data.result === 'true') {
              toast.success("Успешно обновлено", {
                timeout: 2000
              });
            } else {
              toast.error("Слишком низкий уровень группы", {
                timeout: 4000
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
  width: 54.5vw
}

</style>