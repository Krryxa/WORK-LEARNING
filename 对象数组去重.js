let arr = [{name: 'krry', age: 21}, {name: 'lily', age: 12}, {name: 'dawei', age: 32},  {name: 'krry', age: 22}]
let repeatArr = []
arr = arr.filter(item => {
  if (repeatArr.includes(item.name)) {
    return false
  } else {
    repeatArr.push(item.name)
    return true
  }
})
console.log(arr)