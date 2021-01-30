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

const promise1 = new MyPromise((resolve, reject) => {
  // resolve('promise1 reject value')
  setTimeout(() => {
    resolve('async promise resolve')
  })
}).then((value) => {
  console.log(value)
})

// const promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success')
//   }, 1000)
// })

// promise.then(
//   (value) => {
//     console.log('onFulfilled1')
//   },
//   (err) => {
//     console.log('onRejected1')
//   }
// )

// promise.then(
//   (value) => {
//     console.log('onFulfilled2')
//   },
//   (err) => {
//     console.log('onRejected2')
//   }
// )

// const promise1 = new Promise((resolve, reject) => {
//   // resolve('promise resolve1')
//   reject('reject msg')
// })

// promise1
//   .then(
//     (value) => {
//       console.log('onFulfilled log 1', value)
//     },
//     (reason) => {
//       console.log('onRejected log 1', reason)
//       return 'onRejected return msg'
//     }
//   )
//   .then(
//     (value) => {
//       console.log('onFulfilled log 2', value)
//       return Promise.reject('onFulfilled2 return promise reject')
//     },
//     (reason) => {
//       console.log('onFulfilled log 2', reason)
//     }
//   )
//   .then(
//     (value) => {
//       console.log('onFulfilled log 3', value)
//     },
//     (reason) => {
//       console.log('onFulfilled log 3', reason)
//     }
//   )
