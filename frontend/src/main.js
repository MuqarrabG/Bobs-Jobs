// module name: main.js
// student name: Muhammad Muqarrab Ghori
// student number: 47111496

import * as views from "./views.js"
import { Model } from "./model.js"
import { Router } from './router.js'
import { Auth } from "./auth.js"

//creates new Router passes a errorview in case the url being visited is not in url directory

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

router.get('/me', () => {

    const jobs = Model.getJobUserApps(Auth.getUser().id)
    console.log(jobs)

    views.jobsViewBasic('content', jobs)
})

router.get('/jobs', (pathInfo) => {
    if(pathInfo.id) {
        console.log("pathid, fetched id", pathInfo.id, Model.jobData)

        if(Model.jobData == null || pathInfo.id != Model.jobData.id) {
            Model.getJob(pathInfo.id)
            //views.jobView('content', Model.jobData)

            if(Auth.getUser()) {
                views.jobLoggedInView('content', Model.jobData)
                //location.reload()
            } else {
                views.jobView('content', Model.jobData)
                //location.reload()
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
            views.jobsViewBasic('company-jobs', Model.companyData?.attributes?.jobs?.data)
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

/**
 * 
 * changes class of object with the href of "path"
 */

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

    //console.log(document.querySelector('#UserLoggedIn'))

}

const bindings = () => {
    searchFormHandler()

    loginFormHandler()

    jobAppFormHandler()
}

// implements the search function and changes the url

function searchFormHandler(){
    let searchButton = document.querySelector('#searchbutton');
    let searchInput = document.querySelector('#search')

    searchButton.addEventListener('click', () => {
        console.log(searchInput.value)
        location.href = "/#!/search/" + searchInput.value
    })
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
            //window.location.reload()
        }
    }
    
    /**
     * IF the user is logged in successfully it changes the view and display who is logged in
     * Add a logoff button and clicking it would log the user off
     */

    if(Auth.getUser()) {
        views.loggedInView('login-form', 'nav main-nav', Auth.getUser().username)
        //Model.loadJobAppData()
        console.log('GOT EM')

        let logoutButton = document.querySelector('#logoutbutton');

        logoutButton.addEventListener('click', () => {
            Auth.logOff()
            console.log(Auth.getUser())
            views.loggedOutView('login-form', 'nav main-nav')
            //window.location.reload()
            // let event = new CustomEvent('userLogoff')
            // window.dispatchEvent(event)
        })
    }

    //displays a error if the wrong details are added or details don't match with the backend database

    if(Auth.userData?.error?.status) {
        console.log('AYO FAM ENTER THE CORRECT DETAILS')
        views.logInErrorView()
    } 
}

function jobAppFormHandler() {
    let jobAppButton = document.querySelector('#jobApplicationButton');

    if(isNaN(jobAppButton)) {
        jobAppButton.addEventListener('click', () => {
            console.log("ITS WORKING FAM", window.location)
            views.jobAppForm('content')

            const jobAppForm = document.getElementById('jobapplication-form')

            jobAppForm.onsubmit = (event) => {
                event.preventDefault();
                const text = jobAppForm.elements['text'].value;
                console.log(text, Model.jobData.id, Auth.getUser().id)

                Model.addApplication(text, Model.jobData.id, Auth.getUser().id)
                Model.loadJobAppData()
                location.href = "/#!/me"
            }
        })
    }
}

/**
 * on window load its calls the data company and job load function
 * to load in the data to make them ready for main.js
 */

window.onload = () => {
    //redraw()
    //loadData()

    Model.loadCompanyData()
    Model.loadJobData()
    //Model.loadJobAppData()
}

window.addEventListener('modelUpdated', redraw);
window.addEventListener('userLogin', () => {
    //redraw()
    Model.loadJobAppData()
});
// window.addEventListener('userLogoff', redraw)





  