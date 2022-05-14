
import { Auth } from './auth.js'
export { Model }
import * as views from "./views.js"


const Model = {

    //units_url:  "http://localhost:1337/api/units",
    //books_url:  "http://localhost:1337/api/books",

    jobs_url:  "http://localhost:1337/api/jobs",
    companies_url: "http://localhost:1337/api/companies",
    jobapplication_url: "http://localhost:1337/api/job-applications",
    
    // Model will hold the data stored in the model

    DATA: {
        //allUnits: [],
        //books: []

        allJobs: [],
        allCompanies: [],
        jobApllications: []
    },

    // single unit data
    //unitData: null,

    jobData: null,
    companyData: null,
    jobAppData: null,
    

    // fetch unit data from backend
    /*loadData: () => {
        fetch(Model.units_url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            Model.DATA.allUnits = data.data
            console.log("units loaded:", Model.DATA.allUnits)
            const event = new CustomEvent("modelUpdated");
            window.dispatchEvent(event);
        })
    },*/

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

    loadJobAppData: () => {
        fetch(Model.jobapplication_url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            Model.DATA.jobApllications = data.data
            console.log("job_applications loaded:", Model.DATA.jobApllications)
            const event = new CustomEvent("modelUpdated");
            window.dispatchEvent(event);
        })
    },


    // returns all units
    /*getUnits: () => {
        return Model.DATA.allUnits
    },*/

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

    getCompanies: () => {
        return Model.DATA.allCompanies
    },

    getJobApps: () => {
        return Model.DATA.jobApllications
    },

    // returns a unit by id
    getUnitLocal: (id) => {
        for(let i=0; i< Model.DATA.allUnits.length; i++){
           if (Model.DATA.allUnits[i].id == id) {
               return Model.DATA.allUnits[i]
           }
        }
        return null;
     },
    
    getUnit: (id) => {
        let filter = "?populate=textbook&filters[id][$eq]="
        let url_str = Model.units_url + filter + id
        fetch(url_str)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
                // console.log("getUnit: .then unit before:", Model.unitData)
                Model.unitData = data.data[0]
                // console.log("getUnit: .then unit after:", Model.unitData)
                views.unitView('content', Model.unitData)
                const event = new CustomEvent("modelUpdated");
                window.dispatchEvent(event);
        })
    },

    getCompanyLocal: (id) => {
        for(let i=0; i< Model.DATA.allCompanies.length; i++){
           if (Model.DATA.allCompanies[i].id == id) {
               return Model.DATA.allCompanies[i]
           }
        }
        return null;
     },
    
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
                views.companyView('company-jobs', Model.companyData?.attributes?.jobs?.data, Model.companyData)
                const event = new CustomEvent("modelUpdated");
                window.dispatchEvent(event);
        })
    },

    getJobLocal: (id) => {
        for(let i=0; i< Model.DATA.allJobs.length; i++){
           if (Model.DATA.allJobs[i].id == id) {
               return Model.DATA.allJobs[i]
           }
        }
        return null;
     },
    
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
                const event = new CustomEvent("modelUpdated");
                window.dispatchEvent(event);
        })
    }, 
    
    getJobAppLocal: (id) => {
        for(let i=0; i< Model.DATA.jobApllications.length; i++){
           if (Model.DATA.jobApllications[i].id == id) {
               return Model.DATA.jobApllications[i]
           }
        }
        return null;
     },
    
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
    addUnit: function(c,t,e,o) {
        console.log('the login token in ', Auth.getJWT())
   
        fetch(Model.units_url,
            {
                method: 'POST',
                headers: {
                        Authorization: 'bearer ' + Auth.getJWT(),
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        data: {
                            code: c,
                            title: t,
                            enrolments: e,
                            offering: o
                        }
                })
            })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("the new entry for unit is", data)
            Model.DATA.allUnits.push(data);
            console.log("after data added: ", Model.DATA.allUnits)
            const event = new CustomEvent("modelUpdated");
            window.dispatchEvent(event);
        })
    },

    // aupdate entolments for a given unit 
    updateEnrolments: function (unit_id,new_number) {
            console.log('update Enrolments: token ', Auth.getJWT())
            console.log('the new enrolments is ', new_number);
            fetch(this.units_url+'/'+ unit_id, {
                method: 'PUT',
                headers: {
              //      Authorization: 'bearer ' + Auth.getJWT(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        "data": {
                            "enrolments": Number(new_number)
                          }
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("after update", data);
                //update local copy
                this.DATA.allUnits = this.DATA.allUnits.map((unit) => {
                    if (unit.id == unit_id) {
                        unit.enrolments = new_number;
                    }
                    return unit
                })        
                const event = new CustomEvent("modelUpdated");
                window.dispatchEvent(event);
            })
    }
};
