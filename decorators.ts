export function logProperty(target: any, key: string) {

    let val = this[key];

    const getter = () => {
        console.log(`Get: ${key} => ${val}`);
        return val;
    };

    const setter = (newVal) => {
        console.log(`Set: ${key} => ${newVal}`);
        val = newVal;
    };

    if (delete this[key]) {
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}
