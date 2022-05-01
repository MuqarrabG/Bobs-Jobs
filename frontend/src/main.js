import { Router } from "./router.js";
import { aboutView, clearErrorView, companyView, companyViewName, errorView, helpView, homeView, jobListView, jobView } from "./views.js";

let allJobs = []
let allCompanies = []
let allComJob = [[]]

/*window.onload = () => {
    document.getElementById('main').innerHTML = "<p>Bob will have some job's here</p>"
}*/

const router = new Router(errorView)

router.get('/', () => {
    const jobs = getJobs(10)
    homeView('content-container')
    jobListView('content', jobs)
    classChanger('/')
})


router.get('/about', () => {
    aboutView('content')
    //clearErrorView()
    classChanger('/about')
})

router.get('/help', () => {
    helpView('content')
    //clearErrorView()
    classChanger('/help')
})

router.get('/jobs', (pathInfo) => {
    jobView('content', getJob(pathInfo.id))
})

router.get('/companies', (pathInfo) => {
    companyViewName('content', getCompany(pathInfo.id))
    companyView('company-jobs', getCompanyJobs(pathInfo.id))
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

}

window.onload = () => {
    redraw()
    loadData()
}





  