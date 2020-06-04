from classes.game import Person, bcolors

from classes.magic import Spell

# create black magic
fire = Spell("Fire", 10, 100, "black_magic")
thunder = Spell("Thunder", 45, 400, "black_magic")
blizzard = Spell("Blizzard", 20, 150, "black_magic")
meteor = Spell("Meteor", 35, 250, "black_magic")
quake = Spell("Quake", 30, 200, "black_magic")

# create white magic
cure = Spell("Cure", 15, 120, "white_magic")
cura = Spell("Cura", 30, 240, "white_magic")

magic = [fire, thunder, blizzard, meteor, quake, cure, cura]

player = Person(450, 100, 60, 35, magic)
enemy = Person(1200, 100, 45, 25, [])

running = True
i = 0
print(bcolors.FAIL + bcolors.BOLD + "AN ENEMY ATTACKS" + bcolors.ENDC)

while running:
    print("=========================")
    player.choice_action()
    choice = input("Choose Action :")
    index = int(choice) - 1

    if index == 0:
        dmg = player.gen_dmg()
        enemy.take_dmg(dmg)
        print("You attacked for ", dmg, "points of damage.")

    elif index == 1:
        player.choice_magic()
        t = input("Choose Spell:")
        p = int(t) - 1
        dmg_magic = player.magic[p].gen_spell_dmg()
        cost = player.magic[p].cost
        spell = player.magic[p]
        current_mp = player.get_mp()

        if spell.cost > current_mp:
            print(bcolors.FAIL + "Not enough magic points" + bcolors.ENDC)
            continue

        player.reduce_mp(cost)

        if spell.type == "white_magic":
            player.heal(dmg_magic)
            print(bcolors.OKBLUE + "You used " + spell.name + " and healed by " + str(dmg_magic) + "points" + bcolors.ENDC)

        elif spell.type == "black_magic":
            enemy.take_dmg(dmg_magic)
            print(bcolors.OKBLUE + " " + spell.name + " deals " + str(dmg_magic) + " points of damage " + bcolors.ENDC)

    enemy_dmg = enemy.gen_dmg()
    player.take_dmg(enemy_dmg)
    print("Enemy attacked for ", enemy_dmg, "points of damage.")
    print("--------------------------------------------------------------")
    print(bcolors.OKBLUE + "Enemy HP :", str(enemy.get_hp()) + "/" + str(enemy.get_max_hp()) + bcolors.ENDC)
    print(bcolors.OKBLUE + "Player HP :", str(player.get_hp()) + "/" + str(player.get_max_hp()) + bcolors.ENDC)

    print(bcolors.OKBLUE + "Your magic points are", str(player.get_mp()) +  "/" + str(player.get_max_mp()) + bcolors.ENDC)
    if enemy.get_hp() == 0:
        print(bcolors.OKGREEN + "You Win!." + bcolors.ENDC)
        running = False

    elif player.get_hp() == 0:
        print(bcolors.FAIL + "You lost!." + bcolors.ENDC)
        running = False
