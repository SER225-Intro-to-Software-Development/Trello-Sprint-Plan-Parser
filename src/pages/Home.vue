<template>
<div>
  <h1>Trello Sprint Plan Parser</h1>
  <div class="trello-json-container">
    <p class="trello-json-label">Trello JSON:</p>
    <input type="text" class="trello-json-input" v-model="trelloJsonString" />
  </div>
  <div class="trello-json-container">
    <p class="trello-json-label">Sprint Plan Column Name:</p>
    <input type="text" class="trello-json-input" v-model="sprintPlanColumnName"/>
  </div>
  <button type="button" class="convert-to-document-button" @click="convertToDocument">Convert to Document</button>
</div>
</template>

<script>
const { generateDocumentForSprintPlan } = require('../utils/document-generator')

export default {
  name: 'Home',
  data: () => {
    return {
      isLoading: false,
      trelloJsonString: '',
      sprintPlanColumnName: ''
    }
  },
  methods: {
    convertToDocument() {
      this.isLoading = true
      const trelloJson = JSON.parse(this.trelloJsonString)
      return generateDocumentForSprintPlan(trelloJson, this.sprintPlanColumnName)
    }
  }
}
</script>


<style>
.trello-json-container {
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
}

.trello-json-label {

}

.trello-json-input {
  height: 20px;
}

.convert-to-document-button {
  width: 200px;
  height: 50px;
  font-size: 15px;
  margin-top: 20px;
}
</style>