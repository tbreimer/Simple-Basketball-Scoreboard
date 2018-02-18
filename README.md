# Simple-Basketball-Scoreboard
A web interface for entering and displaying some simple elements of a basketball game.

Upon loading game.html in your browser, some alerts should pop up asking the name of each team, number of points, turnovers, fouls, and time in the game clock. If these do not pop up, just refresh the page. After completing the alerts the scoreboard will be set up.

## Team 1
Team 1 is on the left side of the scoreboard, and the following keys will help you edit the team’s statistics.

- **1** Add one point to the score
- **2** Add two points to the score
- **3** Add three points to the score
- **0** Pressing 0 and then 1, 2, or 3 signifies a missed shot of the value you pressed
- **–** Add a turnover
- **=** Add a foul

## Team 2
Team 2 is on the right side of the scoreboard. Many of its statistics can be controlled by keys on the numpad, but there are alternatives if your keyboard does not have one.

- **Numpad 1 or Z** Add one point to the score
- **Numpad 2 or X** Add two points to the score
- **Numpad 3 or C** Add three points to the score
- **Numpad 0 or M** Pressing 0 and then 1, 2, or 3 signifies a missed shot of the value you pressed
- **Numpad – or ,** Add a turnover
- **Numpad + or .** Add a foul

## Clock
- **G** Starts and stops the clock

## Font Size
Holding one of these keys and at the same time pressing the up or down arrow changes the font size or the specified element.

- **Q** Team names
- **W** Scores
- **E** Game clock
- **R** Statistics

## Appearance
- **K** Toggles background color
- **L** Hides/shows statistics

## Console
To show the console, right click and then click “inspect” or “inspect element”. Then navigate to the console. There, every action of the game is logged.

- **S** Print statistics

By typing into the console and then pressing enter, the statistics can be directly changed. The examples show how to changes team 1’s statistics, but team 2’s statistics can be modified by simply replacing the 1 with a 2. The number you wish to set the statistic to goes in place of x. After changing a statistic, click the web page and press R to refresh the scoreboard.

- **team1.name = “x”** The new name must be enclosed in quotation marks
- **team1.score = x** 
- **team1.made1s = x**
- **team1.missed1s = x**
- **team1.made2s = x**
- **team1.missed2s = x**
- **team1.made3s = x**
- **team1.missed3s = x**
- **team1.fouls = x**
- **team1.turnovers = x**
- **time = x** Total time in seconds
