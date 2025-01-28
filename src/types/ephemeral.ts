export interface EphemeralDefinition {
  id: string
  apiKey: string
  baseUrl: string
  ttl: number
  limit: number
  claims: number
}

export interface NewEphemeralDefinition extends Omit<EphemeralDefinition, 'id'> {}