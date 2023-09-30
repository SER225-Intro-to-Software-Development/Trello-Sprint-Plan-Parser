<template>
<div>
  <h1>SER225 Trello Sprint Plan Parser</h1>
  <ConverterTool/>
  <hr class="separator">
  <Instructions/>
</div>
</template>

<script>
import ConverterTool from '../components/ConverterTool'
import Instructions from '../components/Instructions'

export default {
  name: 'Home',
  components: {
    ConverterTool,
    Instructions
  }
}
</script>

<style>
.separator {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>