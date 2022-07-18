<template>
  <el-tag v-if="level == 0">等级一</el-tag>
  <el-tag type="success" v-else-if="level == 1">等级二</el-tag>
  <el-tag type="warning" v-else>等级三</el-tag>
</template>
<script>
export default {
  props: {
    level: {
      type: [Number, String],
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
