import {Static} from './static.js'
import {LiveMenu} from './livemenu.js'
import {LiveView} from './liveview.js'
import {Menu} from './view.js'

// Initialize state objects for views
Menu(
    [new Static(), new LiveMenu(), new LiveView()],
    document.querySelector('main'),
    document.querySelector('nav'),
    ' - View template')
