const PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED'

const resolvePromise = (promise2, x, resolve, reject) => {
  console.log(promise2, x, resolve, reject)
}

class MyPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED
        // 发布
        this.onRejectedCallbacks.forEach((onRejectedCallback) =>
          onRejectedCallback()
        )
      }
    }
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value
        this.status = FULFILLED
        // 发布
        this.onFulfilledCallbacks.forEach((onFulfilledCallback) =>
          onFulfilledCallback()
        )
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  /**
   * @param {*} onFulfilled
   * @param {*} onRejected
   */
  then(onFulfilled, onRejected) {
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        /**
         * 规范中明确要求 onFulfilled onReject 异步执行
         * 并且应该在then 方法被调用的那一轮事件循环之后用新的执行栈执行
         * 为了确保能拿到 promise2
         * 使用宏任务（setTimeout , setImmediate）或微任务 (MutationObserver , process.nextTick)
         */
        setTimeout(() => {
          /**
           * x 可能是js的一个普通值.then(() => value) => .then
           * 也有可能是一个普通值 .then(() => new Promise) => .then
           * onFulfilled 也有可能抛出一个异常
           */
          try {
            const x = onFulfilled(this.value)
            // 根据 x的值的不同处理方法
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      // TODO 处理异步
      /** 如果 then 执行 处于pending 去收集 onFulfilled onRejected */
      if (this.status === PENDING) {
        // 订阅
        //收集 所有的 onFulfilled
        this.onFulfilledCallbacks.push(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        this.onRejectedCallbacks.push(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })

    return promise2
  }
}

module.exports = MyPromise
