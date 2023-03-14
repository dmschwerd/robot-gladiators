var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roberto", "Flexo", "Clamps"];
var enemyHealth = 50;
var enemyAttack = 12;

// Takes parameter to start robot fight
var fight = function(enemyName) {
    while(playerHealth >0 && enemyHealth > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose." );

        // if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if true leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // Subtract money from player for skipping
                playerMoney = Math.max(0, playerMoney - 2);
                console.log("playerMoney ", playerMoney);
                break;
            }
        }

        var damage = randomNumber(playerAttack - 3, playerAttack);

        // Subtract the values of `damage` from the value of `enemyHealth` and use that result to update the value in the 'enemyHealth' variable
        enemyHealth = Math.max(0, enemyHealth - damage);

        // Log a resulting message to the console so we know that it worked.
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

        // Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            playerMoney = playerMoney + 20;
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.")
        }

        var damage = randomNumber(enemyAttack - 3, enemyAttack);

        // Subtract the value of `damage` from the value `playerHealth` and use that result to update the value in the 'playerHealth' variable.
        playerHealth = Math.max(0, playerHealth - damage);

        // Log resulting message to the console so we know that it worked.
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining." );

        // Check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.")
        }
    }
}

var startGame = function() {
    // Set/reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    // Use a for loop to fight robots in sequence
    for (var i = 0; i < enemyNames.length; i++) {
        // Prevent fights after player dies with an if condition
        if(playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            var pickedEnemyName = enemyNames[i];

            enemyHealth = randomNumber(40, 60);

            fight(pickedEnemyName);

            if (i < enemyNames.length - 1 && playerHealth > 0) {

                var storeConfirm = window.confirm("The fight is over, visit the store before the next round.");

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
    if (playerHealth > 0) {
        window.alert("Great job, your robot has survived! You now have a score of " + playerMoney + ".");
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
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                playerHealth = playerHealth + 20;
                playerMoney = Math.max(0, playerMoney - 7);
            } else {
                window.alert("You don't have enough money!");
            }
            break;

        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                playerAttack = playerAttack + 6;
                playerMoney = Math.max(0, playerMoney - 7);
            } else {
                window.alert("You don't have enough money!");
            }
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

// Start the game on page load
startGame();