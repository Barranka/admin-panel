<template>
    <section>
      <div class="container">
        <el-form
          :model="validateForm"
          ref="validateForm"
          label-width="120px"
          class="demo-dynamic">

          <!-- Email -->
          <el-form-item
            prop="email"
            label="Email"
            :rules="rules.email">
            <el-input v-model="validateForm.email"></el-input>
          </el-form-item>

          <!-- Password -->
          <el-form-item
            label="Password"
            prop="pass"
            :rules="rules.pass">
            <el-input type="password" v-model="validateForm.pass" autocomplete="off"></el-input>
          </el-form-item>

          <!-- Button -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('validateForm')">Войти</el-button>
          </el-form-item>

        </el-form>
      </div>
    </section>
</template>

<script>
export default {
  data() {
    return {
      validateForm: {
        email: '',
        pass: ''
      },
      rules: {
        pass: [
          { required: true, message: 'Пожалуйста введите пароль',  trigger: 'change'}
        ],
        email: [
          { required: true, message: 'Пожалуйста введите ваш email', trigger: 'change' },
          { type: 'email', message: 'Пожалуйста введите корректный email', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('authUser', this.validateForm)
          this.resetForm()
        }
      })
    },
    resetForm() {
      this.validateForm.email = ''
      this.validateForm.pass = ''
      this.$nextTick( () => this.$refs.validateForm.clearValidate() )
    },
  }
}
</script>

<style lang="scss">
.el-input__inner {
  margin-bottom: 0px;
}
.el-form,
.demo-dynamic {
  max-width: 500px;
  margin: 0 auto;
}
</style>