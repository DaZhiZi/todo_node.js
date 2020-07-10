const fs = require('fs')

const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')

const log = console.log.bind(console)

const app = express()

const loadTodos = () => {
    let data = fs.readFileSync('todo.json')
    let todos = JSON.parse(data)
    return todos
}

const saveTodos = (todos) => {
    let s = JSON.stringify(todos, null, 2)
    fs.writeFileSync('todo.json', s)
}

const todoList = loadTodos()


app.use(express.static('static'))
app.use(cors())
app.use(bodyParser.json())

const sendHtml = (response, path) => {
    let options = {
        encoding: 'utf-8',
    }
    fs.readFile(path, options, (error, data) => {
        response.send(data)
    })
}

const sendJSON = (response, data) => {
    let r = JSON.stringify(data, null, 2)
    response.send(r)
}

const todoAdd = (form) => {
    if (todoList.length === 0) {
        form.id = 1
    } else {
        let tail = todoList[todoList.length - 1]
        form.id = tail.id + 1
    }
    let now = Date.now()
    form.createdTime = now
    form.updatedTime = now
    form.done = false
    todoList.push(form)
    saveTodos(todoList)
    return form
}

const todoUpdate = (id, form) => {
    id = Number(id)
    let todo = todoList.find(e => e.id === id)
    if (todo === undefined) {
        return {}
    } else {
        todo.updatedTime = Date.now()
        Object.entries(form).forEach(entry => {
            let [k, v] = entry
            todo[k] = v
        })
        saveTodos(todoList)
        return todo
    }
}

const todoDelete = (id) => {
    id = Number(id)
    let index = todoList.findIndex(e => e.id === id)
    if (index > -1) {
        let t = todoList.splice(index, 1)[0]
        saveTodos(todoList)
        return t
    } else {
        return {}
    }
}

app.get('/', (request, response) => {
    let path = 'index.html'
    sendHtml(response, path)
})

app.get('/api/todo/all', (request, response) => {
    sendJSON(response, todoList)
})

app.post('/api/todo/add', (request, response) => {
    let form = request.body
    log('form', form)
    let todo = todoAdd(form)
    sendJSON(response, todo)
})

app.post('/api/todo/update/:id', (request, response) => {
    let id = request.params.id
    let form = request.body
    let todo = todoUpdate(id, form)
    sendJSON(response, todo)
})


app.get('/api/todo/delete/:id', (request, response) => {
    let id = request.params.id
    let todo = todoDelete(id)
    sendJSON(response, todo)
})

const todoFetch = (id) => {
    id = Number(id)
    let todo = todoList.find(e => e.id === id)
    if (todo === undefined) {
        return {}
    } else {
        return todo
    }
}

app.get('/api/todo/:id', (request, response) => {
    let id = request.params.id
    let todo = todoFetch(id)
    sendJSON(response, todo)
})

const main = () => {
    let server = app.listen(8000, () => {
        let host = server.address().address
        let port = server.address().port

        log(`应用实例，访问地址为 http://${host}:${port}`)
    })
}

if (require.main === module) {
    main()
}
