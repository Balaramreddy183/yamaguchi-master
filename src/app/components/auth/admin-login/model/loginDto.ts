import { FormControl } from "@angular/forms";

export interface LoginDto {
    email: FormControl<string>;
    password: FormControl<string>;
}