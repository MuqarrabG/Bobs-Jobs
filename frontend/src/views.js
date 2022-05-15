// module name: views.js
// student name: Muhammad Muqarrab Ghori
// student number: 47111496

export const aboutView = (id) => {
    const content = `
    <p>Bob's Jobs is a revolution in career planning brought to you
    by Bob Bobalooba himself!</p>
    `

    const target = document.getElementById(id)
    target.innerHTML = content
}

export const helpView = (id) => {
    const content = `
    <p>Be sure to he honest in your application!</p>
    `
    const target = document.getElementById(id)
    target.innerHTML = content
}

export const homeView = (id) => {
    const content = `
    <div id="main">
    </div>
    <div id="content"></div>
    `

    const target = document.getElementById(id)
    target.innerHTML = content
}

export const jobView = (id, job) => {

    const template = Handlebars.compile(`
        <h2>{{attributes.title}}</h2>
            <img src={{attributes.company.data.attributes.logo}} alt="company logo">
            <ul>
                <li>{{attributes.location}}</li>
                <li>{{attributes.type}}</li>
                <li><a href="/#!/companies/{{attributes.company.data.id}}">{{attributes.company.data.attributes.name}}</a></li>
            </ul>
        <div class=job-description>{{{attributes.description}}}</div>
    `)

    const target = document.getElementById(id)
    target.innerHTML = template(job)
}

export const jobLoggedInView = (id, job) => {

    const template = Handlebars.compile(`
        <h2>{{attributes.title}}</h2>
            <img src={{attributes.company.data.attributes.logo}} alt="company logo">
            <ul>
                <li>{{attributes.location}}</li>
                <li>{{attributes.type}}</li>
                <li><a href="/#!/companies/{{attributes.company.data.id}}">{{attributes.company.data.attributes.name}}</a></li>
                <li><button id=jobApplicationButton >Apply for this Job</button></li>
            </ul>
        <div class=job-description>{{{attributes.description}}}</div>
    `)

    const target = document.getElementById(id)
    target.innerHTML = template(job)
}

export const jobsViewBasic = (id, jobArray) => {

    const template = Handlebars.compile(`
        {{#each array}}
            <div class=job>
            <h3><a href="/#!/jobs/{{id}}">{{attributes.title}}</a></h3>
                <ul>
                    <li>{{attributes.location}}</li>
                    <li>{{attributes.type}}</li>
                </ul>
            </div>
        {{/each}}
    `)

    const target = document.getElementById(id)
    target.innerHTML = template({array: jobArray})
}

export const companyViewName = (id, company) => {
    const template = Handlebars.compile(`
    <div id=company-name>
        <h2>{{attributes.name}}</h2>
        <div id=company-jobs></div>
    </div>
    `)

    const target = document.getElementById(id)
    target.innerHTML = template(company)
}

export const jobListView = (id, jobArray) => {

    const template = Handlebars.compile(`
    {{#each array}}
        <div class=job>
        <h3><a href="/#!/jobs/{{id}}">{{attributes.title}}</a></h3>
          <ul>
            <li>{{attributes.location}}</li>
            <li>{{attributes.type}}</li>
            <li><a href="/#!/companies/{{attributes.company.data.id}}">{{attributes.company.data.attributes.name}}</a></li>
          </ul>
        </div>
    {{/each}}
    `)

    const target = document.getElementById(id)
    target.innerHTML = template({array: jobArray})
}

export const loggedInView = (id, id1, username) => {
    const template = Handlebars.compile(`
        <p id=UserLoggedIn>Logged in as {{user}} <button id="logoutbutton">Logout</button></p>
    `)

    const template1 = Handlebars.compile(`
        <ul>
            <li class="selected" id="home"><a href="/#">Home</a></li>
            <li class="" id="about"><a href="/#!/about">About Us</a></li>
            <li class="" id="help"><a href="/#!/help">Applicant Help</a></li>
            <li class="" id="me"><a href="/#!/me">My Page</a></li>
        </ul>
    `)

    const target = document.getElementById(id)
    target.innerHTML = template({user: username})

    const target1 = document.getElementById(id1)
    target1.innerHTML = template1()
}

export const loggedOutView = (id, id1) => {
    const template = Handlebars.compile(`
        <label for=username> Username: </label>
        <input name=username>
        <label for=password> Password: </label>
        <input name=password type="password" autocomplete="on">
        <input id="loginbutton" type=submit>
        <a id="errorLogIn"></a>
    `)

    const template1 = Handlebars.compile(`
        <ul>
            <li class="selected" id="home"><a href="/#">Home</a></li>
            <li class="" id="about"><a href="/#!/about">About Us</a></li>
            <li class="" id="help"><a href="/#!/help">Applicant Help</a></li>
        </ul>
    `)

    const target = document.getElementById(id)
    target.innerHTML = template()

    const target1 = document.getElementById(id1)
    target1.innerHTML = template1()
}

export const logInErrorView = () => {
    const target = document.getElementById('errorLogin')
    target.innerHTML = `<p>Invalid Username or Password</p>`
}

export const clearLogInErrorView = () => {
    const target = document.getElementById('errorLogin')
    target.innerHTML = ``
}

export const jobAppForm = (id) => {
    const template = Handlebars.compile(`
        <div id=jobApplication-sub>
            <form id=jobapplication-form action=http://localhost:8083/#!/me>
                <p><label for=jobSubmission>Job Application Form</label></p>
                <textarea id="jobSubmission" name="text" rows="4" cols="50"></textarea>
                <br>
                <input type="submit" value="Submit Application">
            </form>
        </div>
    `)

    const target = document.getElementById(id)
    target.innerHTML = template()
}

export const errorView = () => {
    const target = document.getElementById('content')
    target.innerHTML = `
    <div id="error">
        <p>Page not found</p>
    </div>    
    `
}

export const clearErrorView = () => {
    const target = document.getElementById('error')
    target.innerHTML = ""
}