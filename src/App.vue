<template>
  <router-view/>
</template>
<script>
</script>
<style src="primevue/resources/themes/saga-blue/theme.css"></style>
<style src="primevue/resources/primevue.min.css"></style>
<style src="primeicons/primeicons.css"></style>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}

 body {
   background-image: url("assets/back.png");
   background-size: cover;
   background-attachment:fixed
 }
.send-button {
  margin-top: 80px;
  width: 30vw;
}

input{
  width: 54.5vw;
  font-size: 24px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 10px;
  border-radius: 15px;
  color: rgba(13, 26, 46, 1);
  background-color: rgba(82, 123, 203, 0.9);
}

input::placeholder{
  color: rgba(13, 26, 46, 0.88);
}


.header-menu {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
}


.text-ex {

  position: relative;
  border-radius: 15px;
  background-color: #4c4d4d;
  margin-left: 3vw;
  margin-right: 3vw;
  margin-top: 3vh;
  font-size: 40px;
  height: 10vh;
}



.main_body{
  background-color: rgba(206, 214, 220, 0.12);
  display: flex;
  justify-content: space-between;
  width: available;
}

.list-block {
  display: grid;
  margin: 10px;
  border-radius: 5px;
  background-color: rgba(124, 124, 129, 0.94);
  width: 35vw;
  height: 80vh;
  direction: rtl;
  overflow-y: scroll;
}

button {
  background-color: rgba(82, 123, 203, 0.9);;
  margin: 15px;
  height: 60px;
  border-radius: 8px;
  font-size: 24px;
  font-weight: bold;
}



.list-block::-webkit-scrollbar {
  width: 13px;
  background-color: #666a6c;
}

.list-block::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: #4c4d4d;
}

.send-button{
  margin-top: 0px;
  width: 30vw;
}

.input-row{
  height: 50vh;
  margin: 30px;
  margin-left: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.input-row-scroll{
  border-radius: 10px;
  height: 55vh;
  width: 50vw;
  overflow-y: auto;
  margin-left: 5vw;
  margin-top: 5vh;
}

.input-row-scroll::-webkit-scrollbar {
  background-color: rgba(56, 110, 155, 0.96);
}

.input-row-scroll::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: rgba(72, 144, 204, 0.96);
}


.input-grid{
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.header-menu{
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
}

.main-menu{
  position: relative;
  margin: 10px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.32);
  width: 60vw;
  height: 80vh;
}
.text-ex{

  position: relative;
  border-radius: 15px;
  color: white;
  background-color: rgb(33, 149, 242);
  margin-left: 3vw;
  margin-right: 3vw;
  margin-top: 3vh;
  font-size: 40px;
  height: 10vh;
}

/*table {*/
/*  width:  49.2vw;*/
/*  font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;*/
/*  font-size: 14px;*/
/*  border-collapse: collapse;*/
/*  text-align: center;*/
/*}*/
/*th {*/
/*  background-color: rgba(82, 123, 203, 0.9);*/
/*  color: rgba(13, 26, 46, 1);*/
/*  padding: 10px 20px;*/

/*}*/
/*th, td {*/
/*  border-style: solid;*/
/*  border-width: 0 1px 1px 0;*/
/*  border-color: white;*/
/*}*/
/*td {*/
/*  background-color: rgba(115, 151, 220, 0.9);*/
/*}*/
/*th:first-child, td:first-child {*/
/*  text-align: center;*/
/*}*/

/*td:first-child{*/
/*  background-color: rgba(74, 110, 180, 0.9);*/
/*  color: rgba(13, 26, 46, 1);*/
/*  padding: 10px 20px;*/
/*}*/

textarea{
  background-color: rgba(115, 151, 220, 0.9);
  height: 20vh;
  resize: none;
}

textarea::placeholder{
  color: rgba(13, 26, 46, 0.88);
}

</style>

