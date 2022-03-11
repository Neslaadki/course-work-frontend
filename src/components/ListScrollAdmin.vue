

<template>
  <div class="main_body">
    <div class="list-block">
      <button v-on:click="chooseAddEmployee">Добавить сотрудника</button>
      <button v-on:click="chooseAddHuman">Добавить человека и сотрудника</button>
      <button v-on:click="chooseAddAwakener">Добавить пробужденного</button>
      <button v-on:click="chooseDeleteAwakener">Удалить пробужденного</button>
<!--      <button v-on:click="chooseInfoRifts">Список доступных разломов</button>-->
      <button v-on:click="chooseInfoAboutAwakener">Информация о пробужденном</button>
      <button v-on:click="chooseInfoAwakener">Список пробужденных</button>
      <button v-on:click="chooseAddGroup">Создать группу</button>
      <button v-on:click="chooseAddAwakenerInGroup">Добавить участников в группу</button>
      <button v-on:click="chooseDeleteAwakenerFromGroup">Удалить участников из группы</button>

      <button v-on:click="chooseAddArtifact">Добавить артефакт</button>
      <button v-on:click="chooseAddTypeArtifact">Добавить вид артефакта</button>
      <button v-on:click="chooseAddRift">Добавить разлом</button>
      <button v-on:click="chooseUpdateRift">Обновить статус разлома</button>
      <button v-on:click="chooseAddMonster">Добавить монстра</button>
      <button v-on:click="chooseAddTypeMonster">Добавить вид монстра</button>
      <button v-on:click="chooseCloseRift">Закрыть разлом</button>

      <button v-on:click="chooseAddRecycling">Добавить Центр переработки</button>
      <button v-on:click="chooseDeleteRecycling">Удалить Центр переработки</button>
      <button v-on:click="chooseInfoRecycling">Вывести список центров переработки</button>

<!--      <button v-on:click="chooseInfoEmployee">Вывести список сотрудников</button>
      <button v-on:click="chooseDeleteEmployee">Удалить сотрудника</button>-->
    </div>
     <component v-bind:is="menuComponent"/>
  </div>
</template>


<style scoped>
.main_body{
  background-color: rgba(122, 215, 244, 0.42);
  display: flex;
  justify-content: space-between;
  width: available;
}

.list-block {
  display: grid;
  margin: 10px;
  border-radius: 5px;
  background-color: rgba(86, 131, 169, 0.75);
  width: 35vw;
  height: 80vh;
  direction: rtl;
  overflow-y: scroll;
}

button {
  background-color: rgba(82, 123, 203, 0.9);;
  color: #0e192d;
  margin: 15px;
  height: 60px;
  border-radius: 8px;
  font-size: 24px;
  font-weight: bold;
}

.list-block::-webkit-scrollbar {
  width: 13px;
  background-color: rgba(50, 83, 147, 0.89);
}

.list-block::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: rgba(81, 113, 171, 0.82);
}
</style>

<script>
import { createApp } from "vue";
import { useToast } from "vue-toastification";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const app = createApp();
const options = {
  // You can set your default options here
};
app.use(Toast, options);

import MainMenu from "@/components/MainMenu";
import InfoAboutAwakenerMenu from "@/components/InfoAboutAwakenerMenu";
import InfoAwakenerMenu from "@/components/InfoAwakenerMenu";
import InfoRiftsMenu from "@/components/InfoRiftsMenu";
import DeleteAwakenerFromGroupMenu from "@/components/DeleteAwakenerFromGroupMenu";
import DeleteAwakenerMenu from "@/components/DeleteAwakenerMenu";
import AddAwakenerInGroupMenu from "@/components/AddAwakenerInGroupMenu";
import AddGroupMenu from "@/components/AddGroupMenu";
import AddAwakenerMenu from "@/components/AddAwakenerMenu";
import AddEmployeeMenu from "@/components/AddEmployeeMenu";
import AddHumanAndEmployeeMenu from "@/components/AddHumanAndEmployeeMenu";
import AddMonsterMenu from "@/components/AddMonsterMenu";
import AddArtifactMenu from "@/components/AddArtifactMenu";
import AddRiftMenu from "@/components/AddRiftMenu";
import AddTypeMonsterMenu from "@/components/AddTypeMonsterMenu";
import AddTypeArtifactMenu from "@/components/AddTypeArtifactMenu";
import CloseRiftMenu from "@/components/CloseRiftMenu";
import UpdateRiftMenu from "@/components/UpdateRiftMenu";
import AddRecyclingMenu from "@/components/AddRecyclingMenu";
import DeleteRecyclingMenu from "@/components/DeleteRecyclingMenu";
import InfoRecyclingMenu from "@/components/InfoRecyclingMenu";
import InfoEmployeeMenu from "@/components/InfoEmployeeMenu";
import DeleteEmployeeMenu from "@/components/DeleteEmployeeMenu";

