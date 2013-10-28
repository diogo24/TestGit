/// <reference path="jquery-2.0.0-vsdoc.js" />
/// <reference file="jquery-2.0.0-vsdoc.js" />

var nflSchedulePredictor = {
    Team: function (_teamName, _conference, _division) {
        this.teamName = _teamName,
      this.wins = 0,
      this.losses = 0,
      this.pct = function () {
          return this.wins / (this.wins + this.losses);
      },
      this.conference = _conference,
      this.division = _division
    },
    _nflTeams: [],
    nflTeams: function () {
        if (nflSchedulePredictor._nflTeams.length) {
            return nflSchedulePredictor._nflTeams;
        }
        nflSchedulePredictor._nflTeams = [
    new nflSchedulePredictor.Team("bills", "afc", "east"),
    new nflSchedulePredictor.Team("dolphins", "afc", "east"),
    new nflSchedulePredictor.Team("patriots", "afc", "east"),
    new nflSchedulePredictor.Team("jets", "afc", "east"),
    new nflSchedulePredictor.Team("cowboys", "nfc", "east"),
    new nflSchedulePredictor.Team("giants", "nfc", "east"),
    new nflSchedulePredictor.Team("eagles", "nfc", "east"),
    new nflSchedulePredictor.Team("redskins", "nfc", "east"),
    new nflSchedulePredictor.Team("ravens", "afc", "north"),
    new nflSchedulePredictor.Team("bengals", "afc", "north"),
    new nflSchedulePredictor.Team("browns", "afc", "north"),
    new nflSchedulePredictor.Team("steelers", "afc", "north"),
    new nflSchedulePredictor.Team("bears", "nfc", "north"),
    new nflSchedulePredictor.Team("lions", "nfc", "north"),
    new nflSchedulePredictor.Team("packers", "nfc", "north"),
    new nflSchedulePredictor.Team("vikings", "nfc", "north"),
    new nflSchedulePredictor.Team("texans", "afc", "south"),
    new nflSchedulePredictor.Team("colts", "afc", "south"),
    new nflSchedulePredictor.Team("jaguars", "afc", "south"),
    new nflSchedulePredictor.Team("titans", "afc", "south"),
    new nflSchedulePredictor.Team("falcons", "nfc", "south"),
    new nflSchedulePredictor.Team("panthers", "nfc", "south"),
    new nflSchedulePredictor.Team("saints", "nfc", "south"),
    new nflSchedulePredictor.Team("buccaneers", "nfc", "south"),
    new nflSchedulePredictor.Team("broncos", "afc", "west"),
    new nflSchedulePredictor.Team("chiefs", "afc", "west"),
    new nflSchedulePredictor.Team("raiders", "afc", "west"),
    new nflSchedulePredictor.Team("chargers", "afc", "west"),
    new nflSchedulePredictor.Team("cardinals", "nfc", "west"),
    new nflSchedulePredictor.Team("49ers", "nfc", "west"),
    new nflSchedulePredictor.Team("seahawks", "nfc", "west"),
    new nflSchedulePredictor.Team("rams", "nfc", "west"),
    ];
        return nflSchedulePredictor._nflTeams;
    },
    Match: function (_awayTeam, _homeTeam) {
        this.homeTeam = _homeTeam || "",
        this.awayTeam = _awayTeam || "",
        this.homeTeamScore = 0,
        this.awayTeamScore = 0
    },
    schedule: [
    ],
    createRounds: function (numberRounds, numberGames) {
        for (var i = 1; i < numberRounds + 1; i++) {
            nflSchedulePredictor.schedule[i] = [];
            for (var j = 1; j < numberGames + 1; j++) {
                nflSchedulePredictor.schedule[i][j] = new nflSchedulePredictor.Match();
            }
        }
    },
    resetRound: function (roundNumber, numberGames) {
        for (var j = 1; j < numberGames + 1; j++) {
            nflSchedulePredictor.schedule[roundNumber][j] = new nflSchedulePredictor.Match();
        }
    },
    showTeamsRankings: function () {
        var ol = $("#nfl-teams-ranking");
        ol.empty();
        var nflTeams = nflSchedulePredictor.nflTeams();
        nflTeams = nflSchedulePredictor.sortedTeams(nflTeams);
        for (var i = 0; i < nflTeams.length; i++) {
            var imgHtml = "<img src='resources/redesigned logos/" + nflTeams[i].teamName + ".jpg' alt='" + nflTeams[i].teamName + "' with='75px' height='50px'";
            ol.append("<li>" + imgHtml + "</li>");
        }
    },
    showTeamsStandings: function () {
        nflSchedulePredictor.showDivisionStanding("#nfc-east-standings", "nfc", "east");
        nflSchedulePredictor.showDivisionStanding("#nfc-west-standings", "nfc", "west");
        nflSchedulePredictor.showDivisionStanding("#nfc-north-standings", "nfc", "north");
        nflSchedulePredictor.showDivisionStanding("#nfc-south-standings", "nfc", "south");
        nflSchedulePredictor.showDivisionStanding("#afc-east-standings", "afc", "east");
        nflSchedulePredictor.showDivisionStanding("#afc-west-standings", "afc", "west");
        nflSchedulePredictor.showDivisionStanding("#afc-north-standings", "afc", "north");
        nflSchedulePredictor.showDivisionStanding("#afc-south-standings", "afc", "south");
    },
    showDivisionStanding: function (idTable, conference, division) {
        var table = $(idTable);
        table.children().children().remove("tr:not(:first)");
        var teams = nflSchedulePredictor.getDivisionTeams(conference, division);
        teams = nflSchedulePredictor.sortedTeams(teams);
        for (var i = 0; i < teams.length; i++) {
            nflSchedulePredictor.AppendTableRow(table, teams[i]);
        }
    },
    getDivisionTeams: function (conference, division) {
        var teams = [];
        var count = 0;
        var nflTeams = nflSchedulePredictor.nflTeams();
        for (var i = 0; i < nflTeams.length; i++) {
            var team = nflTeams[i];
            if (team.conference === conference && team.division === division)
                teams[count++] = team;
        }
        return teams;
    },
    teamAddWin: function (teamName) {
        var nflTeams = nflSchedulePredictor.nflTeams();
        for (var i = 0; i < nflTeams.length; i++) {
            var team = nflTeams[i];
            if (team.teamName === teamName) {
                team.wins = team.wins + 1;
                nflTeams[i] = team;
                return;
            }
        }
    },
    teamSubtractWin: function (teamName) {
        var nflTeams = nflSchedulePredictor.nflTeams();
        for (var i = 0; i < nflTeams.length; i++) {
            var team = nflTeams[i];
            if (team.teamName === teamName) {
                team.wins = team.wins - 1;
                nflTeams[i] = team;
                return;
            }
        }
    },
    teamAddLoss: function (teamName) {
        var nflTeams = nflSchedulePredictor.nflTeams();
        for (var i = 0; i < nflTeams.length; i++) {
            var team = nflTeams[i];
            if (team.teamName === teamName) {
                team.losses = team.losses + 1;
                nflTeams[i] = team;
                return;
            }
        }
    },
    teamSubtractLoss: function (teamName) {
        var nflTeams = nflSchedulePredictor.nflTeams();
        for (var i = 0; i < nflTeams.length; i++) {
            var team = nflTeams[i];
            if (team.teamName === teamName) {
                team.losses = team.losses - 1;
                nflTeams[i] = team;
                return;
            }
        }
    },
    sortedTeams: function (teams) {
        return teams.sort(function (a, b) {
            if (a.pct() > b.pct())
                return -1;
            if (a.pct() < b.pct())
                return 1;
            if (a.wins > b.wins)
                return -1;
            if (a.wins < b.wins)
                return 1;
            if (a.losses < b.losses)
                return -1;
            if (a.losses > b.losses)
                return 1;
            if (a.teamName < b.teamName)
                return -1;
            if (a.teamName > b.teamName)
                return 1;
            return 0;
        });
    },
    AppendTableRow: function (table, team) {
        table.append("<tr><td>" + team.teamName + "</td><td>" + team.wins + "</td><td>" + team.losses + "</td><td>" + team.pct() + "</td></tr>");
    },
    FileRead: function (target, event) {
        var file = target.files[0];

        var fileReader = new FileReader();

        fileReader.onloadend = function (event) {
            var fileData = event.target.result;
            nflSchedulePredictor.schedule = JSON.parse(fileData);
            nflSchedulePredictor.showSchedule();
        };

        fileReader.readAsText(file);

    },
    showRoundNumbers: function () {
        var roundNumber = $("#roundNumber");
        roundNumber.empty();

        for (var i = 1; i < nflSchedulePredictor.schedule.length; i++) {
            var roundNr = "round" + i;
            var buttonHtml = "<button id=\"" + roundNr + "Btn\" onclick='nflSchedulePredictor.changeRound(" + i + ")'>Round " + i + "</button>"
            var roundNumberHtml = "<li id=\"" + roundNr + "\" class='roundNumberLi'>" + buttonHtml + "</li>";
            roundNumber.append(roundNumberHtml);
        }
    },
    showRoundGames: function (roundNr) {
        var round = $("#round");
        round.empty();
        var roundNumber = roundNr;

        for (var i = 1; i < nflSchedulePredictor.schedule[roundNumber].length; i++) {

            var gameNr = "game" + i;
            var idAwayTeam = gameNr + "awayTeam";
            var idHomeTeam = gameNr + "homeTeam";

            var awayTeam = "";
            var homeTeam = "";

            if (nflSchedulePredictor.schedule[roundNumber][i].homeTeam)
                homeTeam = nflSchedulePredictor.schedule[roundNumber][i].homeTeam;
            if (nflSchedulePredictor.schedule[roundNumber][i].awayTeam)
                awayTeam = nflSchedulePredictor.schedule[roundNumber][i].awayTeam;

            var label = "<label>Game " + i + "</label>";
            var awayTeamHtml = "<div id=\"" + idAwayTeam + "\" class='awayTeam'><label>" + awayTeam + "</label></div>";
            var sliderHtml = "<div id='slider" + i + "'></div>";
            var homeTeamHtml = "<div id=\"" + idHomeTeam + "\" class='homeTeam'><label>@" + homeTeam + "</label></div>";
            var teamsHtml = label + awayTeamHtml + sliderHtml + homeTeamHtml;
            var gameHtml = "<li id=\"" + gameNr + "\" class='game'>" + teamsHtml + "</li>";

            round.append(gameHtml);

            $("#slider" + i).slider({
                min: 0,
                max: 2,
                value: 1,
                change: function (event, ui) {
                    var gameNumber = ui.handle.parentNode.parentNode.id.replace("game", "");
                    //roundNr
                    if (ui.value == 2) {
                        ui.handle.style.left = "90%";
                        nflSchedulePredictor.schedule[roundNr][gameNumber].homeTeamScore = 1;
                        nflSchedulePredictor.teamAddWin(nflSchedulePredictor.schedule[roundNr][gameNumber].homeTeam);
                        nflSchedulePredictor.teamAddLoss(nflSchedulePredictor.schedule[roundNr][gameNumber].awayTeam);
                         if (nflSchedulePredictor.schedule[roundNr][gameNumber].awayTeamScore === 1) {
                             nflSchedulePredictor.schedule[roundNr][gameNumber].awayTeamScore = 0;
                            nflSchedulePredictor.teamSubtractLoss(nflSchedulePredictor.schedule[roundNr][gameNumber].homeTeam);
                            nflSchedulePredictor.teamSubtractWin(nflSchedulePredictor.schedule[roundNr][gameNumber].awayTeam);
                        }
                    }
                    if (ui.value == 0) {
                        ui.handle.style.left = "10%";
                        nflSchedulePredictor.schedule[roundNr][gameNumber].awayTeamScore = 1;
                        nflSchedulePredictor.teamAddLoss(nflSchedulePredictor.schedule[roundNr][gameNumber].homeTeam);
                        nflSchedulePredictor.teamAddWin(nflSchedulePredictor.schedule[roundNr][gameNumber].awayTeam);
                        if (nflSchedulePredictor.schedule[roundNr][gameNumber].homeTeamScore === 1) {
                            nflSchedulePredictor.schedule[roundNr][gameNumber].homeTeamScore = 0;
                            nflSchedulePredictor.teamSubtractWin(nflSchedulePredictor.schedule[roundNr][gameNumber].homeTeam);
                            nflSchedulePredictor.teamSubtractLoss(nflSchedulePredictor.schedule[roundNr][gameNumber].awayTeam);
                        }
                    }
                    if (ui.value == 1) {
                        if (nflSchedulePredictor.schedule[roundNr][gameNumber].homeTeamScore === 1) {
                            nflSchedulePredictor.teamSubtractWin(nflSchedulePredictor.schedule[roundNr][gameNumber].homeTeam);
                            nflSchedulePredictor.teamSubtractLoss(nflSchedulePredictor.schedule[roundNr][gameNumber].awayTeam);
                        }
                        if (nflSchedulePredictor.schedule[roundNr][gameNumber].awayTeamScore === 1) {
                            nflSchedulePredictor.teamSubtractLoss(nflSchedulePredictor.schedule[roundNr][gameNumber].homeTeam);
                            nflSchedulePredictor.teamSubtractWin(nflSchedulePredictor.schedule[roundNr][gameNumber].awayTeam);
                        }

                        nflSchedulePredictor.schedule[roundNr][gameNumber].homeTeamScore = 0;
                        nflSchedulePredictor.schedule[roundNr][gameNumber].awayTeamScore = 0;
                    }
                    nflSchedulePredictor.refreshData();
                }
            });
        }
        nflSchedulePredictor.styleRoundButton(roundNr);

    },
    styleRoundButton: function (roundNr) {
        var previousRound = $(".roundButtonStyle");
        previousRound.removeClass("roundButtonStyle");

        var roundNrBut = "round" + roundNr + "Btn";
        var roundBt = $("#" + roundNrBut);
        roundBt.addClass("roundButtonStyle");
    },
    showSchedule: function () {
        nflSchedulePredictor.showRoundNumbers();
        nflSchedulePredictor.showRoundGames(1);
    },
    changeRound: function (roundNr) {
        nflSchedulePredictor.showRoundGames(roundNr);
    },
    refreshData: function () {
        nflSchedulePredictor.showTeamsRankings();
        nflSchedulePredictor.showTeamsStandings();
    }
};