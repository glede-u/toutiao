<template>
  <div id="app">
    <!-- 加缓存 -->
    <keep-alive :include="['LayoutIndex']">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState(['cachePages'])
  },

  data () {
    return {}
  },

  methods: {}
}
</script>
<style lang="less"></style>
