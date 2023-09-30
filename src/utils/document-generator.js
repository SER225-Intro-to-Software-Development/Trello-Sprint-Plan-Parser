const { Document, HeadingLevel, Packer, Paragraph, TextRun } = require('docx')
const { saveAs } = require('file-saver')

const generateDocumentForSprintPlan = (trelloJson, sprintPlanColumnName) => {
  const lists = trelloJson.lists
  const sprintPlanList = lists.find(list => stripString(list.name) === stripString(sprintPlanColumnName))
  if (sprintPlanList) {
    const id = sprintPlanList.id
    const cards = trelloJson.cards
    const cardsInSprintPlanList = cards.filter(card => card.idList === id).map(card => formatCard(card, trelloJson))
    const document = createDocument(cardsInSprintPlanList)
    return Packer.toBlob(document)
      .then(blob => {
        saveAs(blob, "example.docx");
      })
  }
}

const stripString = (str) => str.trim().toLowerCase().replace(/\s/g, '')

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
      children: cardsInSprintPlanList.map(card => createCardDocumentSection(card)).flat()
    }]
  })
}

const createCardDocumentSection = (card) => {
  return [
    new Paragraph({
      text: card.title,
      heading: HeadingLevel.HEADING_1,
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: '\n',
          size: '14pt'
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Assigned To: ',
          bold: true,
          size: '14pt'
        }),
        new TextRun({
          text: card.assignedTo.map(member => member.name ? member.name : member.username).join(', '),
          size: '14pt'
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: '\n',
          size: '14pt'
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Labels: ',
          bold: true,
          size: '14pt'
        }),
        new TextRun({
          text: card.labels.map(label => `${label.name ? label.name : '<Unnamed>'} (${label.color})`).join(', '),
          size: '14pt'
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: '\n',
          size: '14pt'
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Description:',
          size: '14pt',
          bold: true
        })
      ]
    }),
    ...card.description.split('\n').map(descriptionPart => {
      return new Paragraph({
        children: [
          new TextRun({
            text: descriptionPart,
            size: '14pt'
          })
        ]
      })
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: '\n',
          size: '14pt'
        })
      ]
    })
  ]
}

module.exports = { generateDocumentForSprintPlan }