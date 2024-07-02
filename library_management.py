class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password

class Admin(User):
    def __init__(self, username, password):
        super().__init__(username, password)

users = [User("user1", "pass1"), User("user2", "pass2")]
admins = [Admin("admin1", "adminpass1"), Admin("admin2", "adminpass2")]

def login(username, password, user_list):
    for user in user_list:
        if user.username == username and user.password == password:
            return user
    return None

def user_dashboard():
    # In a real application, this function would handle user-specific actions
    return "Welcome to the User Dashboard"

def admin_dashboard():
    # In a real application, this function would handle admin-specific actions
    return "Welcome to the Admin Dashboard"

from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def authenticate():
    data = request.get_json()
    role = data['role']
    username = data['username']
    password = data['password']

    if role.lower() == "user":
        user = login(username, password, users)
        if user:
            return jsonify({'message': user_dashboard()})
    elif role.lower() == "admin":
        admin = login(username, password, admins)
        if admin:
            return jsonify({'message': admin_dashboard()})
    
    return jsonify({'error': 'Invalid credentials'})

if __name__ == '__main__':
    app.run(debug=True)
