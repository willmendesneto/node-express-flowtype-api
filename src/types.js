// @flow

// ErrnoError interface for use in onError
export type ErrnoError = {
  ...Error,
  errno?: number,
  code?: string,
  path?: string,
  syscall?: string,
}

export type Requirements = {
  key: string,
  type: string,
}

export type Product = {
  id: number,
  name: string,
  quantity: number,
  price: number
}
