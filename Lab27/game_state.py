import random

class Game:
    def __init__(self):
        self.reset()

    def reset(self):
        self.state = "SETEANDO"
        self.turn = None
        self.players = {
            1: {"ships": [], "hits": [], "misses": [], "board": [[0]*10 for _ in range(10)]},
            2: {"ships": [], "hits": [], "misses": [], "board": [[0]*10 for _ in range(10)]}
        }

    def toss_coin(self):
        if self.state != "SETEANDO":
            raise Exception("Game must be in SETEANDO state")
        self.turn = random.choice([1, 2])
        return self.turn

    def place_ships(self, player, ships):
        if self.state != "SETEANDO":
            raise Exception("Cannot place ships now")
        self.validate_ships(ships)
        self.players[player]['ships'] = ships
        if all(p['ships'] for p in self.players.values()):
            self.state = "JUGANDO"

    def validate_ships(self, ships):
        # Aquí validas:
        # - tamaños correctos
        # - posiciones válidas
        # - sin colisiones
        pass

    def attack(self, player, coord):
        if self.state != "JUGANDO":
            raise Exception("Game is not in progress")
        if player != self.turn:
            raise Exception("Not your turn")
        enemy = 2 if player == 1 else 1
        x, y = coord['x'], coord['y']
        for ship in self.players[enemy]['ships']:
            if [x, y] in ship['positions']:
                self.players[player]['hits'].append([x, y])
                ship['positions'].remove([x, y])
                if all(len(s['positions']) == 0 for s in self.players[enemy]['ships']):
                    self.state = "FINALIZADO"
                return {"result": "hit", "turn": self.turn}
        self.players[player]['misses'].append([x, y])
        self.turn = enemy
        return {"result": "miss", "turn": self.turn}

    def get_status(self):
        return {
            "state": self.state,
            "turn": self.turn,
            "player1_remaining": self.remaining_ships(1),
            "player2_remaining": self.remaining_ships(2)
        }

    def get_player_info(self, player):
        return {
            "remaining_ships": self.remaining_ships(player),
            "hits": self.players[player]['hits'],
            "misses": self.players[player]['misses']
        }

    def remaining_ships(self, player):
        return sum(len(ship['positions']) > 0 for ship in self.players[player]['ships'])
