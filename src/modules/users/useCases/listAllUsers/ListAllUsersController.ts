import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    // Complete aqui
    const { user_id } = request.headers;
    const id = String(user_id);

    if (!this.listAllUsersUseCase.validateId(id)) {
      return response.status(400).json({ error: "Token isn't valid!" });
    }

    const user = this.listAllUsersUseCase.validationUserId(id);
    if (!user) {
      return response.status(400).json({ error: "User isn't exist!" });
    }

    if (!user.admin) {
      return response.status(400).json({ error: "User isn't administrator.!" });
    }

    const users = this.listAllUsersUseCase.execute({
      user_id: String(user_id),
    });

    return response.json(users);
  }
}

export { ListAllUsersController };
