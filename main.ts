import { logProperty } from './decorators';

class Person {
    @logProperty
    firstName: string;

    @logProperty
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

const foo = new Person('Foo', 'Bar');

function logProperty2(target: any, key: string) {

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

class Person2 {
    @logProperty2
    firstName: string;

    @logProperty2
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

const foo2 = new Person2('Foo', 'Bar');
