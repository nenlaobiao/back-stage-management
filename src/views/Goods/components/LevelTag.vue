<template>
  <el-tag v-if="level === null">一级</el-tag>
  <el-tag v-else-if="level === 0">一级</el-tag>
  <el-tag type="success" v-else-if="level === 1">二级</el-tag>
  <el-tag type="warning" v-else>三级</el-tag>
</template>
<script>
export default {
  props: {
    level: {
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
