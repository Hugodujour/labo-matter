const { Engine, Render, Runner, Body, World, Bodies, Composite, Mouse, MouseConstraint } = Matter;

// Crée un moteur
const engine = Engine.create();

// Récupère la largeur et la hauteur de la fenêtre
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

// Crée un rendu qui remplit tout l'écran
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: screenWidth,
        height: screenHeight,
        wireframes: false,
        background: 'labo.png',
    }
});

// Fonction pour créer un bloc avec une texture aléatoire
const createRandomBlock = (x, y) => {
    const textures = ['hugo.png', 'david.png', 'flo.png', 'gui.png', 'phil.png'];
    const randomTexture = textures[Math.floor(Math.random() * textures.length)];
    return Bodies.rectangle(x, y, 80, 80, {
        render: {
            sprite: {
                texture: randomTexture,
                xScale: 1,
                yScale: 1,
            }
        }
    });
};

// Génère 20 blocs avec des positions aléatoires
for (let i = 0; i < 100; i++) {
    const x = Math.random() * screenWidth * 0.8 + screenWidth * 0.1; // Positions aléatoires
    const y = Math.random() * screenHeight * 0.8 + screenHeight * 0.1;
    const block = createRandomBlock(x, y);
    World.add(engine.world, block);
}

// Crée un sol
const ground = Bodies.rectangle(screenWidth / 2, screenHeight, screenWidth, 10, { isStatic: true });
World.add(engine.world, ground);

// Crée une contrainte de souris pour le drag and drop
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.5,
        render: {
            visible: false,
        }
    }
});
World.add(engine.world, mouseConstraint);
render.mouse = mouse;

// Lance le rendu
Render.run(render);

// Crée un runner
const runner = Runner.create();
Runner.run(runner, engine);
