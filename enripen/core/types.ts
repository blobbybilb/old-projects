export type SavedLinkInfo = {
  linkFrom: string
  linkTo: string
  createdAt: Date
  submitterIPs: string[]
}

export type SavedLinkInfoResponse = {
  linkFrom: string
  linkTo: string
  createdAt: Date
  submittersCount: number
}
