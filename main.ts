makerbit.onIrButton(IrButton.NUM1, IrButtonAction.Pressed, function () {
    chose = 1
    point = game.createSprite(randint(0, 4), 0)
    gun = game.createSprite(2, 4)
    time = 10000
    shoot = game.createSprite(gun.get(LedSpriteProperty.X), 4)
    shoot.delete()
    game.startCountdown(time)
    game.setScore(0)
})
makerbit.onIrButton(IrButton.NUM3, IrButtonAction.Pressed, function () {
    chose = 2
    game2 = game.createSprite(2, 2)
    point2 = game.createSprite(randint(0, 4), randint(0, 4))
    time = 10000
    game.startCountdown(time)
    game.setScore(0)
})
makerbit.onIrButton(IrButton.NUM2, IrButtonAction.Pressed, function () {
    chose = 3
    index = 0
    block = []
    bird = game.createSprite(0, 2)
    bird.set(LedSpriteProperty.Blink, 300)
    game.setScore(0)
})
makerbit.onIrButton(IrButton.Right, IrButtonAction.Pressed, function () {
    if (chose == 1) {
        gun.change(LedSpriteProperty.X, 1)
    }
    if (chose == 2) {
        game2.change(LedSpriteProperty.X, 1)
    }
})
makerbit.onIrButton(IrButton.Left, IrButtonAction.Pressed, function () {
    if (chose == 1) {
        gun.change(LedSpriteProperty.X, -1)
    }
    if (chose == 2) {
        game2.change(LedSpriteProperty.X, -1)
    }
})
makerbit.onIrButton(IrButton.Up, IrButtonAction.Pressed, function () {
    if (chose == 1) {
        shoot = game.createSprite(gun.get(LedSpriteProperty.X), 4)
        for (let index2 = 0; index2 < 5; index2++) {
            shoot.change(LedSpriteProperty.Y, -1)
            basic.pause(100)
        }
        shoot.delete()
    }
    if (chose == 2) {
        game2.change(LedSpriteProperty.Y, 1)
    }
    if (chose == 3) {
        bird.change(LedSpriteProperty.Y, 1)
    }
})
makerbit.onIrButton(IrButton.Down, IrButtonAction.Pressed, function () {
    if (chose == 2) {
        game2.change(LedSpriteProperty.Y, -1)
    }
    if (chose == 3) {
        bird.change(LedSpriteProperty.Y, -1)
    }
})
let emptyblock = 0
let ticks = 0
let bird: game.LedSprite = null
let block: game.LedSprite[] = []
let index = 0
let point2: game.LedSprite = null
let game2: game.LedSprite = null
let shoot: game.LedSprite = null
let time = 0
let gun: game.LedSprite = null
let point: game.LedSprite = null
let chose = 0
chose = 0
makerbit.connectIrReceiver(DigitalPin.P8)
basic.forever(function () {
    if (chose == 0) {
        basic.showIcon(IconNames.Happy)
    }
    if (chose == 1) {
        if (shoot.isTouching(point)) {
            point.delete()
            shoot.delete()
            point = game.createSprite(randint(0, 4), 0)
            game.addScore(1)
        } else if (time == 0) {
            game.gameOver()
            basic.showNumber(game.score())
            chose = 0
            basic.clearScreen()
        }
    }
    if (chose == 2) {
        if (game2.isTouching(point2)) {
            point2.delete()
            point2 = game.createSprite(randint(0, 4), randint(0, 4))
            game.addScore(1)
        } else if (time == 0) {
            game.gameOver()
            basic.showNumber(game.score())
            chose = 0
            basic.clearScreen()
        }
    }
    if (chose == 3) {
        while (block.length > 0 && block[0].get(LedSpriteProperty.X) == 0) {
            block.removeAt(0).delete()
        }
        for (let block2 of block) {
            block2.change(LedSpriteProperty.X, -1)
        }
        if (ticks % 3 == 0) {
            emptyblock = randint(0, 4)
            for (let index2 = 0; index2 <= 4; index2++) {
                if (index2 != emptyblock) {
                    block.push(game.createSprite(4, index2))
                }
            }
        }
        for (let block3 of block) {
            if (block3.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) && block3.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y)) {
                basic.pause(1000)
                game.setScore(Math.floor(ticks / 4))
                game.gameOver()
                basic.showNumber(game.score())
                chose = 0
            }
        }
        ticks += 1
        basic.pause(1000)
    }
})
