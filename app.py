from flask import Flask, render_template, flash
import uuid


app = Flask(__name__)
app.secret_key = 'puffins'


@app.route('/')
def home():
    flash('Welcome back!')
    return render_template('index.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/register')
def register():
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
    return render_template('quiz.html')


if __name__ == '__main__':
    app.run()
