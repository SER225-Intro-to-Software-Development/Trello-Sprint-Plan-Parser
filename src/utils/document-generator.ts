import type { Card2, TrelloData } from './trello-types'
import { Document, HeadingLevel, Paragraph, TextRun } from 'docx'

interface FormattedCardInSprintPlanList {
  title: string;
  assignedTo: {
    name: string | undefined;
    username: string | undefined;
  }[];
  description: string;
  url: string;
  labels: {
    name: string | undefined;
    color: string | undefined;
  }[];
}


export const generateDocumentForSprintPlan = (trelloJson: TrelloData, sprintPlanColumnName: string) => {
  const lists = trelloJson.lists
  if (!lists) {
    throw new Error('Unable to parse Trello JSON lists. This appears to be invalid Trello JSON. Please ensure you are pasting it in correctly.')
  }
  const sprintPlanList = lists.find(list => stripString(list.name) === stripString(sprintPlanColumnName))
  if (sprintPlanList) {
    const id = sprintPlanList.id
    const cards = trelloJson.cards
    const cardsInSprintPlanList = cards.filter(card => card.idList === id).map(card => formatCard(card, trelloJson))
    try {
      const boardUrl = trelloJson.url
      return createDocument(boardUrl, cardsInSprintPlanList)
    }
    catch(err: any) {
      throw new Error(`${err.message} (Unable to parse Trello JSON. This appears to be invalid Trello JSON. Please ensure you are pasting it in correctly.)`)
    }
  }
  throw new Error(`Cannot find Sprint Plan List column '${sprintPlanColumnName}' in Trello board`)
}

const stripString = (str: string) => str.trim().toLowerCase().replace(/\s/g, '')

const formatCard = (card: Card2, trelloJson: TrelloData) => {
  return {
    title: card.name,
    assignedTo: card.idMembers.map(idMember => {
      const memberInfo = trelloJson.members.find(member => member.id === idMember)
      return {
        name: memberInfo?.fullName,
        username: memberInfo?.username
      }
    }),
    description: card.desc,
    url: card.url,
    labels: card.labels.map(cardLabel => {
      const labelInfo = trelloJson.labels.find(label => label.id === cardLabel.id)
      return {
        name: labelInfo?.name,
        color: labelInfo?.color
      }
    })
  }
}

const createDocument = (boardUrl: string, cardsInSprintPlanList: FormattedCardInSprintPlanList[]) => {
  return new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: 'Board URL: ',
              bold: true,
              size: '14pt'
            }),
            new TextRun({
              text: boardUrl,
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
        ...cardsInSprintPlanList.map(card => createCardDocumentSection(card)).flat()
      ]
    }]
  })
}

const createCardDocumentSection = (card: FormattedCardInSprintPlanList) => {
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
          text: 'URL: ',
          bold: true,
          size: '14pt'
        }),
        new TextRun({
          text: card.url,
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
          text: 'Assigned To: ',
          bold: true,
          size: '14pt'
        }),
        new TextRun({
          text: card.assignedTo.length > 0 ? card.assignedTo.map(member => member.name ? member.name : member.username).join(', ') : 'N/A',
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
          text: card.labels.length > 0 ? card.labels.map(label => `${label.name ? label.name : '<Unnamed>'} (${label.color})`).join(', ') : 'N/A',
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

