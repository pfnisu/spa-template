import {Hello} from './hello.js'
import {StarWars} from './sw.js'
import {StarWarsLive} from './swlive.js'
import {request} from './request.js'

const nav = document.querySelector('nav')
const main = document.querySelector('main')

// Define state objects for views
const views = [new Hello(main), new StarWars(main), new StarWarsLive(main)]

// Set view to activated tab 
const setView = (ev) => {
    for (const v of views) v.stop()
    // Concatenate navigation from view titles
    nav.innerHTML = views.reduce((cat, v) => `${cat}<a>${v.title}</a>`, '')
    const index = ev
        ? views.findIndex((v) => v.title === ev.target.textContent)
        : request.cookie('tab') ?? 0
    nav.children[index].className = 'active'
    document.title = `${views[index].title}`
    if (!ev) request.interval = request.cookie('interval') ?? 10000
    views[index].start(request.interval)
    request.cookie('tab', index)
}

// Initialize view and setup a handler for nav
setView()
nav.addEventListener('mousedown', setView, true)
