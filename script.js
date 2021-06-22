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

    //The function below will accept a single score and its index to create the global ranking
    const appendScores = (singleScore, singleScoreIndex) => {
        const scoreboardTable = document.querySelector(".scoreboardTable"); //Find the table we created

        let scoreboardTableBodyRow = document.createElement("tr"); //Create the currect table row
        scoreboardTableBodyRow.className = "scoreboardTableBodyRow";

        //
        let scoreRanking = document.createElement("td");
        scoreRanking.innerText = singleScoreIndex;

        let usernameData = document.createElement("td");
        usernameData.innerText = singleScore.user.username;

        let scoreData = document.createElement("td");
        scoreData.innerText = singleScore.score;

        let timeData = document.createElement("td");
        timeData.innerText = singleScore.time_alive;

        let accuracyData = document.createElement("td");
        accuracyData.innerText = singleScore.accuracy;

        scoreboardTableBodyRow.append(scoreRanking, usernameData, scoreData, timeData, accuracyData); //Append all 5 cells to the table row

        scoreboardTable.append(scoreboardTableBodyRow);
    }

    //wont use fetch in this case, will use REST API to access database data
    const getScores = () => {
        fetch("http://localhost:3306/scores")
            .then(res => res.json())
            .then(scores => {
                createScoreboardTable(); //Clears scoreboard div if it has any children nodes, creates & appends table

                //Iterates through all the objects in the scores array and appends each one to the table body
                for (const score of scores) {
                    let scoreIndex = scores.indexOf(score) + 1; //Index of score in score array for global ranking (these are already sorted in the back-end)
                    appendScores(score, scoreIndex); //creates and appends each row to the table body
                }
            })
    }

    //Test data
    let singleScore = {    "id": 6,    "score": 115,    "time_alive": 70.659,    "accuracy": 17.1,    "user_id": 1,    "user": {        "username": "daniel"    }};

    createScoreboardTable();
    appendScores(singleScore, 0);
}

window.onload = init;