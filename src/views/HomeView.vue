<template>
    <div class="home">
      <my-header msg="Главный менеджер"/>
    </div>
    <div>
      <list-scroll/>
    </div>
  <body>

  </body>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import ListScroll from "@/components/ListScroll";
import MainMenu from "@/components/MainMenu";

export default {
  name: 'HomeView',
  components: {
    'my-header':Header,
    'list-scroll':ListScroll,
    'main-menu':MainMenu
  }
}
</script>

<style>

</style>