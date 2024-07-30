// Export một namespace. trong namespace định nghĩa các function tương
// ứng cũng được export
export namespace LogAnything {
  export function LogNumber(input: number) {
    console.log(`Number: ${input.toString()}`)
  }
  export function LogString(input: string) {
    console.log(`String: ${input}`)
  }
}

export function LogOther<T>(input: T) {
  if (typeof(input) !== 'number' && typeof(input) !== 'string')
    console.log('Other!!!')
}