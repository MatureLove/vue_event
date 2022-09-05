<template>
    <div>
        <Detail></Detail>
        <Sale></Sale>
        <Footer></Footer>
    </div>
</template>

<script>
import Detail from './detail'
import Sale from './sale'
import Footer from './footer'
export default {
  name: 'Home',
  components: { Detail, Sale, Footer }
}
</script>

<style lang="less">
</style>
