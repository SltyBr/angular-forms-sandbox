import { InjectionToken } from '@angular/core'

export const ERROR_MESSAGES: { [key: string]: (args?: any) => string} = {
    required: () => `This field is required`,
    requiredTrue: () => `This field is required`,
    email: () => `It should be a valid mail`,
    minlength: ({ requiredLength }) => `The value has to be more than ${requiredLength} characters`,
    banWords: ({ banWords }) => `This word "${banWords}" isn't allowed`,
    appBanWords: ({ banWords }) => `This word "${banWords}" isn't allowed`,
    appPasswordShouldMatch: () => `Password should match`,
    passwordShouldMatch: () => `Password should match`,
    pattern: () => `Wrong format`,
    appUniqueNickname: () => `Nickname is taken`,
    uniqueName: () => `Nickname is taken`
}

export const VALIDATION_ERROR_MESSAGES = new InjectionToken('Validation messages', {
    providedIn: 'root',
    factory: () => ERROR_MESSAGES
});