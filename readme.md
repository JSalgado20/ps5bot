# PS5Bot
## TLDR: This code can be used by people who are not programmers. It will be easier if you know how to code, but you can do without it.
## Project Overview
### Credit
This program is a modification of https://github.com/VVNoodle/PS5bot this guy's code. He made a wonderful project which taught me a lot about typescript and nodes and things I didn't even understand until I began this project. l even copied parts of his `README.md`, so dont give the credit to me for this project. All respect and most credit to this person who archived the project now sadly. That being said I did spend hours working on it and hope you make good use of it.

### Purpose
For right now the purpose of this bot is to help my friend buy a PSS. I am not a scammer or scalper. I am trying to help my friend who is having trouble buying a PSS becuase of all the scammers and scalpershing the release of the PSS
Keep in mind the MT License added, if something goes wrong and you accidentally order 10,000 PS5, nomy problem. However, I did workers to create a good user product and sincerely hope it benefits you. Also, I used this code on my own credit card and I trust it to do what I said it would do. I just put the license to get rid of any

### This isn't a high tech hacking bot

The PSSBot is not a high tech hacking bot, it is very simple. It is basically a refresh" bot. When you turn it on keep refreshing every 10 seconds until it sees the PS5 is back in stock. FOR THIS REASON, it will work beceron websites that don't tell you when they restock

For example, on the morning of Sunday November 22nd, Best Buy dropped PSS stock, no one knew they were going to do it at 5 am, so this bot might have caught it
I have been running this boton Best Buy and Target and have yet to actually buy a PS5 with it. However, I got it to buy paper for me from both Best Buy and Target, so we know it works

## Your options
I only created the code for Best Buy and Target because they don't tell us when they will drop. I will make a youtube video on how to do it for another website, such as playstation direct. However, for now if you're not a programmer, you're limited to Best Buy and Target.
Installation overview
I did all this on macos, linux should be no problem also. For Windows, if you're a programmer you will probably be able to manage it but I'm not going to explain how to do it for those of you who arn't programmers because I don't have a Windows machine.
Installation
(Again, credit to the originator of this project, he wrote much of this part and many others.)
1. Install Node.js
L version should be >12.9
ii. Follow the install process 2. Install git 3. download this project
i git clone https://github.com/nasoby/ps5bot 4. Open the terminal app on macos 5. Go to project directory cd /the/project/directory
. For this don't actually type cd /the/project/directory ii. Open up finder i. Go to the PS5Bot folder (Don't go inside it) iv. Right click on it V. Hold down the option key vi. Select Copy "PS5Bot" as pathnane vii. Go back to the terminal viii. Type cd, and put one space, then paste the pathname
ix. Hit enter, nothing should happen 6. Install yarn by running npn 1 -9 yarn 7. Install dependencies by running yarn 8. Make CLI callable
yarn Link


## Setup
1. Run ps5bot.
1. Repeat step 5 of the installation process (which will bring you back into the correct folder), then type cd
bin (hit enter) ii. Type ./psSbot (hit enter)
i. Follow the prompts, close the window when youre done 2. Run scrape 3. Repeat parti of step 1 of setup just above). 4. Type /psbot scrape (hit enter) 5. Select the wesbites you want to scrape using the spacebar (hit enter) 6. Watch in amazement


## Bot Configs
Don't worry about this part if you successfully completed setup. Just double check everything went smoothly by finding the config.json file and making sure your data looks correct.
Otherwise, use these instructions:
Configs are read in config.json file. You can either run psSbot to generate a config file, or duplicate configTemplate.json , rename to config.json, and fill out the fields.
"cw": "900", "target Email": "nyemail@yahoo.con", "target Password": "password", "bestBuyEmail": "nyemail@yahoo.con", "bestBuyPassword": "password"
• Double quotes on text is required • Anything after the // are comments for clarification. Remove them if you try to copy paste this example
(including the // ) for Target, make sure you have no carts in your account already
Make sure to run this script and keep the terminal open if you want it to keep refreshing the page. (Basically just follow the setup steps, and don't close any windows
Notes
• Make sure not to use a VPN since it will possibly trigger captcha verification • Make sure nothing ese exists in your carts, otherwise this code will order those too! • recommend getting a fan and pointing it directly at your laptop to keep it cool. All this work for several days is
exaughsting on a computer. • Restart your computer to give it a break every day, then turn the code back on.

