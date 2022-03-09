<template>
  <div class="home">
    <my-header msg="Менеджер пробужденных"/>
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
import ListScrollManagerAwakeners from "@/components/ListScrollManagerAwakeners";
export default {
  name: 'AdminView',
  components: {
    'my-header':Header,
    'list-scroll-admin':ListScrollManagerAwakeners,
    'main-menu':MainMenu
  }
}
</script>

<style>

</style>