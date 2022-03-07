<template>
    <div class="home">
      <my-header msg="Главный менеджер пробужденных"/>
    </div>
    <div>
      <list-scroll/>
    </div>
  <body>

  </body>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue'
import ListScroll from "@/components/ListScroll";
import MainMenu from "@/components/MainMenu";

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    'my-header':Header,
    'list-scroll':ListScroll,
    'main-menu':MainMenu
  }
}
</script>

<style>
.main_body{
  background-color: rgba(206, 214, 220, 0.92);
  display: flex;
  justify-content: space-between;
  width: available;
}

</style>