<template>
  <div class="hello">

        <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Nome</th>
      <th scope="col">crm</th>
      <th scope="col">Ações</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(movie,key) in fireData" :key=key>
       <th>
      {{movie.nome}}
      <input v-if='editFormMode.includes(key)' type="text" v-model='editingNome[key]' @keyup.enter='editNome(key)' class="form-control">
      </th>

      <th>
      {{movie.crm}}
      <input v-if='editFormMode.includes(key)' type="text" v-model='editingcrm[key]' @keyup.enter='editcrm(key)' class="form-control">
      <th>
      <button class="btn btn-xs btn-primary" @click='editFormMode.push(key);'>Edit</button>
      <!-- <button class="btn btn-xs btn-danger" @click='deleteMovie(key);'>Delete</button> -->

      </th>
    </tr>
    </tbody>
</table>
       <tr v-for="(movie,key) in fireData" :key=key>
    <div>{{feitoCadastro="Quando editar, precione ENTER para confirmar a edição do cadastro"}}</div>
  </tr>
  <div v-if="!feitoCadastro"> <div class="card">
    <div class="card-header">adcione nome</div>
    <div class="card-body">
        <form id="form"
              class="form-inline"
              @submit.prevent="addMovie">
          <div class="form-group mb-2">
            <label for="nome" class="sr-only">Nome</label>
            <input id="nome"
                  type="text"
                  class="form-control"
                  placeholder="Nome"
                  v-model="nome" />
          </div>

                    <div class="form-group mb-2">
            <label for="crm" class="sr-only">crm</label>
            <input id="crm"
                  type="text"
                  class="form-control"
                  placeholder="crm"
                  v-model="crm" />
          </div>
          <button class="btn btn-primary mx-sm-3 mb-2">Add</button>
       </form></div>
      </div>
    </div>
        </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      movies: [],
      movie: null,
      nomes: [],
      nome: null,
      crms: [],
      crm: null,
      fireData: null,
      editingMovie: [],
      editingAutor: [],
      editingLink: [],
      editingNome: [],
      editingcrm: [],
      editFormMode: []
    }
  },
  methods: {
    addMovie () {
      this.nomes.push(this.nome)
      this.crms.push(this.crm)
      this.$firebase.database().ref(`medico${window.uid}`).push({
        nome: this.nome,
        crm: this.crm
      })
      this.movie = null
    },
    editcrm (key) {
      this.$firebase.database().ref(`medico${window.uid}/` + key).set({
        nome: this.editingNome[key],
        crm: this.editingcrm[key]
      })
        .then((data) => {
          this.editingMovie[key] = null
          this.editFormMode = []
        })
    },
    deleteMovie (key) {
      this.$firebase.database().ref(`medico${window.uid}/` + key).remove()
    },
    fetchFirebaseData () {
      this.$firebase.database().ref(`medico${window.uid}`).on('value', (snapshot) => {
        this.fireData = snapshot.val()
      })
    }
  },
  created () {
    this.fetchFirebaseData()
  }
}
</script>

<style scoped>
tr {
  width: 25%;
}
</style>
