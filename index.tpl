% if True:                          # switch to py coding using %
    <h1>True branch template</h1>
% else:
    <h1>else block</h1>
% end

% for i in range(10):
    <p>Iteration number {{i}}</p>
% end

<h1>Hello, {{ name }}</h1>