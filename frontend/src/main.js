import { Router } from "./router.js";
import { aboutView, errorView, helpView, homeView, jobListView, jobView } from "./views.js";

let allJobs = []
let allCompanies = []

/*window.onload = () => {
    document.getElementById('main').innerHTML = "<p>Bob will have some job's here</p>"
}*/

const router = new Router(errorView)



/*router.get('/#!/about', () => {
    aboutView('main')
})*/

router.get('/', () => {
    console.log(router.routes)
    const jobs = getJobs(10)
    homeView('main')
    jobListView('content', jobs)
    classChanger('/')
})

const classChanger = (path) => {

    const targetHome = document.getElementById('home')
    const targetAbout = document.getElementById('about')
    const targetHelp = document.getElementById('help')

    console.log(targetAbout)

    if(path === '/about') {
        targetAbout.classList.add('selected')
        targetHelp.classList.remove('selected')
        targetHome.classList.remove('selected')
    }

    if(path === '/') {
        targetAbout.classList.remove('selected')
        targetHelp.classList.remove('selected')
        targetHome.classList.add('selected')
    }

    if(path === '/help') {
        targetAbout.classList.remove('selected')
        targetHelp.classList.add('selected')
        targetHome.classList.remove('selected')
    }
}

const loadData = () => {

    fetch('/sample-data.json')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        allJobs = data.jobs
        allCompanies = data.companies
        redraw()
    })
}

const getJob = (id) => {
    for(let i=0; i<allJobs.length; i++) {
        if (allJobs[i].id == id) {
            return allJobs[i]
        }
    }
    return null
}

const getJobs = (size) => {
    let jobs = []

    if(size == null) {
        return allJobs
    } else {
        for(let i = 0; i < size; i++) {
            jobs[i] = allJobs[i]
        }
        return jobs
    }

}

const getCompany = (id) => {
    for(let i=0; i<allCompanies.length; i++) {
        if (allCompanies[i].id == id) {
            return allCompanies[i]
        }
    }
    return null
}

const getCompanies = () => {
    return allCompanies
}

const redraw = () => {
    const hash = router.splitHash()

    console.log("HASH", hash)

    if(hash.path === '/about') {
        aboutView('main')
        classChanger(hash.path)
    }
    if(hash.path === '/help') {
        helpView('main')
        classChanger(hash.path)
    }
    router.route()
}

window.onload = loadData;
window.onhashchange = redraw;



  