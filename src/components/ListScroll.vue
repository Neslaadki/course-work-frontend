

<template>
  <div class="main_body">
    <div class="list-block">
      <button v-on:click="chooseAddAwakener">Добавить пробужденного</button>
      <button v-on:click="chooseDeleteAwakener">Удалить пробужденного</button>
      <button v-on:click="chooseInfoRifts">Список доступных разломов</button>
      <button v-on:click="chooseInfoAboutAwakener">Информация о пробужденном</button>
      <button v-on:click="chooseInfoAwakener">Список пробужденных</button>
      <button v-on:click="chooseAddGroup">Создать группу</button>
      <button v-on:click="chooseAddAwakenerInGroup">Добавить участников в группу</button>
      <button v-on:click="chooseDeleteAwakenerFromGroup">Удалить участников из группы</button>
    </div>
     <component v-bind:is="menuComponent"/>
  </div>
</template>


<style>

.main_body{
  background-color: rgba(206, 214, 220, 0.92);
  display: flex;
  justify-content: space-between;
  width: available;
}

.list-block {
  display: grid;
  margin: 10px;
  border-radius: 5px;
  background-color: rgba(124, 124, 129, 0.94);
  width: 35vw;
  height: 80vh;
  direction: rtl;
  overflow-y: scroll;
}

button {
  background-color: rgba(104, 104, 110, 0.94);
  margin: 15px;
  height: 60px;
  border-radius: 8px;
  font-size: 24px;
  font-weight: bold;
}

.list-block::-webkit-scrollbar {
  width: 13px;
  background-color: #666a6c;
}

.list-block::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: #4c4d4d;
}
</style>

<script>
import MainMenu from "@/components/MainMenu";
import InfoAboutAwakenerMenu from "@/components/InfoAboutAwakenerMenu";
import InfoAwakenerMenu from "@/components/InfoAwakenerMenu";
import InfoRiftsMenu from "@/components/InfoRiftsMenu";
import DeleteAwakenerFromGroupMenu from "@/components/DeleteAwakenerFromGroupMenu";
import DeleteAwakenerMenu from "@/components/DeleteAwakenerMenu";
import AddAwakenerInGroupMenu from "@/components/AddAwakenerInGroupMenu";
import AddGroupMenu from "@/components/AddGroupMenu";
import AddAwakenerMenu from "@/components/AddAwakenerMenu";

export default {
  name: "ListScroll",
  components: {
    MainMenu,
    InfoAboutAwakenerMenu,
    InfoAwakenerMenu,
    InfoRiftsMenu,
    DeleteAwakenerFromGroupMenu,
    DeleteAwakenerMenu,
    AddAwakenerInGroupMenu,
    AddAwakenerMenu,
    AddGroupMenu
  },
  data(){
    return{
      menuComponent:"MainMenu"
    }
  },
  methods: {
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
    }
  }
}
</script>
