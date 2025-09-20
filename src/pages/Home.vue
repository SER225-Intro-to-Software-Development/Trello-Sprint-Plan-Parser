<script setup lang="ts">
import ConverterTool from '../components/ConverterTool.vue'
import Instructions from '../components/Instructions.vue'
</script>

<template>
<div>
  <h1>SER225 Trello Sprint Plan Parser</h1>
  <ConverterTool/>
  <hr class="separator">
  <Instructions/>
</div>
</template>

<style>
.separator {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>