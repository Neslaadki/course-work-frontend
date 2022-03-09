<template>
  <div class="home">
    <my-header msg="Менеджер центров переработки"/>
  </div>
  <div>
    <list-scroll-admin/>
  </div>
  <body>

  </body>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import ListScroll from "@/components/ListScroll";
import MainMenu from "@/components/MainMenu";
import ListScrollManagerRC from "@/components/ListScrollManagerRC";
export default {
  name: 'AdminView',
  components: {
    'my-header':Header,
    'list-scroll-admin':ListScrollManagerRC,
    'main-menu':MainMenu
  }
}
</script>

<style>

</style>