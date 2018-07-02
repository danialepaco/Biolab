'use strict';


const defaultMessages = {
    // English language - Used by default
    en: {
      numbers: 'The field "{0}" must be a valid number.',
      email: 'The field "{0}" must be a valid email address.',
      required: 'The field "{0}" is required.',
      date: 'The field "{0}" must be a valid date ({1}).',
      minlength: 'The field "{0}" length must be greater than {1}.',
      maxlength: 'The field "{0}" length must be lower than {1}.'
    },
    es: {
        numbers: 'El campo "{0}" debe ser un número válido.',
        email: 'El campo "{0}" Debe ser una dirección de correo electrónico válida.',
        required: 'El campo "{0}" es requerido.',
        date: 'El campo "{0}" Debe ser una fecha válida ({1}).',
        minlength: 'El campo "{0}" la longitud debe ser mayor que {1}.',
        maxlength: 'El campo "{0}" la longitud debe ser menor que {1}.'
    },
    // French language
    fr: {
      numbers: 'Le champ "{0}" doit être un nombre valide.',
      email: 'Le champ "{0}" doit être une adresse email valide.',
      required: 'Le champ "{0}" est obligatoire.',
      date: 'Le champ "{0}" doit correspondre à une date valide ({1}).',
      minlength: 'Le nombre de caractère du champ "{0}" doit être supérieur à {1}.',
      maxlength: 'Le nombre de caractère du champ "{0}" doit être inférieur à {1}.'
    },
    // Persian (Farsi) language
    fa: {
      numbers: 'فیلد "{0}" باید یک عدد باشد.',
      email: 'فیلد "{0}" باید یک آدرس ایمیل باشد.',
      required: 'فیلد "{0}" نباید خالی باشد.',
      date: 'فیلد "{0}" باید یک تاریخ ({1}) باشد.',
      minlength: 'طول فیلد "{0}" باید بیشتر از "{1}" باشد.',
      maxlength: 'طول فیلد "{0}" باید کمتر از "{1}" باشد.'
    },
    // Indonesian language
    id: {
      numbers: '"{0}" harus berupa angka',
      email: 'Format email pada "{0}" harus valid',
      required: '"{0}" harus diisi',
      date: 'Format tanggal pada "{0}" harus ({1})',
      minlength: '"{0}" harus lebih dari {1} karakter',
      maxlength: '"{0}" harus kurang dari {1} karakter'
    },
    // Portuguese language of Brazil
    ptBR: {
      numbers: 'O campo "{0}" precisar conter um número válido',
      email: 'O campo "{0}" precisa conter um email válido.',
      required: 'O campo "{0}" é obrigatório.',
      date: 'O campo "{0}" precisa conter uma data válida ({1}).',
      minlength: 'O campo "{0}" precisa ser maior que {1} caracteres',
      maxlength: 'O campo "{0}" precisa ser menor que {1} caracteres.'
    }
    // TODO Add other languages here...
};

export default defaultMessages;