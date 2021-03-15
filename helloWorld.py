from bottle import route, run, template, get, post, request, static_file


@route('/hello')
def hello():
    return "Hello World!"


# Run this script, visit http://localhost:8080/hello and you will see “Hello World!” in your browser.


@route('/')
@route('/hello/<name>')
def greet(name='Stranger'):
    return template('Hello {{name}}, how are you?', name=name)


# Run this script, visit http://localhost:8080/hello/<yourName>


@get('/login')  # or @route('/login')
def login():
    return '''
        <form action="/login" method="post">
            Username: <input name="username" type="text" />
            Password: <input name="password" type="password" />
            <input value="Login" type="submit" />
        </form>
    '''


@post('/login')  # or @route('/login', method='POST')
def check_login(us, pa):
    return str.__and__(us == "username", pa == "password")


def do_login():
    username = request.forms.get('username')  # equal to document.getElementById('textbox_id').value
    password = request.forms.get('password')
    if check_login(username, password):
        return "<p>Your login information was correct.</p>"
    else:
        return "<p>Login failed.</p>"


@route('/static/<filename>')  # logo_poli
def server_static(filename):
    return static_file(filename, root='./CMRM_Social_Proj')


run(host='localhost', port=8080, debug=True)
