import { validate } from "uuid";

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  validationId(id: string): boolean {
    return validate(id);
  }

  userValidationById(id: string): User {
    return this.usersRepository.findById(id);
  }

  execute({ user_id }: IRequest): User {
    // Complete aqui
    if (!user_id) {
      throw new Error("Please, you need to be logged!");
    }

    const validatedUserID = this.validationId(user_id);

    if (!validatedUserID) {
      throw new Error("Please, you need to be logged!");
    }

    const foundUser = this.userValidationById(user_id);

    if (!foundUser) {
      throw new Error("User doesn't exist!");
    }
    return foundUser;
  }
}

export { ShowUserProfileUseCase };
