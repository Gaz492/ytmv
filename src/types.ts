export interface FourViewStreams {
  stream1: string
  stream2: string
  stream3: string
  stream4: string
}

export interface FourViewPresets {
  presets: FourViewPreset[]
}

export interface FourViewPreset {
  name: string
  views: FourViewStreams
}
