import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => {
	return {
		transform: {
			'^.+\\.ts?$': 'ts-jest'
		},
		moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
		testEnvironment: 'node',
		verbose: true
	}
}
