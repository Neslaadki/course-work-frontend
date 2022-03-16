<template>

  <div class="main-menu">
    <div class="text-ex">
      <div class="header-menu">
        Регистрация пробужденного в системе
      </div>
    </div>
    <form @submit.prevent="addAwakener">
      <div class="input-row">
        <!--        <div class="input-grid">-->
        <span class="p-float-label">
        	<InputText id="name" type="text" v-model="name" mode="decimal"/>
	        <label for="name">Имя</label>
        </span>
        <span class="p-float-label">
        	<InputText id="lastName" type="text" v-model="lastName" mode="decimal"/>
	        <label for="lastName">Фамилия</label>
        </span>
        <div class="block-dropdowns">
          <span class="p-float-label">
          <Calendar class="my-drop" id="birthday" v-model="birthday" dateFormat="dd-mm-yy"/>
	        <label for="birthday">Выберите дату рождения</label>
        </span>
          <span class="p-float-label">
          <Calendar class="my-drop" id="awakeTime" v-model="awakeTime" dateFormat="dd-mm-yy"/>
	        <label for="awakeTime">Выберите дату пробуждения</label>
        </span>
          <span class="p-float-label">
                <Dropdown class="my-drop" id="country" v-model="country" :options="countries" option-value="id"
                          optionLabel="name"
                          :filter="true" filterPlaceholder="Фильтр"></Dropdown>
                <label for="country">Выберите страну</label>
              </span>
        </div>
        <span class="p-float-label">
        	<InputNumber min="0" id="exp" type="text" v-model="experience" mode="decimal"/>
	        <label for="exp">Опыт (кол-во лет) </label>
        </span>
        <span class="p-float-label">
        	<InputNumber min="1" max="7" id="rank" type="text" v-model="rank" mode="decimal"/>
	        <label for="rank">Выберите ранг (от 1 до 7)</label>
        </span>
        <!--        </div>-->
        <!--        <div class="input-grid">-->
        <!--        </div>-->
      </div>
      <div>
        <Button class="send-button" type="submit">Отправить</Button>
      </div>
      <!--      <div class="input-row">
              <div class="input-grid">
                <input v-model="name" placeholder="Имя">
                <input v-model="rank" placeholder="Ранг">
              </div>
              <div class="input-grid">
                <input v-model="surname" placeholder="Фамилия">
                <input v-model="experience" placeholder="Опыт">
              </div>
              <div class="input-grid">
                <input type="date" v-model="birthday" placeholder="Дата рождения">
                <Dropdown v-model="countryId" :options="countries" option-value="id" optionLabel="name"
                          placeholder="Выберите страну"></Dropdown>
              </div>

              <div class="input-grid">
                <input type="date" v-model="awaken_time" placeholder="Время пробуждения">
              </div>
            </div>
            <div>
              <button type="submit" class="send-button">Отправить</button>
            </div>-->
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

import axios from 'axios'

export default {
  name: "AddAwakenereMenu",
  data() {
    return {
      country: null,
      awakeTime: null,
      birthday: null,
      name: null,
      lastName: null,
      human_id: null,
      position_id: null,
      login: null,
      password: null,
      experience: null,
      access_level: null,
      countries: null,
      list_humans: null,
      list_positions: null,
      showError: false,
      rank: null
    };
  },
  mounted() {
    axios.get(`http://localhost:` + this.myPort + `/getPositionsMap`
        // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
    )
        .then(response => {
          console.log(response.data)
          this.list_positions = response.data
        }).catch(err => {
    })
    axios.get(`http://localhost:` + this.myPort + `/getCountryMap`
        // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
    )
        .then(response => {
          console.log(response.data)
          this.countries = response.data
        }).catch(err => {
    })
  },
  methods: {
    addAwakener: function () {
      let config = {
        headers: {}
      }

      const date = new Date(this.birthday);
      let birthday_date = date.getTime();
      const userD = {
        firstName: this.name,
        lastName: this.lastName,
        guildId: this.country,
        birthday: birthday_date,
        countryId: this.country,
        experience: this.experience,
        awakeTime: this.awakeTime,
        accessLevel: this.access_level,
        rank: this.rank
      }

      console.log(userD)
      axios.post(`http://localhost:` + this.myPort + `/addAwakener`,
          userD                         // судя из примеров body это тело запроса (axios преобразует автоматом в json формат)
          , config)
          .then(response => {
            console.log(response.data)
            // Get toast interface
            const toast = useToast();
            // Use it!
            if (response.data.result === 'true') {
              toast.success("Успешно добавлено", {
                timeout: 2000
              });
            } else if (response.data.result === 'false'){
              toast.error("Ошибка добавления", {
                timeout: 2000
              });
            } else {
              toast.error(response.data.result, {
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
  width: 18vw
}
</style>