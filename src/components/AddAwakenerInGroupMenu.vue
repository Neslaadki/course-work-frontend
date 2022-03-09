<template>
  <div class="main-menu">
    <form @submit.prevent="addAwakenerInGroup">
      <div class="text-ex">
        <div class="header-menu">
          Добавление пробужденного в группу
        </div>
      </div>
      <div class="input-row">
        <div class="input-grid">
          <input v-model="id_awakener_in_group" placeholder="Id пробужденного">
          <input v-model="id_group_to_add" placeholder="Id группы">
        </div>
      </div>
      <div>
        <button class="send-button" type="submit">Добавить</button>
      </div>
    </form>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: "AddAwakenerInGroupMenu",
  data() {
    return {
      form: {
        id_awakener_in_group: "",
        id_group_to_add: "",
      },
      showError: false
    };
  },
  methods: {
    addAwakenerInGroup: function () {
      let config = {
        headers: {}
      }


      const userD = {
        human_id: this.id_awakener_in_group,
        group_id: this.id_group_to_add
      }


      axios.post(`http://localhost:8080/addAwakenerToGroup`,
          userD
          , config)
          .then(response => {
            console.log(response)
          })
    }
  }
}
</script>

<style>

</style>