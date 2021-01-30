const PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED'

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

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
    // TODO 处理异步
    /** 如果 then 执行 处于pending 去收集 onFulfilled onRejected */
    if (this.status === PENDING) {
      // 订阅
      //收集 所有的 onFulfilled
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

module.exports = MyPromise
