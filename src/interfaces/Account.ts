import { Person } from "./Person";
import { AccountType } from "./AccountType";

export interface Account {
    description: string,
    person: Person,
    type: AccountType,
    value: number
}