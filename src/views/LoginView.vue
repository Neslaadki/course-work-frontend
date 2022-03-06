<template>
  <div class="home">
    <my-header msg="По логину"/>
  </div>
  <body>

  </body>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    'my-header':Header
  }
}
</script>
