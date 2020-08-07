<template>
  <div class="wrapper-content wrapper-content--fixed">
    <contactsForm v-if="showAdmin"/>
  </div>
</template>

<script>
import contactsForm from "@/components/ContactsForm.vue"

export default {
components: {contactsForm},
  data() {
    return {
      showAdmin: false
    }
  },
  mounted() {
    if (!this.$store.state.token && !localStorage.getItem('token')) {
      this.$router.push('/')
    } else this.showAdmin = true
  }
}
</script>