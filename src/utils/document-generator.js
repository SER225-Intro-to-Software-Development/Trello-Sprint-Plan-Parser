const { Document, HeadingLevel, Packer, Paragraph, TextRun } = require('docx')
const { saveAs } = require('file-saver')

const generateDocumentForSprintPlan = (trelloJson, sprintPlanColumnName) => {
  console.log(trelloJson.actions)
  const lists = trelloJson.lists
  const sprintPlanList = lists.find(list => list.name === sprintPlanColumnName)
  if (sprintPlanList) {
    const id = sprintPlanList.id
    const cards = trelloJson.cards
    const cardsInSprintPlanList = cards.filter(card => card.idList === id).map(card => formatCard(card, trelloJson))
    console.log(cardsInSprintPlanList)
    const document = createDocument(cardsInSprintPlanList)
    return Packer.toBlob(document)
      .then(blob => {
        console.log(blob)
        saveAs(blob, "example.docx");
        console.log("Document created successfully");
      })
  }
}

const formatCard = (card, trelloJson) => {
  return {
    title: card.name,
    assignedTo: card.idMembers.map(idMember => {
      const memberInfo = trelloJson.members.find(member => member.id === idMember)
      return {
        name: memberInfo.fullName,
        username: memberInfo.username
      }
    }),
    description: card.desc,
    cardUrl: card.url,
    labels: card.labels.map(cardLabel => {
      const labelInfo = trelloJson.labels.find(label => label.id === cardLabel.id)
      return {
        name: labelInfo.name,
        color: labelInfo.color
      }
    })
  }
}

const createDocument = (cardsInSprintPlanList) => {
  return new Document({
    sections: [{
      properties: {},
      children: cardsInSprintPlanList.map(card => createCardDocumentSection(card))
    }]
  })
}

const createCardDocumentSection = (card) => {
  return new Paragraph({
    children: [
      new TextRun({
        text: card.title + '\n\n',
        bold: true
      })
    ]
  })
}

module.exports = { generateDocumentForSprintPlan }