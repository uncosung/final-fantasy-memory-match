# Final Fantasy Memory Match
* Live Demo: __https://memory-match.ericsung.dev__

<hr/>

A memory matching game themed in the various games of the Final Fantasy franchise. Pick two cards to see if they match. For every incorrect match you make, you (the black mage) take damage. For every correct match you make, the enemy (the blue slime) takes damage. If your HP reaches 0, the game is over. If the slime's HP reaches 0, you win! After your victory, you can add your initials to the high score database.

## Getting Started
### Initial Setup
1. Fork this repo and clone your fork from the terminal.
```
$ git clone https://github.com/[user_name]/final-fantasy-memory-match.git
```
2. Navigate into the cloned directory and install the necessary dependencies.
```
$ npm install
```
3. Start a dev environment with access to Apache and MySQL and:
    * Check that port is directed to ```3000```
    * Create a database titled ```memory_match``` in phpMyAdmin and import the ```high-scores.sql``` file
    * Check that the root directory of the server is set to the ```public``` folder
4. Initiate the dev server
```
$ npm run dev
```
5. Go to ```localhost:3000``` and enjoy!

## Contributing
Please feel free to fork this repo, make changes, submit pull requests, and send suggestions to eric.k.sung@gmail.com to make this app better.

## Built With
* Front-End
  * [JavaScript](https://www.ecma-international.org/publications/standards/Ecma-262.htm)
  * [jQuery](https://https://jquery.com/)
* Back-End
  * [PHP](https://php.net/)
  * [MySQL](https://www.mysql.com/) + [phpMyAdmin](https://www.phpmyadmin.net/)

## License
[MIT License](https://opensource.org/licenses/mit-license.php)

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
