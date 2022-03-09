<template>
  <div class="home">
    <my-header msg="Координатор"/>
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
import ListScrollCoordinator from "@/components/ListScrollCoordinator";
export default {
  name: 'CoordinatorView',
  components: {
    'my-header':Header,
    'list-scroll-admin':ListScrollCoordinator,
    'main-menu':MainMenu
  }
}
</script>

<style>

</style>