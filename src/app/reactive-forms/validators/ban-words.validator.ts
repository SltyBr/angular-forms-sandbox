import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function banWords(words: string[] = []): ValidatorFn {
    return (control: AbstractControl<string | null>): ValidationErrors | null => {
        const banWord = words.find(word => control.value?.toLowerCase() === word);
        return banWord ? {banWords: {bannedWord: banWord}} : null;
    }
}