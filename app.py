from flask import Flask, request, redirect, render_template, flash, url_for, session
from flask_session import Session
from sqlite3 import Error
import sqlite3
from werkzeug.utils import secure_filename
import os
from flask_login import LoginManager, login_required, UserMixin, login_user, logout_user

app = Flask(__name__)
# app.secret_key = 'puffin'
sess = Session()

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


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
pswrd TEXT,
profile_image TEXT DEFAULT 'default.jpg'
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


@app.route('/')
def landing():
    return render_template('landing.html')


# -----------Routing----------------
@app.route('/home')
@login_required
def home():
    flash('Welcome back!')
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM user WHERE email=?", (session['current_user'],))
    user = cur.fetchone()
    return render_template('index.html', username=session['username'], user=user)


class User(UserMixin):
    def __init__(self, email, fullname, username, pswrd, profile_image='default.jpg'):
        self.id = email
        self.fullname = fullname
        self.username = username
        self.pswrd = pswrd
        self.profile_image = profile_image


@login_manager.user_loader
def load_user(user_id):
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM user WHERE email=?", (user_id,))
    user = cur.fetchone()
    if user:
        return User(*user)
    return None


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
            session['username'] = user[2]

            print(session['logged_in'])
            print(session['current_user'])
            login_user(User(*user))
            return redirect(url_for('home', user=session['current_user'], username=session['username'], logged_in=session['logged_in']))

    # If the request method is GET or the authentication failed, handle this situation
    username = session['username'] if 'username' in session else None
    current_user = session['current_user'] if 'current_user' in session else None
    logged_in = session['logged_in'] if 'logged_in' in session else False
    return render_template('login.html', user=current_user, username=username, logged_in=logged_in)


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session['current_user'] = None
    session['logged_in'] = False
    logout_user()
    return redirect(url_for("landing"))


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
@login_required
def pengajaran():
    flash('Jom Belajar!')
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM user WHERE email=?", (session['current_user'],))
    user = cur.fetchone()
    return render_template('pengajaran.html', username=session['username'], user=user)


@app.route('/ukuran_asas')
@login_required
def ukuran_asas():
    flash('Apakah Itu Ukuran Asas?')
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM user WHERE email=?", (session['current_user'],))
    user = cur.fetchone()
    return render_template('ukuran_asas.html', username=session['username'], user=user)


@app.route('/faktor_algebra')
@login_required
def faktor_algebra():
    flash('Y+3=10. Apakah Y?')
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM user WHERE email=?", (session['current_user'],))
    user = cur.fetchone()
    return render_template('faktor_algebra.html', username=session['username'], user=user)


@app.route('/latihan')
@login_required
def latihan():
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM user WHERE email=?", (session['current_user'],))
    user = cur.fetchone()
    return render_template('latihan.html', username=session['username'], user=user)

#region Ezu Card

@app.route('/card_algebra')
@login_required
def card_algebra():
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM user WHERE email=?", (session['current_user'],))
    user = cur.fetchone()
    # flash('Mari cuba soalan Algebra!')
    return render_template('card_algebra.html', username=session['username'], user=user)

@app.route('/card_ukuran')
@login_required
def card_ukuran():
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM user WHERE email=?", (session['current_user'],))
    user = cur.fetchone()
    # flash('Mari cuba soalan Pengukuran Asas!')
    return render_template('card_ukuran.html', username=session['username'], user=user)

#endregion

#region Quizzes
@app.route('/kuiz')
@login_required
def kuiz():
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM user WHERE email=?", (session['current_user'],))
    user = cur.fetchone()
    return render_template('quizzes.html', username=session['username'], user=user)


@app.route('/kuizAlgE')
@login_required
def kuizAlgE():
    session['category'] = "Algebra"
    session['difficulty'] = "Senang"
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM user WHERE email=?", (session['current_user'],))
    user = cur.fetchone()
    return render_template('quizAlgEasy.html', username=session['username'], user=user)


