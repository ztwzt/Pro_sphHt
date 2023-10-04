<template>
  <div>
    <card></card>
    <sale></sale>
    <observe></observe>
  </div>
</template>

<script>

import card from './card'
import sale from './sale'
import observe from './observe'
export default {
  name: 'Dashboard',
  components:{
    card,
    sale,
    observe
  },
  mounted(){
    this.$store.dispatch('getData')
  }
}
</script>

<style scoped>

</style>
