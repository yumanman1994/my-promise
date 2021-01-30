// let promise = new Promise((reject, resolve) => {
//   // resolve('success')
//   // resolve('error')
//   throw new Error('exception :Error')
// })

// promise.then(
//   () => {
//     console.log('called onFulfilled')
//   },
//   () => {
//     console.log('called onRejected')
//   }
// )

const MyPromise = require('./my-promise')

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})

promise.then(
  (value) => {
    console.log('onFulfilled1')
  },
  (err) => {
    console.log('onRejected1')
  }
)

promise.then(
  (value) => {
    console.log('onFulfilled2')
  },
  (err) => {
    console.log('onRejected2')
  }
)

console.log('------------------------<call real promise>----------------------')

const rPromise = new Promise((resolve, reject) => {})
