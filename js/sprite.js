class sprite {
    constructor(options) {
        this.x = options["x"];
        this.y = options["y"];
        this.w = options["w"];
        this.h = options["h"];
        this.visible = options["visible"];
        this.fileLoc = options["fileLocation"];

        sprites.push(this);
    }

    renderImage() {
        if (!this.visible) { return null; }
        if (this.h != undefined && this.w != undefined) {
            return [this.fileLoc, this.x, this.y, this.w, this.h];
        } else { 
            return [this.fileLoc, this.x, this.y];
        }
    }
}