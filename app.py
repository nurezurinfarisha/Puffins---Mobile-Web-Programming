from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def home():  # put application's code here
    return render_template('quiz.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/register')
def register():
    return render_template('register.html')


@app.route('/pengajaran')
def pengajaran():
    return render_template('courses.html')


@app.route('/latihan')
def latihan():
    return render_template('about.html')


@app.route('/kuiz')
def kuiz():
    return render_template('quiz.html')


if __name__ == '__main__':
    app.run()
