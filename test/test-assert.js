import { findLineAndColumnForPosition, getData } from '../src/assert';

export function testDeepEqual(t) {
    const fruits = ['Apple', 'Blueberry', 'Strawberry'];
    t.assert(fruits == ['Apple', 'Blueberry', 'Strawberry']);
}

export function testFindLineAndColumnForPosition(t) {
    const someCode = `function something() {
    const something = true;
    return something;
}`;

    const pos = findLineAndColumnForPosition(someCode, 30);
    t.assert(pos == {line: 2, column: 8}, 'Position should match');
}

export function testGetData(t) {
    const name = 'Luna';
    const data = getData(`t.assert(name === 'luna');`, 'hogwarts', {line: 7, column: 7});
    t.assert(data.source.file === 'hogwarts');
    t.assert(data.source.position == {line: 7, column: 7});
    t.assert(data.left.code === 'name');
    t.assert(data.left.range == [9, 13]);
    t.assert(data.right.code === '"luna"');
    t.assert(data.right.range == [18, 24]);
    t.assert(data.operator == '===');

    const data2 = getData('t.assert(something);', 'somewhere', {line: 5, column: 10});
    t.assert(data2.left.code === 'something');
    t.assert(data2.hasOwnProperty('right') === false);
}
