import { createChallengeValidator } from '#validators/challenge/create'
import { updateChallengeValidator } from '#validators/challenge/update'
import { Infer } from '@vinejs/vine/types'

export type CreateChallenge = Infer<typeof createChallengeValidator>

export type UpdateChallenge = Infer<typeof updateChallengeValidator>
