import {Hello} from './hello.js'
import {StarWars} from './sw.js'
import {StarWarsLive} from './swlive.js'
import {Menu} from './view.js'

// Initialize state objects for views
Menu(
    [new Hello(), new StarWars(), new StarWarsLive()],
    document.querySelector('main'),
    document.querySelector('nav'),
    ' - View template')
