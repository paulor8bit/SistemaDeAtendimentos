<template>
  <div class="expense-list-item row">
    <div class="col-10">
      <div class="description">
        <span>{{ data.name }}</span>
      </div>
    <div><small> <span>CPF: {{data.cpf}}</span> </small> </div>
    <div><small> <span>Telefone: {{data.telefone}}</span> </small> </div>
    <div><small> <span>Sitomas: {{data.selected}}</span> </small> </div>
    <div><small> <span>Descrição: {{data.campoLivre}}</span> </small> </div>
    </div>
    <small v-date-format="data.registroData"/>
  </div>
</template>

<script>

export default {
  props: {
    data: { type: Object, required: true }
  },
  methods: {
    openReceipt () {
      window.open(this.data.receipt, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
  .expense-list-item {
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--dark-medium);
    .description {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
