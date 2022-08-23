<template>
  <div>
    <el-dropdown @command="changeLanguage">
      <span class="el-dropdown-link">
        <svg-icon style="color: #fff; font-size: 20px" icon-class="language" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(value, key) in messages"
          :key="key"
          :command="key"
          :disabled="key === $i18n.locale"
          >{{ key }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { messages } from '@/i18n'
import Cookie from 'js-cookie'

export default {
  name: 'ToggleLang',
  data() {
    return {
      messages
    }
  },

  created() {
    console.log(messages)
  },

  methods: {
    changeLanguage(val) {
      console.log(val)
      this.$i18n.locale = val
      Cookie.set('lang', val)
      this.$router.go(0)
    }
  }
}
</script>

<style scoped lang="scss">
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
