import { IsEmail, IsString } from 'class-validator';
export class CreatePatientDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  countryCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  documentUrl: string;
}
