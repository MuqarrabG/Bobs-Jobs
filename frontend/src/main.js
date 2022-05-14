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
    if(pathInfo.id) {
        console.log("pathid, fetched id", pathInfo.id, Model.jobData)

        if(Model.jobData == null || pathInfo.id != Model.jobData.id) {
            Model.getJob(pathInfo.id)
            if(Auth.getUser()) {
                views.jobLoggedInView('content', Model.jobData)
            } else {
                views.jobView('content', Model.jobData)
            }
        }
    }
    //views.jobView('content', getJob(pathInfo.id))
})

router.get('/companies', (pathInfo) => {
    if(pathInfo.id) {
        console.log("pathid, fetched id", pathInfo.id, Model.companyData)

        if(Model.companyData == null || pathInfo.id != Model.companyData.id) {
            Model.getCompany(pathInfo.id)
            console.log('This is the company:', Model.companyData)
            views.companyViewName('content', Model.companyData)
            views.companyView('company-jobs', Model.companyData?.attributes?.jobs?.data, Model.companyData)
        }
    }

    //views.companyViewName('content', getCompany(pathInfo.id))
    //views.companyView('company-jobs', getCompanyJobs(pathInfo.id))
})

router.get('/search', (pathInfo) => {
    if(pathInfo.id) {
        console.log(pathInfo)
        let jobs = []
        let j = 0;
        for(let i=0; i < Model.DATA.allJobs.length; i++) {
            if(Model.DATA.allJobs[i].attributes.description.match(pathInfo.id)) {
                jobs[j] = Model.DATA.allJobs[i]
                j++
            }
        }
        console.log(jobs)

        views.jobListView('content', jobs)
    }

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
    bindings()

    // console.log(allCompanies)
    // console.log(allJobs)
    // console.log(getCompany(1113))

    // for(let i=0; i<allCompanies.length; i++) {
    //     console.log(allCompanies[i].id)
    // }
    // console.log('break')
    // for(let i=0; i<allJobs.length; i++) {
    //     console.log(allJobs[i].attributes.company.data.id)
    // }
    // console.log('break')

    // console.log(getCompanyJobs(1097))
    // console.log('break')
    // console.log(Model.DATA.allJobs)

    console.log(document.querySelector('#UserLoggedIn'))

}

const bindings = () => {
    searchFormHandler()

    loginFormHandler()
}

function searchFormHandler(){
    // const searchButton = document.getElementById("searchbutton");
    // const searchInput = document.querySelector("[data-search]");
    // const searchForm = document.getElementById('search-form')

    let searchButton = document.querySelector('#searchbutton');
    let searchInput = document.querySelector('#search')

    searchButton.addEventListener('click', () => {
        console.log(searchInput.value)
        location.href = "/#!/search/" + searchInput.value
    })

    // searchButton.onclick = () => {
    //     console.log("FUCK")
    //     searchInput.addEventListener("input", e => {
    //         let value = e.target.value
    //         console.log(value)
    //         let jobs = []
    //         let j = 0;
    //         for(let i=0; i < Model.DATA.allJobs.length; i++) {
    //             if(Model.DATA.allJobs[i].attributes.description.match(value)) {
    //                 jobs[j] = Model.DATA.allJobs[i]
    //                 j++
    //             }
    //         }
    //         console.log(jobs)
    //     })
    // }
}

function loginFormHandler(){

    if (!Auth.getUser()) {
        // install login handler
        const loginform = document.getElementById('login-form')
        loginform.onsubmit = (event) => {
            event.preventDefault();
            const username = loginform.elements['username'].value
            const password = loginform.elements['password'].value
            const authInfo = {
                'identifier': username,
                'password': password
            }
        
            //send authInfo to backend for user authentication
            Auth.login(authInfo)
        }
    }

    if(Auth.getUser()) {
        views.loggedInView('login-form', Auth.getUser().username)
        console.log('FUCKING GOT HIM')

        let logoutButton = document.querySelector('#logoutbutton');

        logoutButton.addEventListener('click', () => {
            Auth.logOff()
            console.log(Auth.getUser())
            views.loggedOutView('login-form')
        })
    }

    if(Auth.userData?.error?.status) {
        console.log('passssss FUCXKER')
        views.logInErrorView()
    }
    
}


window.onload = () => {
    //redraw()
    //loadData()

    Model.loadCompanyData()
    Model.loadJobData()
    Model.loadJobAppData()
}

window.addEventListener('modelUpdated', redraw);
window.addEventListener('userLogin', redraw);





  