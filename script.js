"use strict";

function init() {
    const scoreDiv = document.querySelector("div.scoreboard");
    let tableHeaders = ["Global Ranking", "Username", "Score", "Time Alive", "Accuracy [%]"];

    const createScoreboardTable = () => {

        while (scoreDiv.firstChild) {
            scoreDiv.removeChild(scoreDiv.firstChild);
        }

        let scoreboardTable = document.createElement("table");
        scoreboardTable.className = "scoreboardTable";

        let scoreboardTableHead = document.createElement("thead");
        scoreboardTableHead.className = "scoreboardTableHead";

        let scoreboardTableHeaderRow = document.createElement("tr");
        scoreboardTableHeaderRow.className = "scoreboardTableHeaderRow";

        //Will iterate over all the strings in the tableHeader array and will append the header cells to the table header row
        tableHeaders.forEach(header => {
            let scoreHeader = document.createElement("th"); //Creates the current header cell during a specific iteration
            scoreHeader.innerText = header;
            scoreboardTableHeaderRow.append(scoreHeader); //Appends the current header cell to the header row
        })

        scoreboardTableHead.append(scoreboardTableHeaderRow);  //Appends the header row to the table header group element
        scoreboardTable.append(scoreboardTableHead);

        let scoreboardTableBody = document.createElement("tbody"); //Creates the table body group element
        scoreboardTableBody.className = "scoreboardTable-Body";
        scoreboardTable.append(scoreboardTableBody); //Appends the table body group element to the table

        scoreDiv.append(scoreboardTable);
    }

    createScoreboardTable();
}

window.onload = init;