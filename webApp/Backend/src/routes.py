from src import app

@app.route('/')
def home():
    return "Hello from Flask!"

@app.route('/api/data', methods=['GET'])
def get_data():
    return {"message": "Hello from a modular Flask app!"}
