/* @flow */

// let bla = BLA()

class Foo {
  doSomething (x?: string): number {
    return 'Do Something'
  }
}


async function a (str) {
  let str2 = await str
  console.log('---', str2)
  return 'blass'
}


function b () {
  return <div>LOL</div>
}

let View = () => {}
function c () {
  return <View>LLL</View>
}

a('ll').then(res => console.log(res, c, View, b))

export default Foo
