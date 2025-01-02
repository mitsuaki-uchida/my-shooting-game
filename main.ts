input.onButtonPressed(Button.A, function () {
    if (!(自機.isDeleted()) && 自ビーム.isDeleted()) {
        自ビーム = game.createSprite(自機.get(LedSpriteProperty.X), 3)
    }
})
let 自ビーム: game.LedSprite = null
let 自機: game.LedSprite = null
自機 = game.createSprite(2, 4)
let 敵機 = game.createSprite(2, 0)
自ビーム = game.createSprite(2, 4)
自ビーム.delete()
let 敵ビーム = game.createSprite(2, 0)
敵ビーム.delete()
game.setScore(0)
let 敵機移動間隔 = 0
let 敵機攻撃間隔 = 0
game.pause()
basic.forever(function () {
    if (!(game.isRunning())) {
        basic.showNumber(3)
        basic.showNumber(2)
        basic.showNumber(1)
        basic.showNumber(0)
        game.resume()
    }
    if (game.isRunning()) {
        if (!(自機.isDeleted())) {
            if (input.acceleration(Dimension.X) < -200) {
                自機.change(LedSpriteProperty.X, -1)
            }
            if (input.acceleration(Dimension.X) > 200) {
                自機.change(LedSpriteProperty.X, 1)
            }
        }
        if (敵機移動間隔 >= 5) {
            if (敵機.isDeleted()) {
                敵機 = game.createSprite(randint(0, 4), 0)
            } else {
                if (Math.randomBoolean()) {
                    敵機.change(LedSpriteProperty.X, -1)
                } else {
                    敵機.change(LedSpriteProperty.X, 1)
                }
            }
            敵機移動間隔 = 0
        }
        if (自ビーム.isDeleted()) {
        	
        } else {
            自ビーム.change(LedSpriteProperty.Y, -1)
        }
        if (敵ビーム.isDeleted()) {
            if (敵機攻撃間隔 >= 8) {
                敵ビーム = game.createSprite(敵機.get(LedSpriteProperty.X), 1)
                敵機攻撃間隔 = 0
            }
        } else {
            敵ビーム.change(LedSpriteProperty.Y, 1)
        }
        basic.pause(200)
        敵機移動間隔 += 1
        敵機攻撃間隔 += 1
        if (!(自ビーム.isDeleted()) && !(敵ビーム.isDeleted())) {
            if (自ビーム.get(LedSpriteProperty.X) == 敵ビーム.get(LedSpriteProperty.X) && 自ビーム.get(LedSpriteProperty.Y) <= 敵ビーム.get(LedSpriteProperty.Y)) {
                敵ビーム.delete()
                自ビーム.delete()
            }
        }
        if (!(自ビーム.isDeleted())) {
            if (自ビーム.isTouching(敵機)) {
                music.ringTone(262)
                basic.pause(100)
                music.stopAllSounds()
                敵機.delete()
                自ビーム.delete()
                敵機移動間隔 = 0
                敵機攻撃間隔 = 0
                game.addScore(1)
            } else if (自ビーム.get(LedSpriteProperty.Y) <= 0) {
                自ビーム.delete()
            }
        }
        if (!(敵ビーム.isDeleted())) {
            if (敵ビーム.isTouching(自機)) {
                敵ビーム.delete()
                自機.delete()
                game.gameOver()
                control.reset()
            } else if (敵ビーム.get(LedSpriteProperty.Y) >= 4) {
                敵ビーム.delete()
            }
        }
    }
})