@app.route('/kuizAlgM')
@login_required
def kuizAlgM():
    session['category'] = "Algebra"
    session['difficulty'] = "Sederhana"
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM user WHERE email=?", (session['current_user'],))
    user = cur.fetchone()
    return render_template('quizAlgMed.html', username=session['username'], user=user)


@app.route('/kuizAlgH')
@login_required
def kuizAlgH():
    session['category'] = "Algebra"
    session['difficulty'] = "Susah"
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM user WHERE email=?", (session['current_user'],))
    user = cur.fetchone()
    return render_template('quizAlgHard.html', username=session['username'], user=user)


@app.route('/kuizUnitE')
def kuizUnitE():
    session['category'] = "Pengukuran Asas"
    session['difficulty'] = "Senang"

    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM user WHERE email=?", (session['current_user'],))
    user = cur.fetchone()

    return render_template('quizUnitEasy.html', username=session['username'], user=user)


@app.route('/kuizUnitM')
def kuizUnitM():
    session['category'] = "Pengukuran Asas"
    session['difficulty'] = "Sederhana"

    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM user WHERE email=?", (session['current_user'],))
    user = cur.fetchone()

    return render_template('quizUnitMed.html', username=session['username'], user=user)


@app.route('/kuizUnitH')
def kuizUnitH():
    session['category'] = "Pengukuran Asas"
    session['difficulty'] = "Susah"

    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM user WHERE email=?", (session['current_user'],))
    user = cur.fetchone()

    return render_template('quizUnitHard.html', username=session['username'], user=user)


@app.route('/kuizLeaderboard')
def kuizLeaderboard():
    algebra = "Algebra"
    units = "Pengukuran Asas"

    conn = create_connection()
    cur = conn.cursor()

    # If the email is not registered, proceed with registration

    cur.execute(
        'SELECT leaderboard.score, user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Pengukuran Asas" AND leaderboard.difficulty = "Senang" ORDER BY leaderboard.score DESC LIMIT 10;')
    UnitE = cur.fetchall()
    cur.execute(
        'SELECT leaderboard.score, user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Pengukuran Asas" AND leaderboard.difficulty = "Sederhana" ORDER BY leaderboard.score DESC LIMIT 10;')
    UnitM = cur.fetchall()
    cur.execute(
        'SELECT leaderboard.score, user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Pengukuran Asas" AND leaderboard.difficulty = "Susah" ORDER BY leaderboard.score DESC LIMIT 10;')
    UnitH = cur.fetchall()
    cur.execute(
        'SELECT leaderboard.score, user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Algebra" AND leaderboard.difficulty = "Senang" ORDER BY leaderboard.score DESC LIMIT 10;')
    AlgE = cur.fetchall()
    cur.execute(
        'SELECT leaderboard.score, user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Algebra" AND leaderboard.difficulty = "Sederhana" ORDER BY leaderboard.score DESC LIMIT 10;')
    AlgM = cur.fetchall()
    cur.execute(
        'SELECT leaderboard.score, user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Algebra" AND leaderboard.difficulty = "Susah" ORDER BY leaderboard.score DESC LIMIT 10;')
    AlgH = cur.fetchall()

    cur.execute("SELECT * FROM user WHERE email=?", (session['current_user'],))
    user = cur.fetchone()

    return render_template('leaderboard.html', username=session['username'], user=user, UnitE=UnitE, UnitM=UnitM, UnitH=UnitH, AlgE=AlgE, AlgM=AlgM,
                           AlgH=AlgH)


@app.route('/submitScore', methods=['GET', 'POST'])
def submitScore():
    if request.method == "POST":
        finalScore = request.form.get("final-score-inp")

        conn = create_connection()
        cur = conn.cursor()

        # If the email is not registered, proceed with registration
        cur.execute("INSERT INTO leaderboard (email, score, category, difficulty) VALUES (?, ?, ?, ?)",
                    (session['current_user'], finalScore, session['category'], session['difficulty']))
        conn.commit()

        session['category'] = None
        session['difficulty'] = None
        return redirect(url_for("kuizLeaderboard"))

    return redirect(url_for("kuiz"))

