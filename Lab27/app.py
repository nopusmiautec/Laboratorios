from flask import Flask, request, jsonify
from game_state import Game

app = Flask(__name__)
game = Game()

@app.route('/game/create', methods=['GET'])
def create_game():
    game.reset()
    return jsonify({"message": "Game created successfully"}), 200

@app.route('/game/status', methods=['GET'])
def get_status():
    return jsonify(game.get_status()), 200

@app.route('/dice', methods=['GET'])
def toss_coin():
    return jsonify({"starter": game.toss_coin()}), 200

@app.route('/game/create/<int:player>', methods=['POST'])
def place_ships(player):
    data = request.get_json()
    try:
        game.place_ships(player, data['ships'])
        return jsonify({"message": f"Player {player} ships placed"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/game/turn', methods=['POST'])
def attack():
    data = request.get_json()
    try:
        result = game.attack(data['player'], data['attack'])
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/player/<int:player>', methods=['GET'])
def player_info(player):
    return jsonify(game.get_player_info(player)), 200

if __name__ == '__main__':
    app.run(debug=True)
