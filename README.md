# Trello Sprint Plan Parser

This website can be accessed at [https://ser225-intro-to-software-development.github.io/Trello-Sprint-Plan-Parser/](https://ser225-intro-to-software-development.github.io/Trello-Sprint-Plan-Parser/).

## What is this website for?

This is a website for converting my students' Sprint Plans for their Quinnipiac's SER225 course from a Trello board into a document which can easily be submitted to Blackboard.

The way the class works, teams must plan their Sprint out and create user stories on their Trello boards prior to getting the official "okay" to start working on it. I then require students to essentially submit a document containing "snapshot" of their Sprint user stories from their Trello board to Blackboard in order for me to have it on record -- since Trello boards will be updated as the Sprint goes on, I require this record in the case that either I or the team need to refer back to the original plan. Additionally, I use a grade on this Blackboard submission to mark that I have "officially" approved a team to move forward with their Sprint plan.

...However, the one problem with this system is that my students essentially have to essentially copy/pasting or screenshotting all of their Trello tasks to a document, which is a waste of their valuable time. In order to make this easier on my students, I created this website that will automatically transform their Trello board Sprint tasks into a Word document that is ready to be submitted to Blackboard right out of the gate.

## How to use this generator tool to convert a Trello board into a Sprint planning document

Usage instructions are included right on the home page of the website underneath the tool itself. It essentially involves moving all new Sprint tasks to their own column, and then grabbing the Trello board's JSON representation (which is very easily obtained) -- from there, paste the information into the fields and hit the button to generate and download the Sprint planning Word document.