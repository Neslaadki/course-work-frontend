<link rel="stylesheet" type="text/css" href="/css/header.css">
<link rel="stylesheet" type="text/css" href="/css/change_button_color.css">

<template>
  <header>
    <div class="main_head">
      <div class="emp_name">
        <div class="head-msg">
          <h1>{{ msg }}</h1>
        </div>
        <div class="exit">
          <router-link class="exit_button" to="/login">Выйти</router-link>
        </div>
      </div>
    </div>

  </header>
</template>

<script>
export default {
  name: 'my-header',
  props: {
    msg: String
  }
}
</script>

<style scoped>

.head-msg{
  margin-top: 2vh;
}
.exit {
  margin-top: 1.5vh;
  margin-right: 40px;
}

.exit_button {
  margin: 10px;
  padding: 10px 20px;
  background-color: rgba(56, 110, 155, 0.96);
  border-radius: 4px;
  color: rgba(13, 26, 46, 0.88);
  font-size: 40px;
  text-decoration: none;
}

.emp_name {

  margin-left: 20px;
  vertical-align: middle;
  display: flex;
  justify-content: space-between;
  top: 50%;
}
.main_head {
  background-color: rgba(192, 228, 253, 0.52);
  color: rgba(13, 26, 46, 0.88);
  text-align: left;
  vertical-align: middle;
  width: available;
  height: 10vh;
  position: relative;
}
</style>