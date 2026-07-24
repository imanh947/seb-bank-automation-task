import { Customer } from '../pages/ManagerPage';

export const customersToAdd: Customer[] = [
    { firstName: 'Christopher', lastName: 'Connely', postCode: 'L789C349' },
    { firstName: 'Frank', lastName: 'Christopher', postCode: 'A897N450' },
    { firstName: 'Christopher', lastName: 'Minka', postCode: 'M098Q585' },
    { firstName: 'Connely', lastName: 'Jackson', postCode: 'L789C349' },
    { firstName: 'Jackson', lastName: 'Frank', postCode: 'L789C349' },
    { firstName: 'Minka', lastName: 'Jackson', postCode: 'A897N450' },
    { firstName: 'Jackson', lastName: 'Connely', postCode: 'L789C349' },
];

export const customersToDelete: Customer[] = [
    { firstName: 'Jackson', lastName: 'Frank', postCode: 'L789C349' },
    { firstName: 'Christopher', lastName: 'Connely', postCode: 'L789C349' },
];