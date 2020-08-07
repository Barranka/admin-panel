<template>
  <div class="wrapper-content wrapper-content--fixed">
    <authForm />
  </div>
</template>

<script>
import authForm from "@/components/AuthForm.vue"

export default {
  components: {authForm},
  mounted() {
    if (this.$store.state.token || localStorage.getItem('token')) this.$router.push('/admin')
  }
}
</script>

