<template>
<div>
  <div class="trello-json-container">
    <p class="trello-json-label">Trello JSON:</p>
    <input type="text" class="trello-json-input" v-model="trelloJsonString" />
  </div>
  <div class="trello-json-container">
    <p class="trello-json-label">Sprint Plan Column Name:</p>
    <input type="text" class="trello-json-input" v-model="sprintPlanColumnName"/>
  </div>
  <template v-if="!isLoading">
    <button type="button" class="convert-to-document-button" @click="convertToDocument">Convert to Document</button>
    <p class="error-message" v-if="errorMessage">Error: {{errorMessage}}</p>
  </template>
  <template v-else>
    <div class="loader"></div>
  </template>
</div>
</template>

<script>
const { generateDocumentForSprintPlan } = require('../utils/document-generator')
const { Packer} = require('docx')
const { saveAs } = require('file-saver')

export default {
  name: 'ConverterTool',
  data: () => {
    return {
      isLoading: false,
      trelloJsonString: '',
      sprintPlanColumnName: '',
      errorMessage: ''
    }
  },
  methods: {
    convertToDocument() {
      this.errorMessage = ''

      if (!this.trelloJsonString || !this.sprintPlanColumnName) {
        this.errorMessage = 'Text inputs cannot be empty'
        return
      }

      let trelloJson
      try {
        trelloJson = JSON.parse(this.trelloJsonString)
      }
      catch(err) {
        this.errorMessage = 'Trello JSON is not valid'
        return
      }

      this.isLoading = true
      
      // generate and save word document
      return generateDocumentForSprintPlan(trelloJson, this.sprintPlanColumnName)
        .then(document => Packer.toBlob(document))
        .then(blob => {
          const date = new Date() // today's date
          const formattedDateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split('T')[0] // format date as yyyy-mm-dd, the extra logic is to ensure timezones don't get in the way
          return saveAs(blob, `Sprint_Plan_${formattedDateString}.docx`)
        })
        .catch(err => {
          this.errorMessage = err.message
        })
        .finally(() => {
          this.isLoading = false
        })
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

.trello-json-input {
  height: 20px;
}

.convert-to-document-button {
  width: 200px;
  height: 50px;
  font-size: 15px;
  margin-top: 20px;
}

.error-message {
  color: red;
}

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>