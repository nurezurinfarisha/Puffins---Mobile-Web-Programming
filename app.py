from flask import Flask, request, redirect, render_template, flash, url_for, session
from flask_session import Session
from sqlite3 import Error
import sqlite3
import uuid

app = Flask(__name__)
# app.secret_key = 'puffin'
sess = Session()


# SESSION_TYPE = 'yeet'
# app.config.from_object(__name__)
# Session(app)

# Database Connection
def create_connection():
    conn = None
    try:
        conn = sqlite3.connect('static/db/user.db')  # create a database connection
        return conn
    except Error as e:
        print(e)

    return conn


conn = create_connection()
cur = conn.cursor()

# Define the table creation query
user_creation_query = '''
CREATE TABLE IF NOT EXISTS user (
email TEXT PRIMARY KEY,
fullname TEXT,
username TEXT,
pswrd TEXT
);
'''

leaderboard_creation_query = '''
CREATE TABLE IF NOT EXISTS leaderboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    score INTEGER,
    category TEXT,
    difficulty TEXT
);
'''
# Execute the table creation query
cur.execute(user_creation_query)
cur.execute(leaderboard_creation_query)

# ---------TODO------------
# SCORE TABLE FOR QUIZ
# FLIPCARD TABLE
# NOTES TABLE


# Commit the changes and close the connection
conn.commit()
conn.close()


# -----------Routing----------------
@app.route('/')
def start():
    session['current_user'] = None
    session['logged_in'] = False
    session['category'] = None
    session['difficulty'] = None
    return redirect(url_for("login"))


@app.route('/home')
def home():
    flash('Welcome back!')
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    print("--------------MASUK ROUTE----------------")

    if request.method == "POST":
        email = request.form.get("email")
        pswrd = request.form.get("password")

        conn = create_connection()
        cur = conn.cursor()

        # Check if the email and password match a registered user
        cur.execute("SELECT * FROM user WHERE email=? AND pswrd=?", (email, pswrd))
        user = cur.fetchone()

        if user:
            # Authentication successful, redirect to a logged-in page
            session['logged_in'] = True
            session['current_user'] = user[0]

            print(session['logged_in'])
            print(session['current_user'])
            return redirect(url_for('home', user=session['current_user'], logged_in=session['logged_in']))

        # Authentication failed, handle this situation (e.g., show an error message)
        return render_template('login.html', user=session['current_user'], logged_in=session['logged_in'])

    return render_template('login.html', user=session['current_user'], logged_in=session['logged_in'])


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session['current_user'] = None
    session['logged_in'] = False
    return redirect(url_for("login"))


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == "POST":
        fullname = request.form.get("fullname")
        username = request.form.get("username")
        email = request.form.get("email")
        pswrd = request.form.get("password")

        conn = create_connection()
        cur = conn.cursor()

        # Check if the email is already registered
        cur.execute("SELECT * FROM user WHERE email=?", (email,))
        existing_user = cur.fetchone()

        if existing_user:
            # Email is already registered, handle this situation (e.g., show an error message)
            return render_template('register.html', error="Email is already registered.")

        # If the email is not registered, proceed with registration
        cur.execute("INSERT INTO user (email, fullname, username, pswrd) VALUES (?, ?, ?, ?)", (email, fullname, username, pswrd))
        conn.commit()

        return render_template('login.html')

    return render_template('register.html')


@app.route('/pengajaran')
def pengajaran():
    flash('Jom Belajar!')
    return render_template('pengajaran.html')


@app.route('/ukuran_asas')
def ukuran_asas():
    flash('Apakah Itu Ukuran Asas?')
    return render_template('ukuran_asas.html')


@app.route('/faktor_algebra')
def faktor_algebra():
    flash('Y+3=10. Apakah Y?')
    return render_template('faktor_algebra.html')


@app.route('/latihan')
def latihan():
    return render_template('latihan.html')


@app.route('/kuiz')
def kuiz():
    return render_template('quizzes.html')

@app.route('/kuizAlgE')
def kuizAlgE():
    session['category'] = "Algebra"
    session['difficulty'] = "Senang"
    return render_template('quizAlgEasy.html')

@app.route('/kuizAlgM')
def kuizAlgM():
    session['category'] = "Algebra"
    session['difficulty'] = "Sederhana"
    return render_template('quizAlgMed.html')

@app.route('/kuizAlgH')
def kuizAlgH():
    session['category'] = "Algebra"
    session['difficulty'] = "Susah"
    return render_template('quizAlgHard.html')

@app.route('/kuizUnitE')
def kuizUnitE():
    session['category'] = "Pengukuran Asas"
    session['difficulty'] = "Senang"
    return render_template('quizUnitEasy.html')

@app.route('/kuizUnitM')
def kuizUnitM():
    session['category'] = "Pengukuran Asas"
    session['difficulty'] = "Sederhana"
    return render_template('quizUnitMed.html')

@app.route('/kuizUnitH')
def kuizUnitH():
    session['category'] = "Pengukuran Asas"
    session['difficulty'] = "Susah"
    return render_template('quizUnitHard.html')

@app.route('/kuizLeaderboard')
def kuizLeaderboard():
    algebra = "Algebra"
    units = "Pengukuran Asas"

    conn = create_connection()
    cur = conn.cursor()

    # If the email is not registered, proceed with registration
        
    cur.execute('SELECT leaderboard.score, user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Pengukuran Asas" AND leaderboard.difficulty = "Senang" LIMIT 10;')
    UnitE = cur.fetchall()
    cur.execute('SELECT leaderboard.score, user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Pengukuran Asas" AND leaderboard.difficulty = "Sederhana" LIMIT 10;')
    UnitM = cur.fetchall()
    cur.execute('SELECT leaderboard.score, user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Pengukuran Asas" AND leaderboard.difficulty = "Susah" LIMIT 10;')
    UnitH = cur.fetchall()
    cur.execute('SELECT leaderboard.score, user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Algebra" AND leaderboard.difficulty = "Senang" LIMIT 10;')
    AlgE = cur.fetchall()
    cur.execute('SELECT leaderboard.score, user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Algebra" AND leaderboard.difficulty = "Sederhana" LIMIT 10;')
    AlgM = cur.fetchall()
    cur.execute('SELECT leaderboard.score, user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Algebra" AND leaderboard.difficulty = "Susah" LIMIT 10;')
    AlgH = cur.fetchall()

    return render_template('leaderboard.html', UnitE=UnitE, UnitM=UnitM, UnitH=UnitH, AlgE=AlgE, AlgM=AlgM, AlgH=AlgH)

@app.route('/submitScore', methods=['GET', 'POST'])
def submitScore():
    if request.method == "POST":
        finalScore = request.form.get("final-score-inp")

        conn = create_connection()
        cur = conn.cursor()

        # If the email is not registered, proceed with registration
        cur.execute("INSERT INTO leaderboard (email, score, category, difficulty) VALUES (?, ?, ?, ?)", (session['current_user'], finalScore, session['category'], session['difficulty']))
        conn.commit()

        session['category'] = None
        session['difficulty'] = None
        return redirect(url_for("kuiz"))

    return redirect(url_for("kuiz"))
    

if __name__ == '__main__':
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'

    sess.init_app(app)

    app.debug = True
    app.run()
