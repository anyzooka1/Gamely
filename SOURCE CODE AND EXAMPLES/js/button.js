class gamelyButton {
    constructor(options) {
        this.x = options["x"];
        this.y = options["y"];

        this.content = options["content"];
        this.y = options["y"];

        this.visible = options["visible"];
        this.wasVisible = options["visible"];

        this.onClickFunc = options["onClickFunc"];

        this.button = document.createElement("button");
        this.button.innerHTML = this.content;
        
        // 2. Append somewhere
        var body = document.getElementById("gameDiv");
        body.appendChild(this.button);
    
        this.button.style.position = "absolute";
        this.button.style.left = `${this.x}px`;
        this.button.style.top = `${this.y}px`;

        
        // 3. Add event handler
        this.button.addEventListener ("click", this.onClickFunc);

        buttons.push(this);
    }
}