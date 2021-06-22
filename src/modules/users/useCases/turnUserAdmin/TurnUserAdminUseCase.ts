import { validate } from "uuid";

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  validationId(id: string): boolean {
    return validate(id);
  }

  existUserById(id: string): User {
    return this.usersRepository.findById(id);
  }

  execute({ user_id }: IRequest): User {
    const idValidated = this.validationId(user_id);

    if (!idValidated) {
      throw new Error("Please, you need to be logged!");
    }

    const userExist = this.existUserById(user_id);

    if (!userExist) {
      throw new Error("The user is not registered ");
    }

    const turnedUser = this.usersRepository.turnAdmin(userExist);

    return turnedUser;
  }
}

export { TurnUserAdminUseCase };
