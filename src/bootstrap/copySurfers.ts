import path from 'path'
import fs from 'fs-extra'
import { ProxiesType } from '../types/ProxiesType'
import { SurfersType } from '../types/SurfersType'

export const copySurfers = async (
  proxies: ProxiesType,
  surfers: SurfersType
): Promise<void> => {
  const copyOperations = surfers.map((surfer) => {
    const surferPath = path.join(__dirname, `../../surfers/${surfer}/copy`)

    return proxies[surfer].map(async (proxy, i) => {
      return await fs.copy(surferPath, `${surferPath}_${i + 1}`, { recursive: true, overwrite: true })
    })
  })

  await Promise.all(copyOperations.flat())
}
