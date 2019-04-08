// export const compose = (...fns) => {
//   if (fns.length === 0) {
//     return arg => arg
//   }

//   if (fns.length === 1) {
//     return fns[0]
//   }

//   return fns.reduce((a, b) => (...args) => a(b(...args)))
// };
export const compose = (...fns) => (
  fns.length
    ? fns.length > 1
      ? fns.reduce((a, b) => (...args) => a(b(...args)))
      : fns[0]
    : p => p
)