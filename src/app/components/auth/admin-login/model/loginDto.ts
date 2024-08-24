import { FormControl } from "@angular/forms";

export interface LoginDto {
    username: FormControl<string>;
    password: FormControl<string>;
}