
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
}

var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Flexo",
        attack: randomNumber(10, 14)
    },
    {
        name: "Clamps",
        attack: randomNumber(10,14)
    }
]

var fightOrSkip = function() {
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    promptFight = promptFight.toLowerCase();

    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        fightOrSkip();
    }

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
        // Confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if true leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // Subtract money from player for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 2);
            return true;
        }
    }
    return false;
}

// Takes parameter to start robot fight
var fight = function(enemy) {
    while(playerInfo.health >0 && enemy.health > 0) {

        if (fightOrSkip()) {
            break;
        }
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        // Subtract the values of `damage` from the value of `enemy.health` and use that result to update the value in the 'enemy.health' variable
        enemy.health = Math.max(0, enemy.health - damage);

        // Log a resulting message to the console so we know that it worked.
        console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

        // Check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            playerInfo.money = playerInfo.money + 20;
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.")
        }

        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        // Subtract the value of `damage` from the value `playerInfo.health` and use that result to update the value in the 'playerInfo.health' variable.
        playerInfo.health = Math.max(0, playerInfo.health - damage);

        // Log resulting message to the console so we know that it worked.
        console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining." );

        // Check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.")
        }
    }
}

var startGame = function() {
    // Reset player stats for new game
    playerInfo.reset();

    // Use a for loop to fight robots in sequence
    for (var i = 0; i < enemyInfo.length; i++) {
        // Prevent fights after player dies with an if condition
        if(playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            var pickedEnemyObj = enemyInfo[i];

            pickedEnemyObj.health = randomNumber(40, 60);

            fight(pickedEnemyObj);

            if (i < enemyInfo.length - 1 && playerInfo.health > 0) {

                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot in battle! Game OVer!");
            break;
        }
    }
    // Go to ending results
    endGame();
};

var endGame = function() {
    if (playerInfo.health > 0) {
        window.alert("Great job, your robot has survived! You now have a score of " + playerInfo.money + ".");
    } else {
        window.alert("You lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    // Prompt player for shop options
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;

        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");

            break;
        
        default:
            window.alert("You did not pick a valid option.");

            // Go back to start of shop to re-enter prompt
            shop();
            break;
    }
};

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
}

var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};

// Start the game on page load
startGame();