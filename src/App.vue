<template>
  <div class="wrapper">

    <!-- header -->
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <div class="logo">Личный кабинет</div>
            <ul class="navbar-list">
              <li class="navbar-item">
                <router-link v-if="authArea" class="navbar-link" :to="'/'">Авторизация</router-link>

                <router-link v-if="authArea == false" class="navbar-link" :to="'/'">
                  <el-row class='logoutArea'>
                    <el-button plain @click="logOut()">Выйти</el-button>
                  </el-row>
                </router-link>

              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  data () {
    return {
      authArea: true
    }
  },
  created() {
    this.loadedNab()
  },
  methods: {
    loadedNab() {
      if (this.$route.name === 'auth') this.authArea = true
      else this.authArea = false
    },
    logOut() {
      this.$store.dispatch('logoutUser')
    }
  },
 watch: {
    $route: 'loadedNab'
  },
}
</script>

<style lang="scss">
.navbar-link {
  &.router-link-exact-active {
    color: #5247e7
  }
}
.logoutArea {
  display: flex;
  justify-content: flex-end;
  margin: 0 auto;
}
</style>

