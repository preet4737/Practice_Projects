import random
#from classes.magic import Spell


class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    UNDERLINE = '\033[4m'
    BOLD = '\033[1m'


class Person:
    def __init__(self, hp, mp, atk, df, magic):

        self.maxhp = hp
        self.hp = hp
        self.maxmp = mp
        self.mp = mp
        self.atkl = atk - 20
        self.atkh = atk + 20
        self.df = df
        self.magic = magic
        self.action = ["Attack", "Magic"]

    def gen_dmg(self):
        return random.randrange(self.atkl, self.atkh)

    def take_dmg(self, dmg):
        self.hp -= dmg
        if self.hp < 0:
            self.hp = 0
            return self.hp

    def heal(self, dmg):
        self.hp += dmg
        if self.hp > self.maxhp:
            self.hp = self.maxhp

    def get_max_hp(self):
        return self.maxhp

    def get_max_mp(self):
        return self.maxmp

    def get_mp(self):
        return self.mp

    def get_hp(self):
        return self.hp

    def reduce_mp(self, Cost):
        self.mp -= Cost

    def choice_action(self):
        i = 1
        print("Action")
        for item in self.action:
            print(str(i) + ":", item)
            i += 1

    def choice_magic(self):
        i = 1
        print(bcolors.OKBLUE + bcolors.BOLD + "Magic" + bcolors.ENDC)
        for spell in self.magic:
            print(str(i) + ":", spell.name, "Cost:", str(spell.cost))
            i += 1
