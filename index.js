import {Hello} from './hello.js'
import {StarWars} from './sw.js'
import {StarWarsLive} from './swlive.js'
import {Init} from './view.js'
import {request} from './request.js'

// Initialize state objects for views
Init(
    [new Hello(), new StarWars(), new StarWarsLive()],
    document.querySelector('main'),
    document.querySelector('nav'),
    request.cookie('tab') ?? 0)
