import { SavedLinkInfoResponse } from "../core/types.ts"

export default (props: { data: Record<string, SavedLinkInfoResponse[]> }) => (
  <>
    {Object.entries(props.data).map(([path, items]) => (
      <PathItems data={items} />
    ))}
  </>
)

const PathItems = (props: { data: SavedLinkInfoResponse[] }) => (
  <>
  </>
)

const item = (props: { data: SavedLinkInfoResponse }) => <></>
