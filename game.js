const { Engine, Render, Runner, Body, World, Bodies, Composite, Events } = Matter;
const engine = Engine.create();

// Get the window's width and height
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

// Create a renderer that fills the entire screen
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: screenWidth,
        height: screenHeight,
        wireframes: false,
        background: 'labo.png', // Optional: Set a background color
    }
});

// Create two boxes and a ground
const boxA = Bodies.rectangle(screenWidth / 2, screenHeight / 100, 80, 80, {
    
    render: {
        sprite: {
            texture: 'hugo.png',
            xScale: 1,
            yScale: 1
        }
    }
});

const boxB = Bodies.rectangle(screenWidth / 2.5, screenHeight / 100, 125, 125, {
    render: {
        sprite: {
            texture: 'hugo.png',
            xScale: 2,
            yScale: 2
        }
    }
});




const ground2 = Bodies.rectangle(screenWidth / 2, screenHeight, screenWidth, 10, { isStatic: true});

// Add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB,  ground2]);

document.addEventListener("keydown", (event) => {
    let keyCode = event.keyCode;
    let speed = 40; // set the speed of movement

    // Move the body based on the key pressed
    if (keyCode === 37) {
        // move left
        Body.translate(boxA, { x: -speed, y: 0 });
    } else if (keyCode === 38) {
        // move up
        Body.translate(boxA, { x: 0, y: -speed });
    } else if (keyCode === 39) {
        // move right
        Body.translate(boxA, { x: speed, y: 0 });
    } else if (keyCode === 40) {
        // move down
        Body.translate(boxA, { x: 0, y: speed });
    }
});

document.body.addEventListener("mousedown", (event) => {
    const { x, y } = event;

    // Roll a dice (random number between 1 and 6)
    const diceRoll = Math.floor(Math.random() * 6) + 1;

    // Map the dice roll to a specific texture
    const textures = {
        1: 'hugo.png',
        2: 'david.png',
        3: 'flo.png',
        4: 'gui.png',
        5: 'hugo.png',
        6: 'phil.png'
    };

    const selectedTexture = textures[diceRoll];

    // Create a new body with the selected texture
    const newBody = Bodies.rectangle(x, y, 150, 150,  {
        chamfer: {
            radius: [20]
        },
        render: {
            sprite: {
                texture: selectedTexture,
                xScale: 2,
                yScale: 2
            }
        }
    });

    // Add the body to the world
    World.add(engine.world, newBody);
});

// Check for collisions
Events.on(engine, "collisionStart", (event) => {
    const pairs = event.pairs;

    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];

        if (pair.bodyA === boxA && pair.bodyB === circle) {
            // Game over
            alert("Game over!");
            window.location.reload(true);
        }
    }
});

// Run the renderer
Render.run(render);
// Create runner
const runner = Runner.create();
// Run the engine
Runner.run(runner, engine);
