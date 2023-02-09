import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { passwordRegExp } from '../../utils/regExp';
import { errorMessages } from '../../utils/errorMessages';
import { Match } from '../../decorators/match.decorator';

export class RegistrationDto {
  @Length(5, 10)
  nickName: string;

  @IsEmail()
  email: string;

  @Matches(passwordRegExp, { message: errorMessages.PASSPORT_ERR_MSG })
  password: string;

  @Match(RegistrationDto, (s) => s.password)
  passwordRepeat: string;

  @IsNotEmpty()
  role: string;
}
