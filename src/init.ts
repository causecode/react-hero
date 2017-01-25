function capitalize(): string {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function isEmpty(): boolean {
    return (!this || !Object.keys(this).length);
};

function objectEach(callback: Function) {
    if (!(callback instanceof Function)) {
        return;
    }
    if (!(this instanceof Object)) {
        throw new Error('Current Instance in forEach is not an Object');
    }
    Object.keys(this).forEach((key: string) => {
        callback(key, this[key]);
    });
}

function arrayEach(callback: Function) {
    if (!(callback instanceof Function)) {
        return;
    }
    if (!(this instanceof Array)) {
        throw new Error('Current Instance in forEach is not an Array');
    }
    this.forEach((element: any, index: number) => {
        callback(element, index);
    });
}

function equals<T>(obj: Object | Array<T>) {
    // Adding try catch here to avoid 'Converting circular structure to JSON' error.
    try {
        if ((this instanceof Object && obj instanceof Object) || 
                (this instanceof Array && obj instanceof Array)
        ) {
            return (
                JSON.stringify(this) ===
                JSON.stringify(obj)
            );
        }
    } catch (e) {
        return this === obj;
    }

    return this === obj;
}

Array.prototype.each = arrayEach;
Array.prototype.equals = equals;
String.prototype.capitalize = capitalize;
