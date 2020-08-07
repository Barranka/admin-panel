<template>
  <section>
    <div class="container">
      <!-- Table of contacts -->
      <el-table
        :data="filterData()"
        style="width: 100%">
        <el-table-column label="Date" prop="date" sortable :filter-method="filterHandler"></el-table-column>
        <el-table-column label="Имя" prop="name" sortable :filter-method="filterHandler"></el-table-column>
	      <el-table-column label="Фамилия" prop="firstname" sortable :filter-method="filterHandler"></el-table-column>
	      <el-table-column label="Телефон" prop="phone"></el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="Введите для поиска" />
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="userEdit(scope.$index, scope.row)">Изменить</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="userDelete(scope.$index,scope.row)">Удалить</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- Button for add contact -->
      <el-row class='edditContactArea'>
        <el-button type="primary" @click="showModal = true">Добавить контакт</el-button>
      </el-row>
    </div>

    <!-- Modals for add and edit contacts -->
    <modal v-if="showModal" :user="user" @save="addUser(user)" @close="showModal = false"/>
    <modalEdit v-if="showModalEdit" :user="editUser.user" @save="userEditInStore(editUser)" @close="showModalEdit = false"/>

  </section>

</template>

<script>
import { mapState } from 'vuex'
import modal from "@/components/Modal/Modal.vue"
import modalEdit from "@/components/Modal/ModalEdit.vue"

export default {
  components: {modal, modalEdit},
  data() {
    return {
      search: "",
      showModal: false,
      showModalEdit: false,
      editUser: {
        user:'',
        index:''
      },
      user: {
        name: '',
        firstname: '',
        phone: '',
        date: new Date(Date.now()).toLocaleString()
      },
    }
  },
  created() {
    return this.$store.dispatch('getUsers')
  },
  computed: {
    ...mapState({
      tableData: state => state.usersLoaded,
    })
	},
  methods: {
	  filterData() {
	  	return this.tableData.filter(data => !this.search || data.firstname.toLowerCase().includes(this.search.toLowerCase()) || data.name.toLowerCase().includes(this.search.toLowerCase()))
	  },
 	  userEdit(index, row) {
      this.editUser.user = row
      this.editUser.index = index
      this.showModalEdit = true
     },
    userEditInStore(user) {
      this.showModalEdit = false
      this.$store.dispatch('userEdit', user)
        .then(res => console.log("Контакт изменен!"))
        .catch(e => console.log(e))
 	  },
 	  userDelete(index, row) {
      this.$store.dispatch('userDelete', { index, row })
        .then(res => console.log("Контакт удален!"))
        .catch(e => console.log(e))
 	  },
 	  addUser(user) {
      this.showModal = false
      this.$store.dispatch('setUser', user)
 	      .then(res => console.log("Контакт добавлен!"))
        .catch(e => console.log(e))
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }
 	}
}
</script>

<style lang="scss">
.edditContactArea {
  margin: 30px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>