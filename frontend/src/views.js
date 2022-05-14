
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

export const companyView = (id, jobArray, company) => {

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

    //const companyLinkTemp = Handlebars.compile(`<a href="/#!/companies/{{id}}">{{attributes.name}}</a>`)

    const target = document.getElementById(id)
    target.innerHTML = template({array: jobArray})
    //const targetCom = document.getElementById('company-link')
    //targetCom.innerHTML = companyLinkTemp(company)
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

export const loggedInView = (id, username) => {
    const template = Handlebars.compile(`
        <p id=UserLoggedIn>Logged in as {{user}} <button id="logoutbutton">Logout</button></p>
    `)

    const target = document.getElementById(id)
    target.innerHTML = template({user: username})
}

export const loggedOutView = (id) => {
    const template = Handlebars.compile(`
        <label for=username> Username: </label>
        <input name=username>
        <label for=password> Password: </label>
        <input name=password type="password" autocomplete="on">
        <input id="loginbutton" type=submit>
        <a id="errorLogIn"></a>
    `)

    const target = document.getElementById(id)
    target.innerHTML = template()
}

export const logInErrorView = () => {
    const target = document.getElementById('errorLogin')
    target.innerHTML = `<p>Invalid Username or Password</p>`
}

export const clearLogInErrorView = () => {
    const target = document.getElementById('errorLogin')
    target.innerHTML = ``
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