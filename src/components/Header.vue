<link rel="stylesheet" type="text/css" href="/css/header.css">
<link rel="stylesheet" type="text/css" href="/css/change_button_color.css">

<template>
  <header>
    <div class="main_head">
      <div class="emp_name">
        <h1>{{ msg }}</h1>
        <div class="exit">
          <router-link class="exit_button" to="/admin">Админ консоль</router-link>
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

<style>
h1 {
  font-size: 40px;
}

.main_head {
  background-color: rgba(139, 144, 148, 0.89);
  color: black;
  text-align: left;
  vertical-align: middle;
  width: available;
  height: 100px;
  position: relative;
}
.emp_name {
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
  top: 50%;
}

.exit {
  margin-top: 30px;
  margin-right: 40px;
}

.exit_button {
  margin: 10px;
  padding: 10px 20px;
  background-color: rgba(96, 99, 100, 0.94);
  border-radius: 4px;
  color: black;
  font-size: 40px;
  text-decoration: none;
}
</style>