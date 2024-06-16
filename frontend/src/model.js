// module name: model.js


import { Auth } from './auth.js'
export { Model }
import * as views from "./views.js"



const Model = {

    //Model will store links to api items require for the assignment spec

    jobs_url:  "http://localhost:1337/api/jobs",
    companies_url: "http://localhost:1337/api/companies",
    jobapplication_url: "http://localhost:1337/api/job-applications",
    
    // Model will hold the data stored in the model

    DATA: {
    
        allJobs: [],
        allCompanies: [],
        jobApllications: [],
        jobAppID: []
    },

    // Following will hold single data types of there defined variables

    jobData: null,
    companyData: null,
    jobAppData: null,
   
    /**
     * Calling this function makes a GET request for jobs data
     * data is then converted to json
     * data is then assigned to allJobs array
     * dispatches modelUpdated event
     */

    loadJobData: () => {
        let filter = "sort[0]=publishedAt%3Adesc"
        let relation = "populate=%2A"
        let url_str = Model.jobs_url + "?" + filter + "&" + relation
        fetch(url_str)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            Model.DATA.allJobs = data.data
            console.log("jobs loaded:", Model.DATA.allJobs)
            const event = new CustomEvent("modelUpdated");
            window.dispatchEvent(event);
        })
    },

    /**
     * Calling this function makes a GET request for companies data
     * data is then converted to json
     * data is then assigned to allCompanies array
     * dispatches modelUpdated event
     */

    loadCompanyData: () => {
        let filter = "?populate=%2A"
        let url_str = Model.companies_url + filter
        fetch(url_str)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            Model.DATA.allCompanies = data.data
            console.log("companies loaded:", Model.DATA.allCompanies)
            const event = new CustomEvent("modelUpdated");
            window.dispatchEvent(event);
        })
    },

     /**
     * Calling this function makes a authenticated GET request for job_application data
     * data is then converted to json
     * data is then assigned to allCompanies array
     * dispatches modelUpdated event
     */

    loadJobAppData: () => {
        console.log('the login token in ', Auth.getJWT())
        let filter = "?populate=*"
        let url_str = Model.jobapplication_url + filter
        fetch(url_str,
            {
                method: 'GET',
                headers: {
                        Authorization: 'bearer ' + Auth.getJWT(),
                        //'Content-Type': 'application/json'
                }
            })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            Model.DATA.jobApllications = data.data
            console.log("Job Applications loaded : ", Model.DATA.jobApllications)
            const event = new CustomEvent("modelUpdated");
            window.dispatchEvent(event);
        })
    },


    /**
     * Calling this function returns allJobs array if the size is null or undefined
     * If the size is defined it will return allJobs array to required size
     */

    getJobs: (size) => {
        let jobs = []

        if(size == null) {
            return Model.DATA.allJobs
        } else {
            for(let i = 0; i < size; i++) {
                jobs[i] = Model.DATA.allJobs[i]
            }
            return jobs
        }
    },

    // returns allCompanies array

    getCompanies: () => {
        return Model.DATA.allCompanies
    },

    /**
     * Returns jobs application that are submitted by a user
     */

    getJobUserApps: (userID) => {
        let jobs = []
        let j = 0;
        for(let i=0; i < Model.DATA.jobApllications.length; i++) {
            console.log(Model.DATA.jobApllications[i].attributes?.user?.data?.id)
            if(Model.DATA.jobApllications[i].attributes?.user?.data?.id === userID) {
                    jobs[j] = Model.DATA.jobApllications[i].attributes?.job?.data
                    j++
            }
        }
            return jobs
    },

    // returns a unit by id
    
    getCompanyLocal: (id) => {
        for(let i=0; i< Model.DATA.allCompanies.length; i++){
           if (Model.DATA.allCompanies[i].id == id) {
               return Model.DATA.allCompanies[i]
           }
        }
        return null;
     },

     /**
     * Calling this function makes a GET request for company data by id
     * data is then converted to json
     * data is then assigned to companyData
     * dispatches modelUpdated event
     */
    
    getCompany: (id) => {
        let filter = "?populate=%2A&textbook&filters[id][$eq]="
        let url_str = Model.companies_url + filter + id
        fetch(url_str)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
                // console.log("getUnit: .then unit before:", Model.unitData)
                Model.companyData = data.data[0]
                // console.log("getUnit: .then unit after:", Model.unitData)
                views.companyViewName('content', Model.companyData)
                views.jobsViewBasic('company-jobs', Model.companyData?.attributes?.jobs?.data)
                const event = new CustomEvent("modelUpdated");
                window.dispatchEvent(event);
        })
    },
    
    /**
     * Calling this function makes a GET request for job data by id
     * data is then converted to json
     * data is then assigned to jobData
     * dispatches modelUpdated event
     */

    getJob: (id) => {
        let filter = "?populate=%2A&textbook&filters[id][$eq]="
        let url_str = Model.jobs_url + filter + id
        fetch(url_str)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
                // console.log("getUnit: .then unit before:", Model.unitData)
                Model.jobData = data.data[0]
                // console.log("getUnit: .then unit after:", Model.unitData)
                //views.jobView('content', Model.jobData)
                if(Auth.getUser()) {
                    views.jobLoggedInView('content', Model.jobData)
                    //location.reload()
                } else {
                    views.jobView('content', Model.jobData)
                    //location.reload()
                }
                const event = new CustomEvent("modelUpdated");
                window.dispatchEvent(event);
        })
    }, 
    
    /**
     * Calling this function makes a GET request for job-application data by id
     * data is then converted to json
     * data is then assigned to jobAppData
     * dispatches modelUpdated event
     */

    getJobApp: (id) => {
        let filter = "?populate=textbook&filters[id][$eq]="
        let url_str = Model.jobapplication_url + filter + id
        fetch(url_str)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
                // console.log("getUnit: .then unit before:", Model.unitData)
                Model.jobAppData = data.data[0]
                // console.log("getUnit: .then unit after:", Model.unitData)
                //views.unitView('content', Model.unitData)
                const event = new CustomEvent("modelUpdated");
                window.dispatchEvent(event);
        })
    },

    

    // addUnit - add a new unit by submitting a request to the server API
    //  formdata is a FormData object containing all fields in the unt object
    // when the request is resolved, creates an "unitAdded" event

    /**
     * 
     * @param {*} t input text from textarea
     * @param {*} j job that user applied for to create a relation in server API
     * @param {*} u user information to create a relation in servers API
     * 
     * addApplication - add a new job application by submitting a request to the server API
     * job application is a FormData object containing all fields in the job application object
     * when the request is resolved, creates an "modelUpdated" event
     */

    addApplication: function(t,j,u) {
        console.log('the login token in ', Auth.getJWT())
   
        fetch(Model.jobapplication_url,
            {
                method: 'POST',
                headers: {
                        Authorization: 'bearer ' + Auth.getJWT(),
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        data: {
                            text: t,
                            job: j,
                            user: u,
                        }
                })
            })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("the new entry for job_application is", data)
            // Model.DATA.jobApllications.push(data);
            // Model.DATA.jobAppID.push(j);
            // console.log("after data added: ", Model.DATA.jobApllications)
            const event = new CustomEvent("modelUpdated");
            window.dispatchEvent(event);
        })
    },
};
