<template>
  <body class="text-center">
  <main class="form-signin">
    <form @submit.prevent="login">
      <h1 class="h3 mb-3 fw-normal">Авторизация</h1>
      <div class="form-floating">
        <input v-model="username" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Логин</label>
      </div>
      <div class="form-floating">
        <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label  for="floatingPassword">Пароль</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Войти</button>
    </form>
  </main>
  </body>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      showError: false
    };
  },
  methods: {
    login: function () {
      const { username, password } = this

      if (test_login.has(username)){
        if (test_login.get(username) === password){
          localStorage.setItem('isLogin', true)
          this.$router.push('/')
        }
      }
    }
  }
};
var test_login = new Map([['cawaivannikov','cawa2001'],['antondzyba','12345'],['12345','12345']]);

</script>

<style scoped>

h1 {
  color: whitesmoke;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

button{
  border-color: black;
  background-color: dimgrey;
}

</style>

