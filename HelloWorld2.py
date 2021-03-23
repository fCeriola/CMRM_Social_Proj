from bottle import run, route, template, request


@route('/')  # decorator
def root():
    return '<h1>Welcome to the root</h1>'


@route('/login')
def login():
    return '<h1>Login Page</h1>'


@route('/dynamic/<my_id>')
def dynamic(my_id):
    return '<H1>Articles are Dynamic pages, this is the number' + my_id + '</h1>'


@route('/dynamic/<my_id>/<name>')
def dynamic(my_id, name):
    return '<H1>Articles are Dynamic pages, this is the number' + my_id + ', owned by ' + name + '</h1>'


@route('/getter', method='GET')
def getter():
    return '<h1>Getter Page</h1>'


# templates
@route('/template')
def index():
    return template('index', name='owner')


# requests
@route('/q_request')
def q_request():
    p1 = request.query.par1
    p2 = request.query.par2

    return '<h1>The values of the parameters are ' + p1 + ' and ' + p2 + '</h1>'
    # http://127.0.0.1:8080/q_request?par1=ppp1&par2=ppp2

if __name__ == '__main__':
    run(debug=True, reloader=True)
