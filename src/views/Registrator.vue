<template>
  <div class="home">
    <my-header msg="Регистратор"/>
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
import ListScrollRegistrator from "@/components/ListScrollRegistrator";
export default {
  name: 'AdminView',
  components: {
    'my-header':Header,
    'list-scroll-admin':ListScrollRegistrator,
    'main-menu':MainMenu
  }
}
</script>

<style>

</style>