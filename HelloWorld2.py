# import bottle
# import bottle_sqlite
from bottle import run, route, template, request, error, abort, install
from bottle_sqlite import SQLitePlugin


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


@route('/poster', method='POST')  # when a request is received
def poster():
    return '<h1>Poster Page</h1>'


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


# error handling
@error(404)
def not_found(my_error):
    return '<h1>Content not found</h1>' + my_error


# error 401 override
@error(401)
def not_allowed(my_error):
    return '<h1>You are not allowed to view this page</h1>' + my_error


@route('/not_allowed_page')
def not_allowed_page():
    abort(401)


# sqlite install 1

# app = bottle.Bottle()
# plugin = bottle.ext.sqlite.Plugin(db_file='/tmp/test.db')
# app.install(plugin)


#@app.route('/show/:item')
#def show(item, db):
#    row = db.execute('SELECT * from items where name=?', item).fetchone()
#   if row:
#        return template('show_item', page=row)
#    return bottle.HTTPError(404, "Page not found")
#

# sqlite install 2
install(SQLitePlugin(dbfile=r'.\\inventory.db'))


@route('/show/<device_name:string>')
def show_device(db, device_name):
    command = db.execute('SELECT * FROM device', device_name)  # dove cazzo è device
    row = command.fetchone()
    return template('{{row}}', row=row)


if __name__ == '__main__':
    run(debug=True, reloader=True)
