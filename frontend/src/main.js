import { split_hash } from "./util.js"
import * as views from "./views.js"
import { Model } from "./model.js"
import { Router } from './router.js'
import { Auth } from "./auth.js"

let allJobs = []
let allCompanies = []
let allComJob = [[]]

/*window.onload = () => {
    document.getElementById('main').innerHTML = "<p>Bob will have some job's here</p>"
}*/


const router = new Router(views.errorView)

router.get('/', () => {
    //const jobs = getJobs(10)

    const jobs = Model.getJobs(10)
    views.homeView('content-container')
    views.jobListView('content', jobs)
    classChanger('/')
})


router.get('/about', () => {
    views.aboutView('content')
    //clearErrorView()
    classChanger('/about')
})

router.get('/help', () => {
    views.helpView('content')
    //clearErrorView()
    classChanger('/help')
})

router.get('/jobs', (pathInfo) => {
    views.jobView('content', getJob(pathInfo.id))
})

router.get('/companies', (pathInfo) => {
    views.companyViewName('content', getCompany(pathInfo.id))
    views.companyView('company-jobs', getCompanyJobs(pathInfo.id))
})

const classChanger = (path) => {

    const targetHome = document.getElementById('home')
    const targetAbout = document.getElementById('about')
    const targetHelp = document.getElementById('help')

    //console.log(targetAbout)

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

/*const setComJob = () => {
    for(let i = 0; i <= allCompanies; i++) {
        for(let j = 0; j <= allJobs; i++) {
            if (allCompanies[i].id === allJobs[j]) {
                
            }
        }
    }
}*/

const getCompanyJobs = (id) => {
    let jobs = []
    let j = 0;

    for(let i = 0; i < allJobs.length; i++) {
        if (allJobs[i].attributes.company.data.id == id) {
            jobs[j] = allJobs[i]
            j++;
        }
    }
    return jobs
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

    router.route()

    console.log(allCompanies)
    console.log(allJobs)
    console.log(getCompany(1113))

    for(let i=0; i<allCompanies.length; i++) {
        console.log(allCompanies[i].id)
    }
    console.log('break')
    for(let i=0; i<allJobs.length; i++) {
        console.log(allJobs[i].attributes.company.data.id)
    }
    console.log('break')

    console.log(getCompanyJobs(1097))
    console.log('break')
    console.log(Model.DATA.allJobs)

}

window.onload = () => {
    redraw()
    loadData()

    Model.loadCompanyData
    Model.loadJobData()
    Model.loadJobAppData
}

window.addEventListener('modelUpdated', redraw);
window.addEventListener('userLogin', redraw);





  