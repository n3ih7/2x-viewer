import Upscaler from "upscaler";

const IUpscaler = (() => {
  const upscaler = new Upscaler()
  return {
    upscale: (url: string) => upscaler.upscale(url)
  }
})()

export const upscale = IUpscaler.upscale