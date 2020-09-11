<template>

  <div class="hello">
    <div class="home">
    <div class="row">
      <div class="col-6 home-box">
         <div>Olá! :)</div>
         <!-- <div class="money" v-money-format="totals.totalSpent"></div> -->
        <small>você tem um total de </small>
        <div class="money">{{totals.tamanho}}</div>
        <small>  em atendimentos </small>
      </div>
      <div class="col-6 home-box">
        <small>A média de atendimento por mês ao ano esta sendo de: </small>
        <div class="money" >{{(totals.tamanho/12).toFixed(1)}}</div>
      </div>
      <div class="col-6 home-box">
        <small>O ultimo cadastro foi efetuado em:</small>
        <div class="money" v-date-format="totals.biggest.createdAt"></div>
      </div>
      <div class="col-6 home-box">

    <tr v-for="(movie,key) in fireData" :key=key>
       <div>Você esta logado como: </div>
      <small>Nome:</small>
       <small class="money">
       {{movie.nome}}
      <input v-if='editFormMode.includes(key)' type="text" v-model='editingNome[key]' @keyup.enter='editNome(key)' class="form-control">
      </small>
      <p> <small>CRM: </small>
      <small class="money">{{movie.crm}}</small></p>

    </tr>
      </div>
    </div>
    </div>

    </div>

</template>

<script>
export default {
  name: 'Lista',
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
      editingNome: [],
      editingcrm: [],
      editFormMode: [],
      expenses: []
    }
  },
  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)
      ref.on('value', data => {
        const values = data.val()
        this.expenses = Object.keys(values).map(i => values[i])
      })
    },
    addMovie () {
      this.nomes.push(this.nome)
      this.crms.push(this.crm)
      this.$firebase.database().ref(`medico${window.uid}`).push({
        nome: this.nome,
        telefoneum: this.telefoneum,
        telefonedois: this.telefonedois,
        crm: this.crm

      })
      this.movie = null
    },
    fetchFirebaseData () {
      this.$firebase.database().ref(`medico${window.uid}`).on('value', (snapshot) => {
        this.fireData = snapshot.val()
      })
    }
  },
  created () {
    this.fetchFirebaseData()
    this.getData()
  },
  computed: {
    totals () {
      const { expenses: exp } = this
      const values = {
        totalSpent: 0,
        average: 0,
        tamanho: 0,
        biggest: {},
        lowest: {}
      }

      if (exp.length) {
        values.totalSpent = exp.map(e => +e.value)
          .reduce((acc, cur) => acc + cur, 0)
        values.tamanho = exp.length
        values.average = values.totalSpent / exp.length
        values.biggest = exp.sort((a, b) => +b.value - +a.value)[0]
        values.lowest = exp.sort((a, b) => +a.value - +b.value)[0]
      }

      return values
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 15px;
  .home-box {
    width: 100%;
    display: flex;
    font-size: 30pt;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: calc(50vh - 15px);
    border: 1px solid var(--dark-medium);
    small {
      font-size: 1.3rem;
    }
    .money {
      color: var(--featured);
    }
    &:nth-child(2), &:nth-child(4) {
      border-left: none;
    }
    &:nth-child(3), &:nth-child(4) {
      border-top: none;
    }
  }
}
</style>
