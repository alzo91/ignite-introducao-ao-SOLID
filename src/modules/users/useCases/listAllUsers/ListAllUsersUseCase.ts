import { validate } from "uuid";

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}
/*
interface IUserResponse {
  id: string;
  name: string;
  admin: boolean;
  email: string;
  created_at: string;
  updated_at: string;
} */
class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  validateId(id: string): boolean {
    return validate(id);
  }

  validationUserId(id: string): User {
    return this.usersRepository.findById(id);
  }

  execute({ user_id }: IRequest): User[] {
    // Complete aqui
    if (!user_id) {
      throw new Error("You should be to pass user_id!");
    }

    const validatedUserId = this.validateId(user_id);

    if (!validatedUserId) {
      throw new Error("User isn't valid!");
    }

    const user = this.validationUserId(user_id);

    if (!user) {
      throw new Error("User isn't valid!");
    }

    if (!user.admin) {
      throw new Error("User isn't administrator!");
    }
    /* const userResponses: IUserResponse[] = [];
    userResponses = this.usersRepository.list().map((user) => {
      return { ...user, created_at: user.created_at.toString(),c };
    }); */
    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
