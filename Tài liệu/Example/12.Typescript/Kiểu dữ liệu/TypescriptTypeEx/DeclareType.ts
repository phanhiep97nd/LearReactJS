// Khai báo
type TmpType = {
  key: string,
  value: string,
}
let varTmpA = {} as TmpType; // Biến varTmpA có type là TmpType
let varTmpB: TmpType; // Biến varTmpB có type là TmpType

// Khai báo type với undefined trong key
type InfoType = {
  name?: string,  // ~ (string | undefined)
}