new Promise((resolve, reject) => {
  // resolve('success')
  reject('error msg');
})
  .then(msg => {
    console.log(msg);
    return new Promise((resolve, reject) => {
      // resolve('msg2')
      reject('error msg2');
    });
  })
  .then(msg => {
    console.log(msg);
  })
  .catch(err => {
    console.log(err);
  });

// promise 三种 states pending fulfilled rejected
/**
 * @desc promise 状态
 * promise 处于 pending 等待状态 可以变成 fulfilled 或者reject
 * promise 处于 fulfilled 解决状态的时候不能 一定不能转换为其他状态 且必须要有一个不能改变的值
 * promise 处于 rejected 拒绝状态的时候 一定不能转换为其他状态 且必须要有一个不能改变的值
 * resolve(value)  value 必须是一个不能改变的值（===）不是深度不可变 （只是引用相同即可）
 * reject(reason)
 */

/**
 * @desc then 方法
 * Promise 必须提供一个 then 方法来访问当前或 最终值或原因
 * both onFulfilled and onRejected are optional arguments
 * promise then 方法接收两个参数 promise.then(onFulfilled,onRejected)
 * if onFulfilled is not function ,it must be ignored
 * 如果 onFulfilled 不是一个方法，它一定会被忽略
 * if onRejected is not function ,it must be ignored
 * 如果 onRejected 不是一个方法，它一定会被忽略
 */
