<template>
    <order />
</template>

<script>
import order from './views/Order'
export default {
  name: 'App',
  components: {
    order
  }
}
</script>

<style lang="less">
@aclor:#918f8f;
html, body{
    width: 100%;
    height: 100%;
  }

  *{
    padding: 0;
    margin: 0;
  }
  a{
    text-decoration: none;
    color: @aclor;
  }
</style>
