import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  validationEmail(email: string): User {
    const user = this.usersRepository.findByEmail(email);
    return user;
  }

  execute({ email, name }: IRequest): User {
    // Complete aqui
    const userAreadyExist = this.validationEmail(email);

    if (userAreadyExist) {
      throw new Error("User already exist");
    }

    const user = this.usersRepository.create({ name, email });

    return user;
  }
}

export { CreateUserUseCase };
