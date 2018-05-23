import * as React from 'react'

export interface Thing {}

// type Model1 = {
//   things: Array<Thing> | undefined | null
// }

// const SomeView1 = ({ things }: Model1) => {
//   return <div>{things.map(thing => String(thing))}</div>
// }

export type RemoteData<E, D> =
  | { type: 'NotAsked' }
  | { type: 'Loading' }
  | { type: 'Failure'; error: E }
  | { type: 'Success'; data: D }

type HttpError = string

type Model = {
  things: RemoteData<HttpError, Array<Thing>>
}

const SomeView = ({ things }: Model) => {
  switch (things.type) {
    case 'NotAsked':
      return (
        <div>
          Please press the button to load the things
        </div>
      )
    case 'Loading':
      return <div>Loading things...</div>
    case 'Failure':
      return <div>An error has occurred {things.error}</div>
    case 'Success':
      return <div>{things.data.map(thing => {})}</div>
  }
}

export function fold<E, D, R>(
  rd: RemoteData<E, D>,
  fs: {
    NotAsked: () => R
    Loading: () => R
    Failure: (error: E) => R
    Success: (data: D) => R
  }
): R {
  switch (rd.type) {
    case 'NotAsked':
      return fs.NotAsked()
    case 'Loading':
      return fs.Loading()
    case 'Failure':
      return fs.Failure(rd.error)
    case 'Success':
      return fs.Success(rd.data)
  }
}

const SomeView2 = ({ things }: Model) =>
  fold(things, {
    NotAsked: () => (
      <div>Please press the button to load the things</div>
    ),
    Loading: () => <div>Loading things...</div>,
    Failure: error => (
      <div>An error has occurred {error}</div>
    ),
    Success: data => <div>{data.map(thing => {})}</div>
  })
