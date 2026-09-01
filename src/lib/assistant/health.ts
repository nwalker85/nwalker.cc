import { CORPUS } from './corpus'
import { getAssistantGraph } from './graph'

export type AssistantHealth = {
  ok: boolean
  corpusSize: number
  modelMode: 'extractive' | 'provider'
  message: string
}

export function getAssistantHealth(): AssistantHealth {
  const graph = getAssistantGraph()
  const hasProviderKey = Boolean(process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY)

  return {
    ok: Boolean(graph),
    corpusSize: CORPUS.length,
    modelMode: hasProviderKey ? 'provider' : 'extractive',
    message: graph ? 'Graph compiled and ready' : 'Graph compilation failed',
  }
}