export default {
  name: "ListScroll",
  components: {
    AddHumanAndEmployeeMenu,
    MainMenu,
    InfoAboutAwakenerMenu,
    InfoAwakenerMenu,
    InfoRiftsMenu,
    DeleteAwakenerFromGroupMenu,
    DeleteAwakenerMenu,
    AddAwakenerInGroupMenu,
    AddAwakenerMenu,
    AddGroupMenu,
    AddEmployeeMenu,
    AddMonsterMenu,
    AddRiftMenu,
    AddTypeMonsterMenu,
    AddArtifactMenu,
    AddTypeArtifactMenu,
    CloseRiftMenu,
    UpdateRiftMenu,
    AddRecyclingMenu,
    DeleteRecyclingMenu,
    InfoRecyclingMenu,
    InfoEmployeeMenu,
    DeleteEmployeeMenu
  },
  data(){
    return{
      menuComponent:"MainMenu"
    }
  },
  setup() {
    // Get toast interface
    const toast = useToast();


    return { toast }
  },
  methods: {
    chooseAddHuman(){
      // this.toast.info("Сосать", {
      //   timeout: 2000
      // });
      this.menuComponent = AddHumanAndEmployeeMenu;
    },
    chooseAddEmployee(){
      this.menuComponent = AddEmployeeMenu;
    },
    chooseInfoAboutAwakener(){
      this.menuComponent = InfoAboutAwakenerMenu;
    },
    chooseInfoAwakener(){
      this.menuComponent = InfoAwakenerMenu;
    },
    chooseInfoRifts(){
      this.menuComponent = InfoRiftsMenu;
    },
    chooseDeleteAwakenerFromGroup(){
      this.menuComponent = DeleteAwakenerFromGroupMenu;
    },
    chooseDeleteAwakener(){
      this.menuComponent = DeleteAwakenerMenu;
    },
    chooseAddAwakenerInGroup(){
      this.menuComponent = AddAwakenerInGroupMenu;
    },
    chooseAddAwakener(){
      this.menuComponent = AddAwakenerMenu;
    },
    chooseAddGroup(){
      this.menuComponent = AddGroupMenu;
    },
    chooseAddMonster(){
      this.menuComponent = AddMonsterMenu;
    },
    chooseAddArtifact(){
      this.menuComponent = AddArtifactMenu;
    },
    chooseAddRift(){
      this.menuComponent = AddRiftMenu;
    },
    chooseAddTypeMonster(){
      this.menuComponent = AddTypeMonsterMenu;
    },
    chooseAddTypeArtifact(){
      this.menuComponent = AddTypeArtifactMenu;
    },
    chooseUpdateRift(){
      this.menuComponent = UpdateRiftMenu;
    },
    chooseCloseRift(){
      this.menuComponent = CloseRiftMenu;
    },
    chooseAddRecycling(){
      this.menuComponent = AddRecyclingMenu;
    },
    chooseDeleteRecycling(){
      this.menuComponent = DeleteRecyclingMenu;
    },
    chooseInfoRecycling(){
      this.menuComponent = InfoRecyclingMenu;
    },
    chooseInfoEmployee(){
      this.menuComponent = InfoEmployeeMenu;
    },
    chooseDeleteEmployee(){
      this.menuComponent = DeleteEmployeeMenu;
    }
  }
}
</script>
