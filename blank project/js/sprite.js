class gamelySprite {
    constructor(options) {
        this.x = options["x"];
        this.y = options["y"];
        this.visible = options["visible"];
        this.fileLoc = options["fileLocation"];

        if (options["w"] == undefined) {
            this.getSize();
        } else {
            this.w = options["w"];
            this.h = options["h"];
        }

        if (options["rotate"] != undefined) {
            this.rotation = options["rotate"];
        } else {
            this.rotation = 0;
        }
        
        if (options["z-index"] == undefined) {
            this.zIndex = 0;
        } else {
            this.zIndex = options["z-index"];
        }

        sprites.push(this);

    }

    getSize() {
        this.detect(this.fileLoc, this.loadedSizesCallBack, this);
    }

    loadedSizesCallBack(result, cls) {
        cls.h = result[0];
        cls.w = result[1];
    }

    detect(URL, callback, cls) {
        var image = new Image();
        image.src = URL;
        image.onload = function() {
            callback([this.height, this.width], cls);
        };
    }

    renderImage() {
        if (!this.visible) { return null; }
        return true;
    }

    isColliding(otherSprite) {
        if (!this.visible || !otherSprite.visible) { return false; }
        if (this.x < otherSprite.x + otherSprite.w && this.x + this.w > otherSprite.x) {
            if (this.y < otherSprite.y + otherSprite.h && this.y + this.h > otherSprite.y) {
                return true;
            }
        }
        return false;
    }
}