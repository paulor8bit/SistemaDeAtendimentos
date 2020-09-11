<template>
<nav class="nav flex-column justify-content-between">
  <div>
  <router-link
  exact
  :key="i"
  class="nav-link"
  exact-active-class="active"
  :to="{name: router.name}"
  v-for="(router, i) in routerLinks"
  >
  <i class="fa" :class="`fa-${router.meta.icon}`"></i>
    {{router.meta.title}}
  </router-link>

  <hr>
  <span v-if="!routerLista">
    <layout-new-expense/>
  </span>
     </div>
  <layout-logout />
 </nav>
</template>

<script>
import LayoutLogout from './LayoutLogout'
import LayoutNewExpense from './LayoutNewExpense'

export default {
  components: {
    LayoutLogout,
    LayoutNewExpense
  },
  computed: {
    routerLinks () {
      return this.$router.options.routes.filter(r => r.name !== 'Login')
    },
    routerLista () {
      return this.$route.name !== 'attendance-list'
    }
  }

}
</script>

<style scoped lang="scss">
  .nav {
    margin-left: -15px;
    width: calc(100% + 30px);
    height: calc(100vh - 50px);
    .nav-link {
      color: var(--white);
      &.active {
        color: var(--featured);
        background-color: transparent;
      }
      &:hover {
        background-color: var(--featured);
        color: var(--dark)
      }
    }

  }
</style>
