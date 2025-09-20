<script setup lang="ts">
import { ref } from 'vue'
import { generateDocumentForSprintPlan } from '../utils/document-generator.js'
import { Packer, Document } from 'docx'
import { saveAs } from 'file-saver'
import type { TrelloData } from '@/utils/trello-types.js'

// reactive state
const isLoading = ref<boolean>(false)
const trelloJsonString = ref<string>('')
const sprintPlanColumnName = ref<string>('')
const errorMessage = ref<string>('')

// function to handle document conversion
const convertToDocument = async (): Promise<void> => {
  errorMessage.value = ''

  if (!trelloJsonString.value || !sprintPlanColumnName.value) {
    errorMessage.value = 'Text inputs cannot be empty'
    return
  }

  let trelloJson
  try {
    trelloJson = JSON.parse(trelloJsonString.value) as TrelloData
  } catch (err) {
    errorMessage.value = 'Trello JSON is not valid'
    return
  }

  isLoading.value = true

  try {
    // assuming generateDocumentForSprintPlan returns a docx Document
    const document: Document = generateDocumentForSprintPlan(
      trelloJson,
      sprintPlanColumnName.value
    )
    const blob: Blob = await Packer.toBlob(document)

    const date = new Date()
    const formattedDateString = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0]

    saveAs(blob, `Sprint_Plan_${formattedDateString}.docx`)
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorMessage.value = err.message
    } else {
      errorMessage.value = 'An unknown error occurred'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

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
      <button 
        type="button" 
        class="convert-to-document-button" 
        @click="convertToDocument"
      >
        Convert to Document
      </button>
      <p class="error-message" v-if="errorMessage">Error: {{ errorMessage }}</p>
    </template>
    <template v-else>
      <div class="loader"></div>
    </template>
  </div>
</template>

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
