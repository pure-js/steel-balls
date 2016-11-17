# Steel balls
## Prerequisite

Install Node.js and npm if they are not already on your machine. You can do it using NVM
Also Install bower & gulp

    npm i -g bower
    npm i -g gulp

Then go to the next step.

## Run project
Go to the project directory

    cd steel-balls

Run the following commands

    npm i
    bower i
    gulp

And open [http://localhost:3000](localhost:3000) in a browser if it's not happen automatically.

## For deploy

    gulp deploy
    
## Crop images

    magick convert 'assets/welding.jpg' -resize x736 -crop 543x736+0+0 'assets/bg-xs.jpg'
    magick convert 'assets/welding.jpg' -resize x1024 -crop 767x1024+0+0 'assets/bg-sm.jpg'
    magick convert 'assets/welding.jpg' -crop 991x+0+0 'assets/bg-md.jpg'
    magick convert 'assets/welding.jpg' -crop 1119x+0+0 'assets/bg-lg.jpg'
    // magick convert 'assets/welding.jpg' -crop 543x+0+0 'assets/bg-xl.jpg'
    
font-blast bower_components\font-awesome\fonts\fontawesome-webfont.svg assets/icons
    
## TODO
- smooth scrolling