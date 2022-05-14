import * as views from "./views.js";
import { Router } from './router.js'

let jobData =[]

const router = new Router(views.errorView)

router.get('/', () => {
    views.homeView('content', jobData.slice(0, 10));
})

router.get('/about', () => {
    views.aboutView('content')
})

router.get('/help', () => {
    views.helpView('content')
})

router.get('/jobs', (pathInfo) => {
    const pthInfo = parseInt(pathInfo.id)
    let pathNo = getPath(pthInfo)
    views.jobView('content', pathNo)
})

const getPath = (id) => {
    for (let i = 0; i < jobData.length; i++) {
        if (jobData[i].id == id) {
            return jobData[i]
        }
    }
    return null
}

const getCompanyPath = (id) => {
    for (let i = 0; i < jobData.length; i++) {
        if (jobData[i].attributes.company.data.id == id) {
            return jobData[i].attributes.company.data.id
        }
    }
    return null
}

router.get('/companies', (pathInfo) => {
    const pthInfo = parseInt(pathInfo.id)
    let pathNo = getCompanyPath(pthInfo)
    console.log(pathNo)
    views.companyView('content', pathNo)
})

const redraw = () => {
    router.route()
}

const loadData = () => {
    fetch("http://localhost:1337/api/jobs?populate=company&sort[0]=publishedAt%3Adesc")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            jobData = data.data;
            redraw();
        });
};

window.onload = loadData;