<template>
  <div class="list-block">
    <button>Добавить пробужденного</button>
    <button>Удалить пробужденного</button>
    <button>Список доступных разломов</button>
    <button>Информация о пробужденном</button>
    <button>Список пробужденных</button>
    <button>Создать группу</button>
    <button>Добавить участников в группу</button>
    <button>Удалить участников из группы</button>
  </div>
</template>

<script>
export default {
  name: "ListScroll"
}
</script>

<style>
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
    background-color: rgba(104, 104, 110, 0.94);
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
</style>