#endregion

@app.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    conn = create_connection()
    cur = conn.cursor()

    if request.method == "POST":
        # Get the updated data from the form
        fullname = request.form.get("fullname")
        username = request.form.get("username")
        password = request.form.get("password")
        profile_image = request.files.get("profile_image")

        # Save the uploaded image to a directory
        if profile_image:
            filename = secure_filename(profile_image.filename)
            os.makedirs('static/images', exist_ok=True)  # Create the directory if it doesn't exist
            profile_image.save(os.path.join('static/images', filename))

            # Update the user's profile image in the database
            cur.execute("UPDATE user SET profile_image=? WHERE email=?", (filename, session['current_user']))
            conn.commit()

        # Update the user's data in the database
        cur.execute("UPDATE user SET fullname=?, username=?, pswrd=? WHERE email=?", (fullname, username, password, session['current_user']))
        conn.commit()

        # Update the username in the session
        session['username'] = username

    # Fetch the user's data from the database
    cur.execute("SELECT * FROM user WHERE email=?", (session['current_user'],))
    user = cur.fetchone()
    
    #----Medal Fetching-----\
    index = 0
    medalUnitE = None
    medalUnitM = None
    medalUnitH = None
    medalAlgE = None
    medalAlgM = None
    medalAlgH = None
   
    
    #region Alge Easy
    AlgEStmtn1 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Algebra" AND leaderboard.difficulty = "Senang" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 0;'
    AlgEStmtn2 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Algebra" AND leaderboard.difficulty = "Senang" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 1;'
    AlgEStmtn3 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Algebra" AND leaderboard.difficulty = "Senang" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 2;'
    cur.execute(AlgEStmtn3)
    AlgE3 = cur.fetchone()
    cur.execute(AlgEStmtn2)
    AlgE2 = cur.fetchone()
    cur.execute(AlgEStmtn1)
    AlgE1 = cur.fetchone()
    
    if(AlgE3):
        if(AlgE3[0]==session['username']):
            medalAlgE = "Bronze"
    if(AlgE2):
        if(AlgE2[0]==session['username']):
            medalAlgE = "Silver"
    if(AlgE1):
        if(AlgE1[0]==session['username']):
            medalAlgE = "Gold"
        
    #endregion
            
    #region Alge Med
    AlgMStmtn1 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Algebra" AND leaderboard.difficulty = "Sederhana" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 0;'
    AlgMStmtn2 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Algebra" AND leaderboard.difficulty = "Sederhana" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 1;'
    AlgMStmtn3 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Algebra" AND leaderboard.difficulty = "Sederhana" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 2;'
    cur.execute(AlgMStmtn3)
    AlgM3 = cur.fetchone()
    cur.execute(AlgMStmtn2)
    AlgM2 = cur.fetchone()
    cur.execute(AlgMStmtn1)
    AlgM1 = cur.fetchone()
    
    if(AlgM3):
        if(AlgM3[0]==session['username']):
            medalAlgM = "Bronze"
    if(AlgM2):
        if(AlgM2[0]==session['username']):
            medalAlgM = "Silver"
    if(AlgM1):
        if(AlgM1[0]==session['username']):
            medalAlgM = "Gold"
        
    #endregion
    
    #region Alge Hard
    AlgHStmtn1 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Algebra" AND leaderboard.difficulty = "Susah" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 0;'
    AlgHStmtn2 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Algebra" AND leaderboard.difficulty = "Susah" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 1;'
    AlgHStmtn3 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Algebra" AND leaderboard.difficulty = "Susah" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 2;'
    cur.execute(AlgHStmtn3)
    AlgH3 = cur.fetchone()
    cur.execute(AlgHStmtn2)
    AlgH2 = cur.fetchone()
    cur.execute(AlgHStmtn1)
    AlgH1 = cur.fetchone()
    
    if(AlgH3):
        if(AlgH3[0]==session['username']):
            medalAlgH = "Bronze"
    if(AlgH2):
        if(AlgH2[0]==session['username']):
            medalAlgH = "Silver"
    if(AlgH1):
        if(AlgH1[0]==session['username']):
            medalAlgH = "Gold"
        
    #endregion
    
    #region unit Easy
    UnitEStmtn1 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Pengukuran Asas" AND leaderboard.difficulty = "Senang" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 0;'
    UnitEStmtn2 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Pengukuran Asas" AND leaderboard.difficulty = "Senang" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 1;'
    UnitEStmtn3 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Pengukuran Asas" AND leaderboard.difficulty = "Senang" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 2;'
    cur.execute(UnitEStmtn3)
    UnitE3 = cur.fetchone()
    cur.execute(UnitEStmtn2)
    UnitE2 = cur.fetchone()
    cur.execute(UnitEStmtn1)
    UnitE1 = cur.fetchone()
    
    if(UnitE3):
        if(UnitE3[0]==session['username']):
            medalUnitE = "Bronze"
    if(UnitE2):
        if(AlgE2[0]==session['username']):
            medalUnitE = "Silver"
    if(UnitE1):
        if(UnitE1[0]==session['username']):
            medalUnitE = "Gold"
        
    #endregion
            
    #region unit Med
    UnitMStmtn1 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Pengukuran Asas" AND leaderboard.difficulty = "Sederhana" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 0;'
    UnitMStmtn2 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Pengukuran Asas" AND leaderboard.difficulty = "Sederhana" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 1;'
    UnitMStmtn3 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Pengukuran Asas" AND leaderboard.difficulty = "Sederhana" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 2;'
    cur.execute(UnitMStmtn3)
    UnitM3 = cur.fetchone()
    cur.execute(UnitMStmtn2)
    UnitM2 = cur.fetchone()
    cur.execute(UnitMStmtn1)
    UnitM1 = cur.fetchone()
    
    if(UnitM3):
        if(UnitM3[0]==session['username']):
            medalUnitM = "Bronze"
    if(UnitM2):
        if(UnitM2[0]==session['username']):
            medalUnitM = "Silver"
    if(UnitM1):
        if(UnitM1[0]==session['username']):
            medalUnitM = "Gold"
        
    #endregion
    
    #region unit HArdc
    UnitHStmtn1 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Pengukuran Asas" AND leaderboard.difficulty = "Senang" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 0;'
    UnitHStmtn2 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Pengukuran Asas" AND leaderboard.difficulty = "Senang" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 1;'
    UnitHStmtn3 = 'SELECT user.username FROM leaderboard JOIN user ON leaderboard.email = user.email WHERE leaderboard.category = "Pengukuran Asas" AND leaderboard.difficulty = "Senang" ORDER BY leaderboard.score DESC LIMIT 1 OFFSET 2;'
    cur.execute(UnitHStmtn3)
    UnitH3 = cur.fetchone()
    cur.execute(UnitHStmtn2)
    UnitH2 = cur.fetchone()
    cur.execute(UnitHStmtn1)
    UnitH1 = cur.fetchone()
    
    if(UnitH3):
        if(UnitH3[0]==session['username']):
            medalUnitH = "Bronze"
    if(UnitH2):
        if(UnitH2[0]==session['username']):
            medalUnitH = "Silver"
    if(UnitH1):
        if(UnitH1[0]==session['username']):
            medalUnitH = "Gold"
        
    #endregion
    


    # Pass the user's data to the template
    return render_template('profile.html', user=user, medalAlgE=medalAlgE, medalAlgM=medalAlgM, medalAlgH=medalAlgH, medalUnitE=medalUnitE, medalUnitM=medalUnitM, medalUnitH=medalUnitH)


if __name__ == '__main__':
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'

    sess.init_app(app)

    app.debug = True
    app.run()
