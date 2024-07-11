import mysql.connector
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# MySQL database connection setup
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="E%?ZltH9f7VR8q(^",
    database="sportscomp"
)

# Create a cursor object using the cursor() method
mycursor = mydb.cursor()

# Create registrations table if it doesn't exist
mycursor.execute('''
    CREATE TABLE IF NOT EXISTS registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        age INT,
        sport VARCHAR(255),
        date_of_birth DATE
    )
''')

# Commit the transaction
mydb.commit()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dates')
def show_dates():
    # Retrieve data from the database and pass it to the template...
    return render_template('dates.html')

@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        age = request.form['age']
        sport = request.form['sport']
        date_of_birth = request.form['date_of_birth']

        # print("Form Data Received:")
        # print(f"First Name: {first_name}")
        # print(f"Last Name: {last_name}")
        # print(f"Age: {age}")
        # print(f"Sport: {sport}")
        # print(f"Date: {date}")

        # Insert form data into registrations table
        sql = "INSERT INTO registrations (first_name, last_name, age, sport, date_of_birth) VALUES (%s, %s, %s, %s, %s)"
        val = (first_name, last_name, age, sport, date_of_birth)
        try:
            mycursor.execute(sql, val)
            mydb.commit()
            print("Data inserted successfully!")
        except Exception as e:
            print("Error inserting data:", e)
            mydb.rollback()

        return redirect(url_for('show_dates'))


if __name__ == '__main__':
    app.run(debug=True)
