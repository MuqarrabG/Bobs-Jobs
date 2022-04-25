
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
    <p>Bob will have some job's here</p>
    `

    const target = document.getElementById(id)
    target.innerHTML = ''
    target.innerHTML = content
}

export const jobView = (id, job) => {

    const template = Handlebars.compile(`
        <div class=job>
            <h2>{{title}}</h2>
            <ul>
                <li>{{location}}</li>
                <li>{{type}}</li>
            </ul>
        </div>
    `)

    const target = document.getElementById(id)
    target.innerHTML = template(job)
}

export const jobListView = (id, jobArray) => {

    const template = Handlebars.compile(`
    {{#each array}}
        <div class=job>
          <ul>
            <li><a href="/#!/jobs/{{id}}">{{attributes.title}}</a></li>
            <li>attributes.location</li>
            <li>attributes.type</li>
          </ul>
        </div>
    {{/each}}
    `)

    const target = document.getElementById(id)
    target.innerHTML = template({array: jobArray})
}

export const errorView = () => {
    const target = document.getElementById('error')
    target.innerHTML = `<p>Page not found</p>`
}