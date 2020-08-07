<template>
  <transition name="modal">
    <div class="modal__wrapper" @click.self="$emit('close')">
      <div class="modal-content">
        <!-- header -->
        <div class="modal-header">
          <span class="modal-title">Добавить контакт</span>
          <span class="button-close" @click="$emit('close')">×</span>
        </div>

        <!-- body -->
        <div class="modal-body">
          <el-form :model="userEdit" ref="userEdit" :rules="rules" label-width="120px" class="form">

            <el-form-item prop="name" label="Имя" :rules="rules.name">
              <el-input placeholder="Введите ваше имя" v-model="userEdit.name"></el-input>
            </el-form-item>

            <el-form-item prop="firstname" label="Фамилия" :rules="rules.firstname">
              <el-input placeholder="Введите вашу фамилию" v-model="userEdit.firstname"></el-input>
            </el-form-item>

            <el-form-item prop="phone" label="Телефон" :rules="rules.phone">
              <el-input placeholder="Введите номер телефона" v-model="userEdit.phone"></el-input>
            </el-form-item>

          </el-form>
          <el-row class="form__button">
            <el-button type="primary" @click="submitForm('userEdit')">Сохранить</el-button>
            <el-button type="primary" @click="$emit('close')">Отменить</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    userEdit: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "Введите ваше имя", trigger: "change" },
          { min: 3,  max: 10, message: "Имя должно быть от 3 до 10 букв", trigger: "change" },
        ],
        firstname: [
          { required: true, message: "Введите вашу фамилию", trigger: "change" },
          { min: 3, max: 10, message: "Фамилия должна быть от 3 до 10 букв", trigger: "change" }
        ],
        phone: [
          { required: true, message: "Введите ваш номер телефона", trigger: "change" },
          { max: 11, message: "Введите корректный номер", trigger: "change" }
        ]
      },
    }
  },
  mounted() {
    this.resetForm()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) this.$emit('save', this.userEdit)
      })
    },
    resetForm(formName) {
      this.user.name = ''
      this.user.firstname = ''
      this.user.phone = ''
      this.$nextTick( () => this.$refs.user.clearValidate() )
    }
  }
}
</script>

<style lang="scss" scoped>
// animation
.form__button {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.modal-enter,
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-content,
.modal-leave-active .modal-conten {
  transform: scale(1.2);
}

.modal__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.2s ease;
  right: 0;
  z-index: 998;
  background-color: rgba(00, 00, 00, 0.48);
}
.modal-content {
  position: relative;
  max-width: 600px;
  padding: 20px 18px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  transition: all 0.2s ease;
  border-radius: 8px;
  z-index: 999;
  overflow: hidden;
  @media screen and (min-width: 900px) {
    min-width: 500px;
  }
}
.modal-header {
  display: flex;
  align-self: center;
  justify-content: space-between;
  padding-bottom: 20px;
  span {
    font-size: 24px;
  }
  .button-close {
    cursor: pointer;
  }
}
.modal-body {
  text-align: center;
}
.btn {
  margin-top: 20px;
}
</style>
