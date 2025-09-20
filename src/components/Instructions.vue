<template>
<div>
  <h2>Instructions</h2>
  <div class="step">
    <p><b>Step 1:</b> Place all new Sprint tasks in your Trello board under the same column. In the below example, all upcoming Sprint tasks are placed under a column named "Sprint Backlog":</p>
    <img class="border" src="@/assets/images/sprint-backlog-column.png"/>
  </div>
  <div class="step">
    <p><b>Step 2:</b> Go to your team's Trello Board in your browser.</p>
    <img class="border" src="@/assets/images/trello-address-bar-url.png"/>
  </div>
  <div class="step">
    <p><b>Step 3:</b> Go to the browser's address bar where you have your Trello board open, add ".json" on to the end of the url, and then hit enter</p>
    <img class="border" src="@/assets/images/trello-address-bar-url-json.png"/>
    <p>You should now see a page with one very large JSON string:</p>
    <img class="border" src="@/assets/images/trello-json.png"/>
  </div>
  <div class="step">
    <p><b>Step 4:</b> Copy the entire JSON string.</p>
    <img class="border" src="@/assets/images/trello-json-copy.png"/>
  </div>
  <div class="step">
    <p><b>Step 5:</b> Paste the JSON string into the 'Trello JSON' text field.</p>
    <img class="border" src="@/assets/images/trello-json-field.png"/>
  </div>
  <div class="step">
    <p><b>Step 6:</b> Put the name of the column that contains all of your team's upcoming Sprint tasks (per Step 1) in the 'Sprint Plan Column Name' text field.</p>
    <img class="border" src="@/assets/images/column-name-field.png"/>
  </div>
  <div class="step">
    <p><b>Step 7:</b> Click the 'Convert to Document' button and a Sprint Planning document will be created for you to download (.docx file). This document can be submitted right to Blackboard. I recommend opening it up and just ensuring this tool generated the document correctly before submitting.</p>
  </div>
</div>
</template>

<style>
.step {
  margin-top: 50px;
  margin-bottom: 50px;
}

.border {
  border: 1px solid black
}
</style>